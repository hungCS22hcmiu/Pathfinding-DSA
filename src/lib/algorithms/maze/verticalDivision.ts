import { SPEEDS, WALL_TILE_STYLE } from "../../../utils/constants";
import { getRandomInt, sleep } from "../../../utils/helper";
import { GridType, TileType, SpeedType } from "../../../utils/types";
import recursiveDivision from "./recursiveDivision";

export async function verticalDivision({
    grid,
    startTile,
    endTile,
    row,
    col,
    height,
    width,
    setIsDisabled,
    speed
}: {
    grid: GridType;
    startTile: TileType;
    endTile: TileType;
    row: number;
    col: number;
    height: number;
    width: number;
    setIsDisabled: (isDisabled: boolean) => void;
    speed: SpeedType
}) {
    const makeWallAt = col + getRandomInt(0, width-1) * 2 + 1;
    const makePassageAt = row + getRandomInt(0, height) * 2;
    for (let i = 0; i < 2*height+1; i++){
        if (makePassageAt !== row + i) {
            if (!grid[row+i][makeWallAt].isStart && !grid[row+i][makeWallAt].isEnd) {
                grid[row+i][makeWallAt].isWall = true;
                document.getElementById(`${row+i}-${makeWallAt}`)!.className = `${WALL_TILE_STYLE} animate-wall`;
                await sleep(10 * SPEEDS.find((s) => s.value === speed)!.value - 5);
            }
        }
    }
    await recursiveDivision({
        grid,
        startTile,
        endTile,
        row,
        col,
        height,
        width: (makeWallAt - col + 1) / 2,
        setIsDisabled,
        speed
    });
    await recursiveDivision({
        grid,
        startTile,
        endTile,
        row,
        col,
        height,
        width: width - (makeWallAt - col + 1) / 2,
        setIsDisabled,
        speed
    });
}