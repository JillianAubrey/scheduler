import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]); 

  const transition = (mode, replace) => {
    setHistory(prev => {
      if (replace) {
        return [mode, ...prev.slice(1)];
      }
      return [mode, ...prev];
    })
  };

  const back = () => {
    if (history.length > 1) {
      setHistory(prev => prev.slice(1))
    }
  };

  return { mode: history[0], transition, back };
};