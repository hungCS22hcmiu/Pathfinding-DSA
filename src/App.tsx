// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { PathfindingProvider } from "./context/PathfindingContext";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <PathfindingProvider>


    <h1 className="text-3xl font-bold underline h-screen w-screen bg-blue-500">
      Hello world!
    </h1>
    </PathfindingProvider>
  );
}

export default App;