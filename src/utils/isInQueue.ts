import { isEqual } from "./helper";
import { TileType } from "./types";

export function isInQueue(tile: TileType, queue: TileType[]) {
    for (let i = 0; i < queue.length; i++) {
        if (isEqual(tile, queue[i])) {
            // If the tile is found in the queue, return true
            return true;
        }
    }
    return false;

}