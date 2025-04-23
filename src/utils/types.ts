export type AlgorithmType = "DIJKSTRA" | "A_STAR" | "BFS" | "DFS";
export type MazeType = "NONE" | "BINARY_TREE" | "RECURSIVE_DIVISION" | "RANDOM";
export type TileType = {
    row: number;
    col: number;
    isEnd: boolean;
    isWall: boolean;
    isPath: boolean;
    distance: number;
    isStart: boolean;
    parent: TileType | null;
}
export type GridType = TileType[][];