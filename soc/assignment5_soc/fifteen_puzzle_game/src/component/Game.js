import { useEffect, useState } from "react";
import shuffleArray from "../utils/shuffleFunction";
import Puzzle from "./Puzzle";
import Timer from "./Timer";

export default function Game() {
  const [shuffledArray, setShuffledArray] = useState(shuffleArray());
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [win, setWin] = useState(false);

  useEffect(() => {
    // Start timer on the first move
    if (moves === 1) setTimerActive(true);

    // Check for win condition
    let won = true;
    for (let i = 0; i < shuffledArray.length - 1; i++) {
      const value = shuffledArray[i];
      if (i === value - 1) continue;
      else {
        won = false;
        break;
      }
    }
    if (won) {
      setWin(true);
      setTimerActive(false);
    }
  }, [moves, shuffledArray]);

  const newGame = () => {
    setMoves(0);
    setTimerActive(false);
    setTime(0);
    setShuffledArray(shuffleArray());
    setWin(false);
  };

  // Drag and drop functionality
  const dragStart = (e) => e.dataTransfer.setData("tile", e.target.id);
  const dragOver = (e) => e.preventDefault();

  const dropped = (e) => {
    e.preventDefault();
    const tileId = e.dataTransfer.getData("tile");
    const oldIndex = Number(document.getElementById(tileId).parentElement.id.slice(6)) - 1;
    const newIndex = Number(e.target.id.slice(6)) - 1;

    // Check if the move is valid (adjacent or 4 spaces away)
    if (!(Math.abs(oldIndex - newIndex) === 4 || Math.abs(oldIndex - newIndex) === 1)) return;

    // Update the array with the new tile positions
    setShuffledArray((prevArray) => {
      const [i, j] = [Math.min(oldIndex, newIndex), Math.max(oldIndex, newIndex)];
      return [
        ...prevArray.slice(0, i),
        prevArray[j],
        ...prevArray.slice(i + 1, j),
        prevArray[i],
        ...prevArray.slice(j + 1),
      ];
    });
    setMoves(moves + 1);
  };

  return (
    <div className="h-screen flex text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="mx-auto mt-8 p-4 rounded-lg bg-black shadow-md">
        {win && (
          <div className="rounded-md border-l-4 border-yellow-400 bg-yellow-100 p-2 mb-2">
            <div className="flex items-center justify-center space-x-4">
              <p className="font-medium text-yellow-600">
                HURRAY!! You have won the game
              </p>
            </div>
          </div>
        )}
        <h1 className="text-3xl text-yellow-400 font-bold text-center mb-4">
          React Project
        </h1>
        <h3 className="text-xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% mb-4">
          15 Puzzle Game
        </h3>
        <div className="flex justify-between px-6 mt-2 mb-4">
          <p className="text-gray-300">Moves: {moves}</p>
          <Timer time={time} timerActive={timerActive} setTime={setTime} />
        </div>
        <Puzzle
          shuffledArray={shuffledArray}
          dragStart={dragStart}
          dragOver={dragOver}
          dropped={dropped}
        />
        <div className="px-6 mt-4">
          <button
            onClick={newGame}
            className="text-white font-bold block bg-black p-2 rounded w-full h-full bg-gradient-to-r from-red-500 from-10% via-orange-500 via-30% to-yellow-500 to-90%"
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}