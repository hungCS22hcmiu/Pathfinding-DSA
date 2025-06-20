import { MutableRefObject, useState, useRef } from "react";
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
    // timer
    const [time, setTime] = useState(0);
    const timerRef = useRef<number | null>(null);
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
        // timer
        setTime(0);
        if (timerRef.current) clearInterval(timerRef.current);
    };

    const handlerRunVisualizer = () => {
        if (isGraphVisualized) {
            setIsGraphVisualized(false);
            resetGrid({ grid: grid.slice(), startTile, endTile });
            setTime(0);
            if (timerRef.current) clearInterval(timerRef.current);
            return;
        }

        //start the timer
        setTime(0);
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setTime(prev => prev + 10);
        }, 10);
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
            //stop the timer
            if (timerRef.current) clearInterval(timerRef.current);
        },( SLEEP_TIME * (traversedTiles.length + SLEEP_TIME *2)+ EXTENDED_SLEEP_TIME*(path.length + 60)*SPEEDS.find((s) => s.value === speed)!.value));
    }

    return (
        <div className="flex items-center justify-between min-h-[4.5rem] border-b bg-gradient-to-r from-sky-800 to-purple-600 shadow-lg px-4 sm:px-6 w-full">
            {/* Left: Title */}
            <h1 className="text-white text-2xl font-semibold tracking-wide">
                Fastest Path
            </h1>
            {/* Center: Controls */}
            <div className="flex flex-wrap items-center justify-center gap-4">
                <Select
                    label="Maze Type"
                    value={maze}
                    options={MAZES}
                    onChange={(e) => handleGenerateMaze(e.target.value as MazeType)}
                />
                <Select
                    label="Algorithm Type"
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
            {/* Right: Timer */}
            <div className="text-white font-mono text-lg min-w-[110px] text-right">
                Time: {(time / 1000).toFixed(2)}s
            </div>
        </div>
    );
}