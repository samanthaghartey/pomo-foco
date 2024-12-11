import React, { useContext, useEffect, useState } from "react";
import useTimer from "../custom hooks/useTimer";
import { TaskListContext } from "@/contexts/context";

import { Session, SessionBlock } from "@/types/types";

const Timer = () => {
  const sessions = useContext(TaskListContext)!.sessions;
  const setSessions = useContext(TaskListContext)!.setSessions;

  const sections = [sessions.POMODORO, sessions.SHORTBREAK, sessions.LONGBREAK];

  const {
    currentTime: currentTimefromuseTimer,
    isRunning,
    setisRunning,
    dispatch,
  } = useTimer();

  const handleClick = (sectionPressed: SessionBlock) => {
    //* loop through Sessions object and make the clicked one active
    const updatedSessions = Object.fromEntries(
      Object.entries(sessions).map(([key, value]) => [
        key,
        { ...value, active: value == sectionPressed ? true : false },
      ])
    ) as Session;

    setSessions(updatedSessions);
  };

  return (
    <div className="mt-10 lg:px-12 py-11 sm:px-5 flex flex-col  card items-center gap-x-4 gap-y-10">
      {/*  // sections */}
      <div className="sections flex  gap-x-10 items-center ">
        {sections.map((section, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                handleClick(section);
                dispatch({ type: section.name });
              }}
              className={` px-4 py-2 cursor-pointer  rounded-md border-solid border-sky-50 border ${
                section.active ? "bg-white border-white text-blue-700" : ""
              } 
              `}
            >
              {section.name}
            </div>
          );
        })}
      </div>

      <div className="timer">
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
          {/* actual timer */}

          {/* //minutes */}
          <div className="flex flex-col  bg-blue-500 rounded-box text-neutral-content  p-16">
            <span className="countdown text-5xl">
              <span
                style={
                  {
                    "--value": currentTimefromuseTimer.minutes.toString(),
                  } as React.CSSProperties
                }
              ></span>
            </span>
            min
          </div>

          {/* //secs */}
          <div className="flex flex-col  bg-blue-500 rounded-box text-neutral-content  p-16">
            <span className=" text-5xl">
              {/*  <span
                style={
                  {
                    "--value": currentTimefromuseTimer.seconds.toString(),
                  } as React.CSSProperties
                }
              ></span> */}
              <span>{currentTimefromuseTimer.seconds}</span>
            </span>
            secs
          </div>
        </div>
      </div>

      {/*start btn*/}
      <button
        onClick={() => {
          setisRunning((bool: boolean) => !bool);
        }}
        className="px-6 py-2  border shadow shadow-white drop-shadow-lg rounded-md text-3xl "
      >
        {isRunning ? "STOP" : "START"}
      </button>
    </div>
  );
};

export default Timer;
