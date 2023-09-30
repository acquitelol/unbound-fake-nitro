import manifest from '../../dist/manifest.json';
import { metro, on } from '../common/exports';
import { Patch } from '../common/patch';

const [
    IconModule, 
    IconIdsModule
] = metro.findByProps(
    { params: ['OFFICIAL_ALTERNATE_ICONS'], lazy: true },
    { params: ['FreemiumAppIconIds'], lazy: true },
    { bulk: true }
)

export default class extends Patch {
    static override key = 'appIcons';
    static override title = 'App Icons';
    static override subtitle = 'Allows you to access all of the premium and cute new Discord App Icons without nitro.';
    static override icon = 'Discord';

    static override patch(Patcher) {
        const origFreemiumAppIconIds = IconIdsModule.FreemiumAppIconIds;

        on('changed', (store, key, value) => {
            if (store === manifest.name && key === `${this.key}.enabled`) {
                if (value) {
                    const alternateIcons = IconModule.OFFICIAL_ALTERNATE_ICONS()

                    alternateIcons.forEach(x => x.isPremium = false);
                    IconModule.ICONS.forEach(x => x.isPremium = false);

                    Patcher.instead('OFFICIAL_ALTERNATE_ICONS', IconModule, () => alternateIcons);
                    IconIdsModule.FreemiumAppIconIds = IconIdsModule.MasterAppIconIds;
                } else {
                    IconModule.ICONS.forEach(x => x.isPremium = true);
                    IconIdsModule.FreemiumAppIconIds = origFreemiumAppIconIds;
                    Patcher.unpatchAll();
                }
            }
        })
    }
};
