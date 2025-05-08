export type AlgorithmType = "DIJKSTRA" | "A_STAR" | "BFS" | "DFS";
export type MazeType = "NONE" | "BINARY_TREE" | "RECURSIVE_DIVISION" | "RANDOM";

export type MazeSelectType = {
    name: string;
    value: MazeType;    
}
export type TileType = {
    row: number;
    col: number;
    isEnd: boolean;
    isWall: boolean;
    isPath: boolean;
    distance: number;
    isStart: boolean;
    parent: TileType | null;
    isTraversed: boolean;
}
export type GridType = TileType[][];

export type SpeedType = 2 | 1 | 0.5;
export type SpeedSelectType = {
    name: string;
    value: SpeedType;
}