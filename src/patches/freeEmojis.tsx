// Most of this code is referencing https://github.com/colin273/enmity-plugins/blob/master/Freemoji
// Thanks colin ~!!! <3
import { Messages, Uploading, metro } from '../common/exports';
import { Patch } from '../common/patch';

const { findStore } = metro;

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

const SelectedGuildStore = findStore('SelectedGuild', { lazy: true });

export default class extends Patch {
    static override key = 'freeEmojis';
    static override title = 'Free Emojis';
    static override subtitle = 'Allows you to send any custom or animated emoji as an image/gif link.';
    static override icon = 'ic_emoji_24px';

    static parseEmojis(message: Message) {
        if (!message || !message.validNonShortcutEmojis || !this.enabled) return;
            
        message.validNonShortcutEmojis.forEach((emoji: Emoji, i: number) => {
            if (emoji.guildId !== SelectedGuildStore.getGuildId() || emoji.animated) {
                message.content = message.content.replace(
                    `<${emoji.animated ? 'a' : ''}:${emoji.originalName ?? emoji.name}:${emoji.id}>`,
                    // TODO
                    emoji.url.replace('webp', 'png').replace(/size=\d+/, `size=48&quality=lossless&name=${emoji.originalName ?? emoji.name}`)
                )

                delete message.validNonShortcutEmojis[i];
            }
        });

        message.validNonShortcutEmojis = message.validNonShortcutEmojis.filter((e: Emoji) => e);
    }
    
    static override patch(Patcher) {
        Patcher.before(Messages, 'sendMessage', (_, [, message]: [string, Message]) => this.parseEmojis(message));
        Patcher.before(Uploading, 'uploadLocalFiles', (_, [{ parsedMessage }]: [{ parsedMessage: Message }]) => this.parseEmojis(parsedMessage));
    }
};
