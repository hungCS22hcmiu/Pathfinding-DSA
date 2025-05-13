import { MazeSelectType, SpeedSelectType } from "./types";

export const MAX_ROWS = 39;
export const MAX_COLS = 49;

export const START_TILE_CONFIGURATION = {
    row: 1,
    col: 1, 
    isEnd: false,
    isWall: false,
    isPath: false,
    distance: 0,
    isStart: true,
    parent: null,
    isTraversed: false
};

export const END_TILE_CONFIGURATION = {
    row: MAX_ROWS - 2,
    col: MAX_COLS - 2,
    isEnd: true,
    isWall: false,
    isPath: false,
    distance: 0,
    isStart: false,
    parent: null,
    isTraversed: false
}

export const TILE_STYLE = "lg:w-[17px] md:w-[15px] xs:w-[8px] w-[7px] lg:h-[17px] md:h-[15px] xs:h-[8px] h-[7px] border-sky-200 border-t border-r";
export const TRAVERSED_TILE_STYLE = TILE_STYLE + " bg-cyan-400";
export const START_TILE_STYLE = TILE_STYLE + " bg-green-400";
export const END_TILE_STYLE = TILE_STYLE + " bg-yellow-400";
export const WALL_TILE_STYLE = TILE_STYLE + " bg-gray-400";
export const PATH_TILE_STYLE = TILE_STYLE + " bg-green-500";

export const MAZES: MazeSelectType[] = [
    { name: "No Maze", value: "NONE" },
    { name: "Binary Tree", value: "BINARY_TREE" },
    { name: "Recursive Division", value: "RECURSIVE_DIVISION" },
  ];

export const PATHFINDING_ALGORITHMS: MazeSelectType[] = [
    {name: "Dijkstra", value: "DIJKSTRA"},
    {name: "A-Star", value: "A_STAR"},
    {name: "Breadth First Search", value: "BFS"},
    {name: "Depth First Search", value: "DFS"},
]

export const SPEEDS:SpeedSelectType[] = [
    { name: "Fast", value: 0.5 },
    { name: "Medium", value: 1 },
    { name: "Slow", value: 2 },
]
export const SLEEP_TIME = 8;