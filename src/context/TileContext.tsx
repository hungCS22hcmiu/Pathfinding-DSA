import { END_TILE_CONFIGURATION, START_TILE_CONFIGURATION } from "../utils/constants";
import { TileType } from "../utils/types";
import { createContext, ReactNode, useState } from "react";

// Define the context interface
interface TileContextInterface {
  startTile: TileType;
  setStartTile: (startTile: TileType) => void;
  endTile: TileType;
  setEndTile: (endTile: TileType) => void;
}


// Create the context with undefined as default
// eslint-disable-next-line react-refresh/only-export-components
export const TileContext = createContext<TileContextInterface | undefined>(
  undefined
);


// Create the provider component
export const TileProvider = ({ children }: { children: ReactNode }) => {
  const [startTile, setStartTile] = useState<TileType>(
    START_TILE_CONFIGURATION
  );

  const [endTile, setEndTile] = useState<TileType>(
    END_TILE_CONFIGURATION
  );


  return (
    <TileContext.Provider
      value={{
        startTile,
        setStartTile,
        endTile,
        setEndTile,
      }}
    >
      {children}
    </TileContext.Provider>
  );
};