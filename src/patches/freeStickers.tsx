import { Messages, metro } from '../common/exports';
import { get } from '../common/store';
import { Patch } from '../common/patch';

const { findStore } = metro;

const StickerStore = findStore("Stickers");
const ChannelStore = findStore("Channel");

export default class extends Patch {
    static override key = 'freeStickers';
    static override title = 'Free Stickers';
    static override subtitle = 'Turns invalid stickers into images when sent. Note that animated stickers will animate :c';
    static override icon = 'img_nitro_sticker';

    static getStickerUrl(id: string) {
        return `https://media.discordapp.net/stickers/${id}.png?size=160&quality=lossless`
    };

    static canUseSticker(sticker, channelId) {
        return !sticker.guild_id || (sticker.guild_id === ChannelStore.getChannel(channelId).guild_id);
    }
    
    static override patch(Patcher) {
        Patcher.instead(Messages, "sendStickers", (self, args, orig) => {
            if (!get(`${this.key}.enabled`)) return orig.apply(self, args);

            const [ channelId, stickerIds, _, extra ] = args;
            
            const stickers = stickerIds.map(stickerId => StickerStore.getStickerById(stickerId));
            const invalidStickers = stickers?.filter?.(sticker => !this.canUseSticker(sticker, channelId));

            if (invalidStickers.length < 1) return orig.apply(self, args);
      
            const content = invalidStickers.map(sticker => this.getStickerUrl(sticker.id)).join("\n");

            Messages.sendMessage(
                channelId,
                { content },
                null,
                extra
            );
        })
    }
};
