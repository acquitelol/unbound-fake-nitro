// Most of this code is referencing https://github.com/colin273/enmity-plugins/blob/master/Freemoji
// Thanks colin ~!!! <3
import { metro } from '../common/exports';
import { get } from '../common/store';
import { Patch } from '../common/patch';

const { findByProps, findStore } = metro;

type Emoji = {
    roles: any[],
    require_colons: boolean,
    name: string,
    originalName?: string,
    managed: boolean,
    id: string,
    available: boolean,
    animated: boolean,
    url: string,
    allNamesString: string,
    guildId: string,
    size: number
}

type Message = {
    content: string;
    validNonShortcutEmojis: Emoji[];
}

const [
    Permission,
    LazyActionSheet,
    Messages
] = findByProps(
    { params: ['canUseEmojisEverywhere'], lazy: true },
    { params: ['openLazy', 'hideActionSheet'], lazy: true },
    { params: ['sendMessage', 'receiveMessage'], lazy: true },
    { bulk: true }
);

const SelectedGuildStore = findStore('SelectedGuild');
const Uploading = findByProps("uploadLocalFiles", { lazy: true });

export default class extends Patch {
    static override key = 'freeEmojis';
    static override title = 'Free Emojis';
    static override subtitle = 'Allows you to send any custom or animated emoji as an image/gif link.';
    static override icon = 'ic_emoji_24px';

    static isReacting = false;
    static parseEmojis(message: Message) {
        if (!message || !get(`${this.key}.enabled`)) return;
            
        message.validNonShortcutEmojis.forEach((emoji: Emoji, i: number) => {
            if (emoji.guildId !== SelectedGuildStore.getGuildId() || emoji.animated) {
                message.content = message.content.replace(
                    `<${emoji.animated ? 'a' : ''}:${emoji.originalName ?? emoji.name}:${emoji.id}>`,
                    // TODO
                    emoji.url.replace('webp', 'png').replace(/size=\d+/, 'size=48')
                )

                delete message.validNonShortcutEmojis[i];
            }
        });

        message.validNonShortcutEmojis = message.validNonShortcutEmojis.filter((e: Emoji) => e);
    }
    
    static override patch(Patcher) {
        console.log({ Permission, LazyActionSheet, Messages, Uploading })

        const patchInstead = (prop: string) => Patcher.instead(Permission, prop, (self, args, orig) => {
            if (!get(`${this.key}.enabled`)) return orig.apply(self, args);

            return !this.isReacting;
        })

        patchInstead('canUseEmojisEverywhere');
        patchInstead('canUseAnimatedEmojis')

        Patcher.before(LazyActionSheet, 'openLazy', (_, [, sheetName, { pickerIntention }]) => {
            if (!get(`${this.key}.enabled`)) return;

            switch (sheetName) {
                case 'EmojiPickerActionSheet':
                    if (pickerIntention !== 0) break;
                case 'MessageLongPressActionSheet':
                    this.isReacting = true;
            }
        });
    
        Patcher.after(LazyActionSheet, 'hideActionSheet', () => get(`${this.key}.enabled`) && (this.isReacting = false));

        Patcher.before(Messages, 'sendMessage', (_, [, message]: [string, Message]) => this.parseEmojis(message));
        Patcher.before(Uploading, 'uploadLocalFiles', (_, [{ parsedMessage }]: [{ parsedMessage: Message }]) => this.parseEmojis(parsedMessage));
    }
};
