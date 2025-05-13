
import { bfs } from "../lib/algorithms/pathfinding/bfs";
import { AlgorithmType, GridType, TileType } from "./types";

export const runPathfindingAlgorithm = ({
    algorithm,
    grid,
    startTile,
    endTile,
}: {
    algorithm: AlgorithmType;
    grid: GridType;
    startTile: TileType;
    endTile: TileType;
}) => {
    switch (algorithm) {
        case "BFS":
            return bfs(grid, startTile, endTile);
        default:
            return bfs(grid, startTile, endTile);
// import { AlgorithmType, GridType } from './types';
// export const runPathfindingAlgorithm = ({
//     algorithm, 
//     grid, 
//     startTile, 
//     endTile
// }:{
//     algorithm: AlgorithmType;
//     grid: GridType;
//     startTile: TitleType;
//     startTitle: TitleType;
//     endTile: TitleType;
// }) => {
//     switch (algorithm) {
//         case "BFS":
//             return;
//         default:
//             return;
//     }
// }