import { Permission } from '../common/exports';
import { Patch } from '../common/patch';

export default class extends Patch {
    static override key = 'pseudoPatches';
    static override title = 'Pseudo Patches';
    static override subtitle = 'Patches several \'can\' functions. Must be on to use most of the features in this plugin.';
    static override icon = 'ic_message_retry';

    static override patch(Patcher) {
        // Unfreezing this object isn't required because Unbound disables Object.freeze on the loader level.
        Object.keys(Permission).forEach(k => {
            k.includes('can') && Patcher.instead(Permission, k, (self, args, orig) => {
                if (this.enabled) return true;

                return orig.apply(self, args);
            })
        })
    }
};
