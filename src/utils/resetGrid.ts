import { GridType, TileType } from './types';
import { MAX_COLS, MAX_ROWS, START_TILE_CONFIGURATION, TILE_STYLE } from "./constants";
///import { PiImageSquareLight } from 'react-icons/pi';
import { isEqual } from './helper';

export const resetGrid = ({
    grid, 
    startTile = START_TILE_CONFIGURATION,
    endTile = START_TILE_CONFIGURATION,
    }:{
        grid: GridType;
        startTile?: TileType;
        endTile?: TileType;
    })=>{
        for (let row = 0; row < MAX_ROWS; row++){
            for (let col = 0; row < MAX_COLS; col++){
                const tile = grid[row][col];
                tile.distance = Infinity;
                tile.isPath = false;
                tile.isTraversed = false;
                tile.parent = null;
                tile.isWall = false;

                if (!isEqual(startTile, tile) && !isEqual(endTile, tile)){
                    const tileElement = document.getElementById(`tile-${row}-${col}`);
                    if (tileElement) {
                        tileElement.className = TILE_STYLE;
                    }
                    if (tile.row === MAX_ROWS -1) {
                        tileElement?.classList.add("border-b");
                    }
                    if (tile.col === 0) {
                        tileElement?.classList.add("border-l");
                    }
                }
            }
        }
    }