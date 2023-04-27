import { ItemInterface } from "react-sortablejs";
import {Song} from "./gen/queue_pb";

class SongItem implements ItemInterface {
    id: number
    song: Song
}

export {SongItem}