import freeEmojis from './freeEmojis';

import profileThemes from './profileThemes';
import customBanner from './customBanner';

/**
 * TO-DO

    ~ chat
        - custom emojis - done
        - custom stickers
        - convert emoji links into real emojis client side
        - split large messages

    ~ profiles
        - 3y3 custom profile colors - done
        - usrbg custom banner - done

    ~ client
        - hide upsells in places throughout the client (get nitro button etc)
        - free remixing
        - free client themes
        - add client side nitro badge (possibly?)
 */
export const sections = {
    client: {
        icon: 'img_nitro_star',
        patches: {
            freeEmojis
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
