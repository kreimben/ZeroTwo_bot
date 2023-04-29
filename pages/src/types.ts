import {ItemInterface} from "react-sortablejs";
import {Song} from "./gen/queue";

class SongItem implements ItemInterface {
    id: number
    song: Song

    constructor(id: number, song: Song) {
        this.id = id;
        this.song = song;
    }
}

export {SongItem}