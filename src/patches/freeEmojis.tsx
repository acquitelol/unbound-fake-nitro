import { metro } from '../common/exports';
import { get } from '../common/store';
import { Patch } from '../common/patch';

const { findByProps } = metro;

export default class extends Patch {
    static override key = "freeEmojis";
    static override title = "Free Emojis";
    static override subtitle = "Allows you to send any custom or animated emoji as an image/gif link.";
    static override icon = "ic_image";
    
    static override patch(Patcher) {
        
    }
};
