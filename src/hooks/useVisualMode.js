import { useState } from "react";

/**
 * Custom hook to transition between visual modes.
 * @param {any} initial Initial visual mode
 * @return {Object} useVisualMode object
 * @property {String} mode - current mode
 * @property {function} transition - transition to a new mode
 * @property {function} back - transition to previous mode
*/
export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]); 

  /**
   * Transition to new visual mode. New mode is added to the begginning of history array
   * @param {String} mode Mode to transition to
   * @param {Boolean} replace If true, previous mode is removed from history
   * @return {none}
  */
  const transition = (mode, replace) => {
    setHistory(prev => {
      if (replace) {
        return [mode, ...prev.slice(1)];
      }
      return [mode, ...prev]; 
    })
  };

  /**
   * Transition to previous mode, by removing first (most recent) mode from history array
   * @param {none}
   * @return {none}
  */
  const back = () => {
    if (history.length > 1) {
      setHistory(prev => prev.slice(1));
    }
  };

  return { mode: history[0], transition, back };
};