import { useCallback, useEffect, useState } from "react";

type TimerOptions = {
  step?: number;
  timeInterval?: number;
  startTime?: number;
  onStart?: () => void;
  onPause?: () => void;
  onTimeUpdate?: (time: number) => void;
} & (
  | {
      reverse: true;
      targetTime: number;
      onComplete?: () => void;
      loop?: boolean;
    }
  | {
      reverse: false;
      startTime: number;
    }
  | {
      reverse?: never;
      targetTime?: never;
    }
);

export function useTimer(props?: TimerOptions) {
  let step = 1;
  let timeInterval = 1;
  let startTime = 0;
  let targetTime = 0;
  let reverse = false;
  let loop = false;
  let onComplete = useCallback(() => {}, []);
  let onStart = useCallback(() => {}, []);
  let onPause = useCallback(() => {}, []);
  let onTimeUpdate = useCallback((time: number) => {
    console.log(time);
  }, []);

  if (props) {
    if (props.step) step = Math.abs(props.step);
    if (props.timeInterval) timeInterval = Math.abs(props.timeInterval);
    if (props.startTime) startTime = Math.abs(props.startTime);
    if (props.onStart) onStart = props.onStart;
    if (props.onPause) onPause = props.onPause;
    if (props.onTimeUpdate) onTimeUpdate = props.onTimeUpdate;

    if (props.reverse) {
      reverse = props.reverse;
      targetTime = Math.abs(props.targetTime);
      if (props.loop) loop = props.loop;
      if (props.onComplete) onComplete = props.onComplete;
    }
  }

  const [time, setTime] = useState(reverse ? targetTime : startTime);

  const [isRunning, setIsRunning] = useState(false);

  const toggle = () => {
    setIsRunning((p) => {
      if (!p) onStart();
      else onPause();
      return !p;
    });
  };

  const reset = () => {
    setIsRunning(false);
    setTime(reverse ? targetTime : startTime);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = reverse ? prevTime - step : prevTime + step;
          props && props.onTimeUpdate && newTime;
          return newTime;
        });
      }, timeInterval * 1000);
    }

    return () => clearInterval(interval);
  }, [step, reverse, timeInterval, onTimeUpdate, isRunning, props]);

  useEffect(() => {
    if (time === (reverse ? -1 : 0)) {
      onComplete && onComplete();

      if (reverse && loop) {
        setTime(targetTime);
        return;
      }

      setIsRunning(false);
    }
  }, [onComplete, loop, reverse, targetTime, time]);

  const HMS = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - hours * 3600) / 60);
    const seconds = time - hours * 3600 - minutes * 60;

    return {
      h: hours,
      m: minutes,
      s: seconds,
    };
  };

  return {
    time: HMS(time),
    isRunning,
    toggle,
    reset,
  };
}
