import freeEmojis from "./freeEmojis";

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
