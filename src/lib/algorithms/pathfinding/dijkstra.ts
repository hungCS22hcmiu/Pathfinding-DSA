import { getUntraversedNeighbors } from "../../../utils/getUntraversedNeighbors";
import { isEqual } from "../../../utils/helper";
import { GridType, TileType } from "../../../utils/types";
import { MinHeap } from "../../../utils/MinHeap";

export const dijkstra = (
  grid: GridType,
  startTile: TileType,
  endTile: TileType
) => {
  const traversedTiles = [];
  const base = grid[startTile.row][startTile.col];
  base.distance = 0;

  // Use MinHeap for efficient extraction of the minimum distance tile
  const minHeap = new MinHeap<TileType>((a, b) => a.distance - b.distance);
  minHeap.push(base);

  while (!minHeap.isEmpty()) {
    const currentTile = minHeap.pop();
    if (!currentTile) break;
    if (currentTile.isWall) continue;
    if (currentTile.isTraversed) continue; // Skip if already traversed
    if (currentTile.distance === Infinity) break;

    currentTile.isTraversed = true;
    traversedTiles.push(currentTile);

    if (isEqual(currentTile, endTile)) break;

    const neighbors = getUntraversedNeighbors(grid, currentTile);
    for (let i = 0; i < neighbors.length; i += 1) {
      if (currentTile.distance + 1 < neighbors[i].distance) {
        neighbors[i].distance = currentTile.distance + 1;
        neighbors[i].parent = currentTile;
        minHeap.push(neighbors[i]);
      }
    }
  }

  const path = [];
  let current = grid[endTile.row][endTile.col];
  while (current !== null && current.parent !== undefined) {
    current.isPath = true;
    path.unshift(current);
    current = current.parent!;
  }
  return { traversedTiles, path };
};