import { createContext, useState } from "react";
import { SpeedType } from "../utils/types";

// Define the context interface
interface SpeedContextInterface {
  speed: SpeedType;
  setSpeed: (speed: SpeedType) => void;
}

// Create the context with undefined as default
// eslint-disable-next-line react-refresh/only-export-components
export const SpeedContext = createContext<SpeedContextInterface | undefined>(undefined);

// Create the provider component
export const SpeedProvider = ({ children }: { children: React.ReactNode }) => {
  const [speed, setSpeed] = useState<SpeedType>(0.5);

  return (
    <SpeedContext.Provider value={{ speed, setSpeed }}>
      {children}
    </SpeedContext.Provider>
  );
};