import { MutableRefObject, useState } from "react";
import { usePathFinding } from "../hook/usePathFinding";
import { useTile } from "../hook/useTile";
import { EXTENDED_SLEEP_TIME, MAZES, PATHFINDING_ALGORITHMS, SLEEP_TIME, SPEEDS } from "../utils/constants";
import { resetGrid } from "../utils/resetGrid";
import { AlgorithmType, MazeType, SpeedType } from "../utils/types";
import { Select } from "./Select";
import { runMazeAlgorithm } from "../utils/runMazeAlgorithm";
import { useSpeed } from "../hook/useSpeed";
import { PlayButton } from "./PlayButton";
import { runPathfindingAlgorithm } from "../utils/runPathfindingAlgorithm";
import { animatePath } from "../utils/animatePath";

export function Nav({isVisualizationRunningRef} : {isVisualizationRunningRef: MutableRefObject<boolean> }) {
    const [isDisabled, setIsDisabled] = useState(false);
    const {maze, setMaze, grid, setGrid, isGraphVisualized, setIsGraphVisualized, algorithm, setAlgorithm} = usePathFinding();
    const {startTile, endTile} = useTile();
    const {speed , setSpeed} = useSpeed();
    const handleGenerateMaze = (maze: MazeType) => {
        if (maze === "NONE") {
            setMaze(maze);
            resetGrid({grid, startTile, endTile});
            return;
        }
        setMaze(maze);
        setIsDisabled(true);
        runMazeAlgorithm({
            maze, grid, startTile, endTile, setIsDisabled, speed
        });
        const newGrid = grid.slice();
        setGrid(newGrid);
        setIsGraphVisualized(false);
    };

    const handlerRunVisualizer = () => {
        if (isGraphVisualized) {
        setIsGraphVisualized(false);
        resetGrid({ grid: grid.slice(), startTile, endTile });
        return;
        }
        // run the algorithm

        const {traversedTiles,path} = runPathfindingAlgorithm({
            algorithm,
            grid,
            startTile,
            endTile,
        })

        animatePath(traversedTiles, path, startTile, endTile, speed);
        setIsDisabled(true);
        isVisualizationRunningRef.current = true;
        setTimeout(() => {
            const newGrid = grid.slice();
            setGrid(newGrid);
            setIsGraphVisualized(true);
            setIsDisabled(false);
            isVisualizationRunningRef.current = false;
        },( SLEEP_TIME * (traversedTiles.length + SLEEP_TIME *2)+ EXTENDED_SLEEP_TIME*(path.length + 60)*SPEEDS.find((s) => s.value === speed)!.value));
    }
    return (
    <div className="flex items-center justify-center min-h-[4.5rem] border-b bg-gradient-to-r from-sky-800 to-blue-600 shadow-lg px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-6xl space-y-4 sm:space-y-0">
        
        {/* Title */}
        <h1 className="text-white text-2xl font-semibold tracking-wide sm:w-[40%] w-full sm:text-left text-center">
            Fastest Path
        </h1>
        
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4">
            <Select
            label="Maze"
            value={maze}
            options={MAZES}
            onChange={(e) => handleGenerateMaze(e.target.value as MazeType)}
            />
            <Select
            label="Graph"
            value={algorithm}
            options={PATHFINDING_ALGORITHMS}
            onChange={(e) => setAlgorithm(e.target.value as AlgorithmType)}
            />
            <Select
            label="Speed"
            value={speed}
            options={SPEEDS}
            onChange={(e) => setSpeed(parseInt(e.target.value) as SpeedType)}
            />
            <PlayButton
            isDisabled={isDisabled}
            isGraphVisualized={isGraphVisualized}
            handlerRunVisualizer={handlerRunVisualizer}
            />
        </div>
        </div>
    </div>
    );
}


//     return (
//         <div className="flex items-center justify-center min-h-[4.5rem] border-b shadow-gray-100 sm:px-5 px-0">
//             <div className="flex items-center lg:justify-between justify-center w-full sm:w-[52rem]">
//                 <h1 className="lg:flex hidden w-[40%] text-2xl pl-1 text-white">Fastest Path</h1>
//                 <div className="flex sm:items-end items-center justify-start sm:justify-between sm:flex-row flex-col sm:space-y-0 space-y-3 sm:py-0 py-4 sm:space-x-4">
//                     <Select
//                         label="Maze"
//                         value={maze}
//                         options={MAZES}
//                         onChange={(e) => handleGenerateMaze(e.target.value as MazeType)}
//                     />
//                     <Select 
//                         label='Graph'
//                         value={algorithm}
//                         options={PATHFINDING_ALGORITHMS}
//                         onChange={(e) => {setAlgorithm(e.target.value as AlgorithmType);}}
//                     />
//                     <Select 
//                         label ='Speed'
//                         value={speed}
//                         options={SPEEDS}
//                         onChange={(e) => {setSpeed(parseInt(e.target.value) as SpeedType);}}
//                     />
//                     <PlayButton
//                         isDisabled={isDisabled}
//                         isGraphVisualized={isGraphVisualized}
//                         handlerRunVisualizer={handlerRunVisualizer}
//                     />
//                 </div>
//             </div>
//         </div>
//     )
// }