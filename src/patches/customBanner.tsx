import { getIDByName, metro, React, View } from '../common/exports';
import { get } from '../common/store';
import { Patch } from '../common/patch';
import { userBGConstants } from '../common/constants';

const { 
    findByProps, 
    components: { 
        Redesign 
    } 
} = metro;

const UserBanner = findByProps('default', 'getUserBannerURL', { lazy: true });
const Linking = findByProps('openURL', 'openDeeplink', { lazy: true });

type Banner = {
    _id: string
    uid: string
    img: string
    orientation: string
}

export default class self extends Patch {
    static override key = 'customBanner';
    static override title = 'Custom Banner';
    static override subtitle = 'Displays custom banners with the UserBG API. Request your own at the server below.';
    static override icon = 'ic_profile_24px';
    
    static banners: Banner[] | undefined;

    static fetchBanners() {
        return new Promise((resolve, reject) => {
            fetch(userBGConstants.bannersSource)
                .then(res => {
                    if (!res.ok) reject('Failed to fetch badges.');
                    return res.json()
                })
                .then(res => {
                    this.banners = res;
                    resolve(1);
                })
                .catch(console.error)
        })
    }

    static getBanner(user) {
        const customBanner = this.banners?.find(i => i.uid === user.id);

        return (!user?.banner && customBanner) 
            ? customBanner.img
            : user.banner
    }

    static override patch(Patcher) {
        Patcher.after(UserBanner, 'getUserBannerURL', (_, [user]) => {
            if (!get(`${this.key}.enabled`)) return user.banner;

            if (!this.banners) {
                this.fetchBanners();
                return user.banner;
            }

            return this.getBanner(user);
        })
    }

    static override render({ disabled }) {
        const [loading, setLoading] = React.useState(false);

        return <View style={{ flexDirection: 'row', marginHorizontal: 16, marginBottom: 16 }}>
            <Redesign.Button 
                text={'Join Server'}
                onPress={() => Linking.openDeeplink(userBGConstants.serverInvite)}
                style={{ flex: 0.5, marginRight: 10 }}
                variant={'primary'}
                size={'md'}
                icon={getIDByName('icon-invite')}
                iconPosition={'start'}
                disabled={disabled}
            />
            <Redesign.Button 
                text={'Reload Banners'}
                onPress={() => {
                    setLoading(true);

                    self.fetchBanners()
                        .then(() => setLoading(false))
                        .catch((e) => console.error(e));
                }}
                style={{ flex: 0.5 }}
                variant={'primary-alt'}
                size={'md'}
                icon={getIDByName('ic_message_retry')}
                iconPosition={'start'}
                disabled={disabled}
                loading={loading}
            />
        </View>
    }
};
