import { React, metro, getIDByName, utilities, View } from '../common/exports';
import { get } from '../common/store';
import { Patch } from '../common/patch';

const { 
    findByName, 
    findStore, 
    common: {
        Clipboard 
    },
    components: {
        Redesign
    }
} = metro;

const { findInReactTree } = utilities;

const UserProfileStore = findStore('UserProfile');
const EditProfileTheme = findByName('EditProfileTheme', { interop: false })

const CopyButton = ({ getText }: { getText(): string }) => {
    let loadingTimeout: NodeJS.Timeout;
    const [loading, setLoading] = React.useState(false);

    return <Redesign.IconButton 
        icon={getIDByName('ic_message_copy')}
        variant={'primary'}
        size={'md'}
        loading={loading}
        onPress={() => {
            clearTimeout(loadingTimeout);

            setLoading(previous => !previous);
            loadingTimeout = setTimeout(() => setLoading(previous => !previous), 400)

            Clipboard.setString(getText());
        }}
    />
}

export default class extends Patch {
    static override key = 'profileThemes';
    static override title = 'Profile Themes';
    static override subtitle = 'Uses 3y3 encoded text in bios to colorize profiles. Copy your own from the "Profile Theme" section.';
    static override icon = 'ic_custom_color';

    static colorExpression = /\[(\#[0-9a-fA-F]{6})\s*,\s*(\#[0-9a-fA-F]{6})\]/;
    static replacingExpression = new RegExp(this.colorExpression, 'g');

    // Taken and adapted from https://github.com/twnlink/vendetta-plugins/blob/master/plugins/FreeProfileColors
    static is3y3(text: string) {
        return Boolean([...text]
            .some((x) => 0xe0000 < x.codePointAt(0)! && x.codePointAt(0)! < 0xe007f));
    }

    static encode(text: string) {
        return [...text]
            .map((x) =>
                0x00 < x.codePointAt(0)! && x.codePointAt(0)! < 0x7f
                    ? `${String.fromCodePoint(x.codePointAt(0)! + 0xe0000)}`
                    : x)
            .join('');
    }

    static decode(text: string) {
        return [...text]
            .map((x) =>
                0xe0000 < x.codePointAt(0)! && x.codePointAt(0)! < 0xe007f
                    ? String.fromCodePoint(x.codePointAt(0)! - 0xe0000)
                    : x)
            .join('');
    }
    
    static override patch(Patcher) {
        Patcher.after(UserProfileStore, 'getUserProfile', (_, __, res) => {
            if (!res || !this.is3y3(res.bio) || !get(`${this.key}.enabled`)) return;

            const decodedColors = this.decode(res.bio);
            const colors = decodedColors.match(this.colorExpression);

            if (!colors) return;

            colors.shift();

            res.themeColors = colors.map(color => parseInt('0x' + color.slice(1)));
            res.premiumType = 2;
            res.bio = decodedColors.replace(this.replacingExpression, '');
        })

        Patcher.after(EditProfileTheme, 'default', (_, __, res) => {
            if (!get(`${this.key}.enabled`)) return;

            const Swatches = findInReactTree(res, r => r?.children.find(i => i?.type?.name === 'ColorSwatch'));

            const selectPicker = (type: 'Primary' | 'Accent') => {
                return Swatches?.children?.find(x => x?.type?.name === 'ColorSwatch'
                    && x?.props?.description === type);
            }

            const formatColor = (picker: { props: { color: number } }) => {
                return picker.props.color.toString(16).padStart(6, '0');
            }

            Swatches.children?.unshift(<View 
                style={{ 
                    marginTop: 16,
                    marginRight: 8
                }}
            >
                <CopyButton 
                    getText={() => {
                        const primaryPicker = selectPicker('Primary');
                        const accentPicker = selectPicker('Accent');

                        return this.encode(`[#${formatColor(primaryPicker)},#${formatColor(accentPicker)}]`);
                    }}
                />
            </View>)
        })
    }
};
