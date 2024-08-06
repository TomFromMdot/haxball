import {room, store} from "@context";
import { IPlayer } from "@types";

export default (player: IPlayer) => {
    store.playersActivity[player.id] = Date.now();
}