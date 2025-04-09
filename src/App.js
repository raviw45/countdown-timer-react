import { useRef, useState } from "react";
import "./styles.css";

export default function App() {
  const [time, setTime] = useState({
    hour: 0,
    minute: 0,
    second: 0,
  });
  const intervalRef = useRef(null);
  const [isStarted, setIsStarted] = useState(false);
  const [hasStartedOnce, setHasStartedOnce] = useState(false);
  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setTime((prev) => ({
      ...prev,
      [name]: Number(value.slice(0, 2)),
    }));
  };

  const startTimer = () => {
    if (intervalRef.current) return;
    setIsStarted(true);
    setHasStartedOnce(true);
    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        let { hour, minute, second } = prev;

        if (hour === "0" && minute === "0" && second === "0") {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsStarted(false);
          return prev;
        }

        if (second === 0) {
          if (minute === 0) {
            if (hour > 0) {
              hour--;
              minute = 59;
              second = 59;
            }
          } else {
            minute--;
            second = 59;
          }
        } else {
          second--;
        }
        return { hour, minute, second };
      });
    }, 100);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsStarted(false);
  };

  const handleReset = () => {
    stopTimer();
    setTime({ hour: 0, minute: 0, second: 0 });
    setHasStartedOnce(false);
  };
  const isTimeNonZero = time.hour > 0 || time.minute > 0 || time.second > 0;
  return (
    <div className="App">
      <h1>Countdown Timer</h1>
      <div className="input-container">
        <input
          className="input"
          type="number"
          name="hour"
          onChange={handleTimeChange}
          value={time.hour}
        />
        <input
          className="input"
          name="minute"
          type="number"
          onChange={handleTimeChange}
          value={time.minute}
        />
        <input
          className="input"
          name="second"
          type="number"
          onChange={handleTimeChange}
          value={time.second}
        />
      </div>
      <div className="btn-container">
        {!isStarted && (
          <button
            disabled={!isTimeNonZero}
            onClick={startTimer}
            className="btn start"
          >
            {hasStartedOnce ? "continue" : "start"}
          </button>
        )}

        {isStarted && (
          <button onClick={stopTimer} className="btn stop">
            pause
          </button>
        )}

        <button onClick={handleReset} className="btn reset">
          reset
        </button>
      </div>
    </div>
  );
}
