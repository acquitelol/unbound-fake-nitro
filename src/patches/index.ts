import freeEmojis from './freeEmojis';
import realEmojis from './realEmojis';
import freeStickers from './freeStickers';

import profileThemes from './profileThemes';
import customBanner from './customBanner';

import hideUpsells from './hideUpsells';
import pseudoPatches from './pseudoPatches';

/**
 * TO-DO

    ~ chat
        - custom emojis - done
        - custom stickers - done
        - convert emoji links into real emojis client side - done
        - split large messages

    ~ profiles
        - 3y3 custom profile colors - done
        - usrbg custom banner - done

    ~ client
        - hide upsells in places throughout the client (get nitro button etc) - done
        - free remixing
        - free client themes - done apparently because pseudoPatches enables them
        - add client side nitro badge (possibly?)
 */
export const sections = {
    client: {
        icon: 'ic_nitro_rep_24px',
        patches: {
            hideUpsells,
            pseudoPatches
        }
    },
    chat: {
        icon: 'img_nitro_star',
        patches: {
            freeEmojis,
            realEmojis,
            freeStickers
        }
    },
    profile: {
        icon: 'ic_profile_24px',
        patches: {
            profileThemes,
            customBanner
        }
    }
};

export const patchAll = (Patcher) => Object.values(sections)
    .forEach(section => {
        Object.values(section.patches).forEach(value => {
            try {
                value.patch(Patcher);
            } catch (e) {
                console.error(`Patch '${value.title}' (${value.key}) errored with '${e.message ?? e}'.`);
            };
        });
    });
