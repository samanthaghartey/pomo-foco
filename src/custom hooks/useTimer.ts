import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { TaskListContext } from "../contexts/context";
import { useShowNotification } from "./useShowNotification";
import { SessionBlock, TimeType } from "../types/types";
import { Session } from "inspector/promises";
import { log } from "console";

export default function useTimer() {
  const {
    resetTime,
    activeTask,
    sessions,
    setSessions,
    setactiveTask,
    addTask,
    currentTime,
    setCurrentTime,
  } = useContext(TaskListContext)!;
  const [numberofpomos, setnumberofpomos] = useState(
    activeTask ? activeTask.pomos : 40
  );
  const [pomosCompleted, setpomosCompleted] = useState(
    activeTask ? activeTask.pomosCompleted : 0
  );

  //*to check when to take long break
  const [takeBreak, setTaakeBreak] = useState(0);

  const [activeSession, setActiveSession] = useState<SessionBlock>(
    Object.values(sessions).find((session) => session.active) ??
      sessions.POMODORO
  );

  //* get the number of minutes of the active session
  const [countdownMinutes, setcountdownMinutes] = useState(
    activeSession.minutes
  );

  //*boolean to mange timer's runtime
  const [isRunning, setisRunning] = useState<boolean>(false);
  const [isRestarted, setisRestarted] = useState<boolean>(false);

  //* REDUCER
  const reducer = (state: TimeType, action: any) => {
    setisRunning(false);
    const targetSession = Object.values(sessions).find(
      (session) => session.name === action
    );

    if (targetSession) {
      resetTime({ minutes: targetSession.minutes, seconds: 0 });
      setActiveSession(targetSession);
      return { minutes: targetSession.minutes, seconds: 0 };
    }

    return state;
  };
  const [state, dispatch] = useReducer(reducer, currentTime);

  let interval = useRef<number | undefined>(undefined);
  useEffect(() => {
    Object.entries(sessions).forEach(([key, value]) => {
      if (value.active) {
        setcountdownMinutes(value.minutes);
        setActiveSession(value);
      }
    });

    if (isRunning == true) {
      interval.current = setInterval(() => {
        setCurrentTime((time) => ({ ...time, seconds: time.seconds + 1 }));
      }, 1000);
    } else {
      clearInterval(interval.current);
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [isRunning]);

  //*UPDATE Time

  const updateTime = () => {
    if (currentTime.seconds == 60) {
      setCurrentTime((time) => ({
        ...time,
        minutes: time.minutes - 1,
        seconds: 0,
      }));
    }
    if (currentTime.minutes == 0) {
      setisRunning(false);

      if (activeSession.name == "POMODORO") {
        if (activeTask) {
          setpomosCompleted((n) => n + 1);
          addTask({
            ...activeTask,

            pomosCompleted: activeTask.pomosCompleted + 1,
          });
        }

        setTaakeBreak((n) => n + 1);
      }

      setCurrentTime((time) => ({
        ...time,
        minutes: activeSession.minutes,
        seconds: 0,
      }));

      //* check to see which section to move to
      if (!isRestarted) {
        if (activeSession.name == "POMODORO") {
          const updatedSessions = {
            ...sessions,
            POMODORO: { ...sessions.POMODORO, active: false },
            SHORTBREAK: { ...sessions.SHORTBREAK, active: true },
            LONGBREAK: { ...sessions.LONGBREAK, active: false },
          };
          setSessions(updatedSessions);
        } else if (
          activeSession.name == "SHORTBREAK" ||
          activeSession.name == "LONGBREAK"
        ) {
          const updatedSessions = {
            ...sessions,
            POMODORO: { ...sessions.POMODORO, active: true },
            SHORTBREAK: { ...sessions.SHORTBREAK, active: false },
            LONGBREAK: { ...sessions.LONGBREAK, active: false },
          };
          setSessions(updatedSessions);
        }
      }
    }
  };

  const resetTimer = () => {
    setCurrentTime({ minutes: activeSession.minutes, seconds: 0 });
    clearInterval(interval.current);
    setisRunning(false);
    setisRestarted(true);
  };

  useEffect(() => {
    updateTime();
  }, [currentTime.seconds]);

  useEffect(() => {
    //* change the timer interface when the countdown ends
    Object.entries(sessions).forEach(([key, value]) => {
      if (value.active == true) {
        setcountdownMinutes(value.minutes);
        setActiveSession(value);
        resetTime({ minutes: value.minutes, seconds: 0 });
      }
    });
  }, [sessions]);

  useEffect(() => {
    console.log(activeTask);

    //* check if the active task has completed its allocated pomos
    if (pomosCompleted >= numberofpomos) {
      useShowNotification();
      if (activeTask) {
        addTask({
          ...activeTask,
          completed: true,
          active: false,
          pomosCompleted: 0,
        });
        setpomosCompleted(activeTask.pomosCompleted);
      }
    }

    //* move to long break after log breaks
    if (takeBreak % 4 == 0) {
      const updatedSessions = {
        ...sessions,
        POMODORO: { ...sessions.POMODORO, active: false },
        SHORTBREAK: { ...sessions.SHORTBREAK, active: false },
        LONGBREAK: { ...sessions.LONGBREAK, active: true },
      };
      setSessions(updatedSessions);
    }
  }, [pomosCompleted, takeBreak]);

  useEffect(() => {
    //* get the pomos of the actice task when it chnages
    if (activeTask) {
      setnumberofpomos(activeTask.pomos);
      setpomosCompleted(activeTask.pomosCompleted);
    }
  }, [activeTask]);

  return {
    currentTime,
    isRunning,
    setisRunning,
    dispatch,
    resetTimer,
    setisRestarted,
  };
}
