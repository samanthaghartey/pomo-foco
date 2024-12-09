import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { TaskListContext } from "../contexts/context";
import { useShowNotification } from "./useShowNotification";
import { TimeBlock, TimeType } from "../types/types";

export default function useTimer() {
  // @params takes in time object
  const resetTime = useContext(TaskListContext)!.resetTime;

  //* get current time.
  const currentTime = useContext(TaskListContext)!.currentTime;

  const [isRunning, setisRunning] = useState<boolean>(false);

  //* REDUCER
  const reducer = (state: TimeType, action: any) => {
    switch (action.type) {
      case "POMODORO":
        resetTime({ minutes: TimeBlock.POMODORO, seconds: 0 });
        setisRunning(false);
        return { minutes: TimeBlock.POMODORO, seconds: 0 };
      case "SHORT BREAK":
        resetTime({ minutes: TimeBlock.SHORTBREAK, seconds: 0 });
        setisRunning(false);

        return { minutes: TimeBlock.SHORTBREAK, seconds: 0 };
      case "LONG BREAK":
        resetTime({ minutes: TimeBlock.LONGBREAK, seconds: 0 });
        setisRunning(false);

        return { minutes: TimeBlock.LONGBREAK, seconds: 0 };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, currentTime);

  let interval = useRef<number | undefined>(undefined);

  const setCurrentTime = useContext(TaskListContext)!.setCurrentTime;

  useEffect(() => {
    if (isRunning) {
      interval.current = setInterval(() => {
        setCurrentTime((time) => ({ ...time, seconds: time.seconds + 1 }));
      }, 50);
    } else {
      clearInterval(interval.current);
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [isRunning]);

  //*UPDATE Time

  useEffect(() => {
    if (currentTime.seconds == 60) {
      setCurrentTime((time) => ({ ...time, minutes: time.minutes - 1 }));
      setCurrentTime((time) => ({ ...time, seconds: 0 }));
    }
    if (currentTime.minutes == 24) {
      useShowNotification();
      setisRunning(false);
      setCurrentTime((time) => ({ ...time, minutes: 25 }));
      setCurrentTime((time) => ({ ...time, seconds: 0 }));
    }
  }, [currentTime.seconds]);

  return { currentTime, isRunning, setisRunning, dispatch };
}
