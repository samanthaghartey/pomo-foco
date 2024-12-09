import React, { useState } from "react";
import useTimer from "../custom hooks/useTimer";

const Timer = () => {
  //* handles the change in display of current time block
  const [active, setActive] = useState<number | null>(0);

  const sections: string[] = ["POMODORO", "SHORT BREAK", "LONG BREAK"];

  const {
    currentTime: currentTimefromuseTimer,
    isRunning,
    setisRunning,
    dispatch,
  } = useTimer();

  const handleClick = (index: number) => {
    setActive(index);
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
                handleClick(index);
                dispatch({ type: section });
              }}
              className={` px-4 py-2 cursor-pointer  rounded-md border-solid border-sky-50 border ${
                active == index ? "bg-white border-white text-blue-700" : ""
              } 
              `}
            >
              {section}
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
          setisRunning((bool) => !bool);
        }}
        className="px-6 py-2  border shadow shadow-white drop-shadow-lg rounded-md text-3xl "
      >
        {isRunning ? "STOP" : "START"}
      </button>
    </div>
  );
};

export default Timer;
