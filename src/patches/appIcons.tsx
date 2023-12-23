import { metro, on } from '../common/exports';
import { Patch } from '../common/patch';

const IconModule = metro.findByProps('OFFICIAL_ALTERNATE_ICONS', { lazy: true });
const IconIdModule = metro.findByProps('FreemiumAppIconIds', { lazy: true });
const alternateIcons = IconModule.OFFICIAL_ALTERNATE_ICONS()

export default class extends Patch {
    static override key = 'appIcons';
    static override title = 'App Icons';
    static override subtitle = 'Enables Discord\'s fancy custom \'App Icons\' without needing nitro.';
    static override icon = 'Discord';

    static override patch() {
        const originalAlternateIcons = alternateIcons.slice();
        const originalIcons = IconModule.ICONS.slice();
        const originalFreemiumAppIconIds = { ...IconIdModule.FreemiumAppIconIds };

        on('changed', ({ key, value }) => {
            if (key === `${this.key}.enabled`) {
                if (value) {
                    alternateIcons.forEach(icon => icon.isPremium = false)
                    IconModule.ICONS.forEach(icon => { icon.isPremium = false });
                    IconIdModule.FreemiumAppIconIds = IconIdModule.MasterAppIconIds;
                } else {
                    alternateIcons.forEach((icon, i) => icon.isPremium = originalAlternateIcons[i])
                    IconModule.ICONS.forEach((icon, i) => icon.isPremium = originalIcons[i])
                    IconIdModule.FreemiumAppIconIds = originalFreemiumAppIconIds
                }
            }
        })
    }
};
