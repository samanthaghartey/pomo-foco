import React, { useContext, useEffect, useState } from "react";
import useTimer from "../custom hooks/useTimer";
import { TaskListContext } from "@/contexts/context";

import { Session, SessionBlock } from "@/types/types";

import { FaRedo } from "react-icons/fa";

const Timer = () => {
  const sessions = useContext(TaskListContext)!.sessions;
  const setSessions = useContext(TaskListContext)!.setSessions;

  const sections = [sessions.POMODORO, sessions.SHORTBREAK, sessions.LONGBREAK];

  const {
    currentTime: currentTimefromuseTimer,
    isRunning,
    setisRunning,
    dispatch,
    resetTimer,
    setisRestarted,
  } = useTimer();

  useEffect(() => {
    console.log(isRunning);
  }, [isRunning]);
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
    <div className="mt-10 w-full  py-8  flex flex-col  card items-center gap-x-1 gap-y-10">
      {/*  // sections */}
      <div className="sections flex   lg:gap-x-10 gap-x-1 justify-between items-center ">
        {sections.map((section, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                handleClick(section);
                dispatch({ type: section.name });
              }}
              className={` px-2 lg:px-5 py-2 text-primary text-nowrap w-fit border-2 cursor-pointer  rounded-md  border-primary  ${
                section.active ? "bg-white border-primary " : " "
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
          <div className="flex flex-col  bg-primary  rounded-box text-white   p-10">
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
          <div className="flex flex-col  bg-primary  rounded-box text-white   p-10">
            <span className="countdown text-5xl">
              <span
                style={
                  {
                    "--value": currentTimefromuseTimer.seconds.toString(),
                  } as React.CSSProperties
                }
              ></span>
            </span>
            seconds
          </div>
        </div>
      </div>

      {/*start btn*/}
      <div className="flex flex-row  gap-6">
        <button
          onClick={() => {
            setisRunning((bool: boolean) => !bool);
            setisRestarted((bool) => !bool);
          }}
          className="px-6 py-2 mx-auto   bg-white shadow text-primary rounded-md text-3xl "
        >
          {isRunning ? "PAUSE" : "START"}
        </button>

        <button className=" ">
          <FaRedo
            className="text-primary px-2 py-1 ml-auto place-items-end border-2   rounded-md text-4xl"
            onClick={() => resetTimer()}
          />
        </button>
      </div>
    </div>
  );
};

export default Timer;
