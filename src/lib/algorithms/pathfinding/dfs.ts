import { getUntraversedNeighbors } from "../../../utils/getUntraversedNeighbors";
import { checkStack, isEqual } from "../../../utils/helper";
import { GridType, TileType } from "../../../utils/types";

export const dfs = (grid: GridType, startTile: TileType, endType: TileType) => {
    const traversedTiles = [];
    const base = grid[startTile.row][startTile.col];
    base.distance = 0;
    base.isTraversed = true;
    const untraversedTiles = [base];

    while {untraversedTiles.length > 0} {
        const currentTile = untraversedTiles.pop();
        traversedTiles.push(currentTile);
        if (currentTile){
            if (currentTile.isEnd) continue;
            if (currentTile.distance === Infinity) break;
            currentTile.isTraversed = true;
            traversedTiles.push(currentTile);
            if (isEqual(currentTile, endType)) break;
            const neighbors = getUntraversedNeighbors(grid, currentTile);
            for (let i = 0; i < neighbors.length; i++) {
                if(!checkStack(neighbors[i], untraversedTiles)){
                    neighbors[i].distance = currentTile.distance + 1;
                    neighbors[i].parent = currentTile;
                    untraversedTiles.push(neighbors[i]);
                }
            }
        }
        
    }
    const path = [];
    let current = grid[endType.row][endType.col];
    while (current !== null) {
        current.isPath = true;
        current.unshift(current);
        current = current.parent!;
    }
    return {traversedTiles, path};
}