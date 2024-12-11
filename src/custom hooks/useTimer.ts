import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { TaskListContext } from "../contexts/context";
import { useShowNotification } from "./useShowNotification";
import { SessionBlock, TimeType } from "../types/types";
import { Session } from "inspector/promises";

export default function useTimer() {
  const {
    resetTime,
    activeTask,
    sessions,
    setSessions,
    setactiveTask,
    addTask,
  } = useContext(TaskListContext)!;
  const [myActiveTask, setmyActiveTask] = useState(activeTask);
  const [numberofpomos, setnumberofpomos] = useState(
    myActiveTask ? myActiveTask.pomos : 3
  );
  const [pomosRan, setpomosRan] = useState(0);
  const [pomosCompleted, setpomosCompleted] = useState(0); //to check when to tak long break

  const [activeSession, setActiveSession] = useState<SessionBlock>(
    Object.values(sessions).find((session) => session.active) ??
      sessions.POMODORO
  );

  //* get the number of minutes of the active session
  const [countdownMinutes, setcountdownMinutes] = useState(
    activeSession.minutes
  );

  const setCurrentTime = useContext(TaskListContext)!.setCurrentTime;

  //* get current time.
  const currentTime = useContext(TaskListContext)!.currentTime;

  //*boolean to mange timer's runtime
  const [isRunning, setisRunning] = useState<boolean>(false);

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

  // Dispatch action with session name

  const [state, dispatch] = useReducer(reducer, currentTime);
  let interval = useRef<number | undefined>(undefined);

  useEffect(() => {
    Object.entries(sessions).forEach(([key, value]) => {
      if (value.active) {
        setcountdownMinutes(value.minutes);
        setActiveSession(value);
      }
      setmyActiveTask(activeTask);
    });

    if (isRunning && pomosCompleted < numberofpomos) {
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
        setpomosCompleted((p) => p + 1);
        setpomosRan((n) => n + 1);
      }

      setCurrentTime((time) => ({
        ...time,
        minutes: activeSession.minutes,
        seconds: 0,
      }));

      //* check to see which section to move to
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
    console.log("num of pomos", numberofpomos);

    if (pomosRan >= numberofpomos) {
      useShowNotification();
      if (activeTask) {
        addTask({ ...activeTask, completed: true, active: false });
        console.log(activeTask);
      }
    }

    //* move to long break after log breaks
    if (pomosCompleted >= 4) {
      const updatedSessions = {
        ...sessions,
        POMODORO: { ...sessions.POMODORO, active: false },
        SHORTBREAK: { ...sessions.SHORTBREAK, active: false },
        LONGBREAK: { ...sessions.LONGBREAK, active: true },
      };
      setSessions(updatedSessions);
      setpomosCompleted(0);
    }
  }, [pomosCompleted, pomosRan]);

  return { currentTime, isRunning, setisRunning, dispatch };
}
