import { Permission } from '../common/exports';
import { get } from '../common/store';
import { Patch } from '../common/patch';

export default class extends Patch {
    static override key = 'pseudoPatches';
    static override title = 'Pseudo Patches';
    static override subtitle = 'Patches several "can" functions. Must be on to use most of the features in this plugin.';
    static override icon = 'ic_message_retry';

    static override patch(Patcher) {
        Object.keys(Permission).forEach(k => {
            k.includes("can") && Patcher.instead(Permission, k, (self, args, orig) => {
                if (get(`${this.key}.enabled`)) return true;

                return orig.apply(self, args);
            })
        })
    }
};
