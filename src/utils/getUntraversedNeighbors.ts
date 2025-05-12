import { MAX_ROWS } from "./constants";
import { GridType, TileType } from "./types";

export const getUntraversedNeighbors = (grid: GridType, tile: TileType) => {
    const {row, col} = tile;
    const neighbors = [];

    if (row > 0) neighbors.push(grid[row - 1][col]); // Up
    if (row < MAX_ROWS - 1) neighbors.push(grid[row + 1][col]); // Down
    if (col > 0) neighbors.push(grid[row][col - 1]); // Left
    if (col < MAX_ROWS - 1) neighbors.push(grid[row][col + 1]); // Right
    return neighbors.filter((neighbor) => !neighbor.isTraversed);
}