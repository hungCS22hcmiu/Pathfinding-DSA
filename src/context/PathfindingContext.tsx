import React, { createContext, useState } from 'react';
import { AlgorithmType, GridType, MazeType, } from "../utils/types";
import { END_TILE_CONFIGURATION, START_TILE_CONFIGURATION } from "../utils/constants";
import { createGrid } from '../utils/helper';

interface PathfindingContextInterface{
    algorithm: AlgorithmType;
    setAlgorithm: (algorithm: AlgorithmType) => void;

    maze: MazeType;
    setMazeType: (maze: MazeType) => void;

    grid: GridType;
    setGrid: (grid: GridType) => void;

    isGraphVisualized: boolean;
    setGraphVisualized: (isGraphVisualized: boolean) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const PathfindingContext = createContext<
PathfindingContextInterface | undefined>(undefined);

// export const PathfindingProvider = ({children}: {children: React.ReactNode}) => {
//     const [algorithm, setAlgorithm] = useState<AlgorithmType>("BFS");
//     const [maze, setMazeType] = useState<MazeType>("NONE");
//     const [grid, setGrid] = useState<GridType>(createGrid(START_TILE_CONFIGURATION, END_TILE_CONFIGURATION));
//     const [isGraphVisualized, setGraphVisualized] = useState<boolean>(false);

//     return (
//         <PathfindingContext.Provider
//             value={{
//                 algorithm,
//                 setAlgorithm,
//                 maze,
//                 setMazeType,
//                 grid,
//                 setGrid,
//                 isGraphVisualized,
//                 setGraphVisualized,
//             }}
//         >
//             {children}
//         </PathfindingContext.Provider>
//     );
// }
export const PathfindingProvider = ({ children }: { children: React.ReactNode }) => {
    const [algorithm, setAlgorithm] = useState<AlgorithmType>("BFS");
    const [maze, setMazeType] = useState<MazeType>("NONE");
    const [grid, setGrid] = useState<GridType>(
        createGrid(START_TILE_CONFIGURATION, END_TILE_CONFIGURATION)
    );
    const [isGraphVisualized, setGraphVisualized] = useState<boolean>(false);

    return (
        <PathfindingContext.Provider
            value={{
                algorithm,
                setAlgorithm,
                maze,
                setMazeType,
                grid,
                setGrid,
                isGraphVisualized,
                setGraphVisualized,
            }}
        >
            {children}
        </PathfindingContext.Provider>
    );
};
