import { metro, utilities, View } from '../common/exports';
import { Patch } from '../common/patch';
import { get } from '../common/store';

const { 
    findByName,
    findByProps,
    common: {
        i18n: {
            Messages: M
        }
    }
} = metro;

const { findInReactTree } = utilities;

const ButtonModule = findByProps('ButtonColors', { lazy: true });
const TextModule = findByProps('TextStyleSheet', { lazy: true });
const Settings = findByName('SearchableSettingsList', { lazy: true });
const UpsellCard = findByName('UpsellCard', { interop: false, lazy: true });

export default class extends Patch {
    static override key = 'hideUpsells';
    static override title = 'Hide Upsells';
    static override subtitle = 'Hide all \'Get Nitro\' upsells throughout Discord (doesn\'t include boosting upsells)';
    static override icon = 'img_nitro_boosted';

    static props = [
        'CURRENT_GUILD_DESCRIPTION',
        'JOINED_GUILD_DESCRIPTION',
        'UNJOINED_DISCOVERABLE_GUILD_DESCRIPTION'
    ]

    static override patch(Patcher) {
        Patcher.instead(ButtonModule, 'default', (self, args, orig) => {
            if (args[0].text === M.EMOJI_POPOUT_PREMIUM_CTA && get(`${this.key}.enabled`)) return;

            return orig.apply(self, args);
        })

        Patcher.instead(View, 'render', (self, args, orig) => {
            if ([M.PREMIUM, 'Nitro'].includes(args[0]?.accessibilityLabel) && get(`${this.key}.enabled`)) return;

            return orig.apply(self, args);
        })

        Patcher.instead(UpsellCard, 'default', (self, args, orig) => {
            if (get(`${this.key}.enabled`)) return;

            return orig.apply(self, args);
        })

        Patcher.before(TextModule.Text, 'render', (_, args) => {
            if (!get(`${this.key}.enabled`) || typeof args[0].children !== 'string') return;

            this.props.forEach(k => {
                const original = M[`EMOJI_POPOUT_${k}`];
                const replace = M[`EMOJI_POPOUT_PREMIUM_${k}`];

                if (!args[0].children?.includes(original)) return;
                args[0].children = args[0].children?.replace?.(original, replace);
            })
        })

        Patcher.before(Settings.SearchableSettingsList, 'type', (_, [{ sections }]) => {
			const section = sections.find(section => section.settings.includes('PREMIUM'));
			section && (section.settings = section.settings.filter(setting => setting !== 'PREMIUM'));
		});
    }
};
