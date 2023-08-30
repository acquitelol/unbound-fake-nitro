// This code references https://github.com/redstonekasi/vendetta-plugins/tree/main/plugins/realmoji
import { metro } from '../common/exports';
import { get } from '../common/store';
import { Patch } from '../common/patch';

const { 
    findStore,
    findByName
} = metro;

type Row = {
    rowType: number;
    message: {
        content: string;
        embeds: Record<string, any>[]
    }
}

const { getCustomEmojiById } = findStore("Emoji");
const RowManager = findByName("RowManager");

export default class extends Patch {
    static override key = 'realEmojis';
    static override title = 'Real Emojis';
    static override subtitle = 'Formats fake nitro emoji links into real emojis by parsing the links when rendering the chat.';
    static override icon = 'ic_double_down_arrow';

    static emojiLinkRegex = /https:\/\/cdn.discordapp.com\/emojis\/(\d+)\.\w+/;

    static override patch(Patcher) {
        Patcher.before(RowManager.prototype, "generate", (_, [row]: [Row]) => {
            if (row.rowType !== 1 
                || !row.message?.content 
                || !get(`${this.key}.enabled`)
            ) {
                return;
            }
          
            let content = row.message.content;
            const emojiLinkRegex = this.emojiLinkRegex;
          
            if (typeof content !== "string" || !content.match(emojiLinkRegex)) {
                return;
            }
          
            let emojis = content.slice(content.match(emojiLinkRegex)?.index).trim().split("\n");
          
            if (!emojis.every(slice => slice.match(emojiLinkRegex))) {
                return;
            }
          
            content = content.slice(0, content.match(emojiLinkRegex)?.index);
            content = content.replace(/  /g, () => ` ${emojis.shift()} `).trim();
          
            if (emojis.length) {
                content += ` ${emojis.join(" ")}`;
            }
          
            const embeds = row.message.embeds.filter(embed => !(embed.type === "image" && embed.url.match(emojiLinkRegex)));
          
            row.message.content = content;
            row.message.embeds = embeds;
            row["__fakenitro"] = true;
        });

        Patcher.after(RowManager.prototype, "generate", (_, [data], row: Row) => {
            if (data.rowType !== 1 
                || !data["__fakenitro"]
                || !Array.isArray(row.message.content)
                || !get(`${this.key}.enabled`)
            ) {
                return;
            }
          
            const { content } = row.message;
          
            if (!Array.isArray(content)) {
                return;
            }
          
            const emojiLinkRegex = this.emojiLinkRegex;
          
            const jumbo = content.every((c) => {
                if (c.type === "link" && c.target.match(emojiLinkRegex)) {
                    return true;
                }

                if (c.type === "text" && c.content === " ") {
                    return true;
                }

                return false;
            });
          
            for (let i = 0; i < content.length; i++) {
                const element = content[i];
            
                if (element.type !== "link") {
                    continue;
                }
            
                const match = element.target.match(emojiLinkRegex);
            
                if (!match) {
                    continue;
                }
            
                const url = `${match[0]}?size=4096`;
                const emoji = getCustomEmojiById(match[1]);
            
                content[i] = {
                    type: "customEmoji",
                    id: match[1],
                    alt: emoji?.name ?? "<invalid>",
                    src: url,
                    frozenSrc: url.replace("gif", "webp"),
                    jumboable: jumbo ? true : undefined,
                };
            }
        });
    }
};
