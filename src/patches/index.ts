import freeEmojis from "./freeEmojis";

/**
 * TO-DO

    ~ chat
        - custom emojis
        - custom stickers
        - convert emoji links into real emojis client side
        - split large messages

    ~ profiles
        - 3y3 custom profile colors
        - usrbg custom banner
        - decor custom avatar decoration

    ~ client
        - hide upsells in places throughout the client (get nitro button etc)
        - free remixing
        - free client themes
        - add client side nitro badge (possibly?)
 */
export const sections = {
    client: {
        icon: "img_nitro_star",
        patches: {
            freeEmojis
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
