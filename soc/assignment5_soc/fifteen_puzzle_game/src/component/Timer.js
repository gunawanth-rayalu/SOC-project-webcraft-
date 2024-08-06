import { useEffect, useState } from "react"; // Import useState

export default function Timer({ time, setTime, timerActive }) {
  // Use useState to manage the time
  const [currentTime, setCurrentTime] = useState(time); 

  useEffect(() => {
    let interval = null;
    if (timerActive) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timerActive]);

  return <p>Time: {currentTime}s</p>;
}