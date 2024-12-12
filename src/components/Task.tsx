import React, { useContext, useState } from "react";
import { FaEllipsis } from "react-icons/fa6";
import AddTaskDialog from "../custom hooks/useShowDialog";
import { TaskType, TimeBlock } from "@/types/types";
import { TaskListContext } from "@/contexts/context";

type TaskProp = {
  task: TaskType;
};

const Task: React.FC<TaskProp> = ({ task }) => {
  const { name, note, hours, minutes, pomos, pomosCompleted } = task;

  const [timeLeft, setTimeLeft] = useState(
    pomos * TimeBlock.POMODORO - pomosCompleted * TimeBlock.POMODORO
  );

  const [minutesLeft, setMinutesLeft] = useState(
    timeLeft > 60 ? timeLeft % 60 : timeLeft
  );
  const [hoursLeft, setHoursLeft] = useState((timeLeft - minutesLeft) / 60);

  const taskList = useContext(TaskListContext)!.taskList.filter(
    (task) => task.completed == false
  );

  const [visible, setVisible] = useState(true);
  const addTask = useContext(TaskListContext)!.addTask;
  const setActiveTask = useContext(TaskListContext)!.setactiveTask;

  const setTaskAsActive = (task: TaskType) => {
    taskList.map((item) => {
      item.id == task.id
        ? addTask({ ...item, active: !item.active })
        : addTask({ ...item, active: false });
    });
    setActiveTask(task);
  };

  return visible ? (
    <div
      onDoubleClick={() => setTaskAsActive(task)}
      className={`rounded-lg transition-color duration-500   ${
        task.active ? "bg-green-500" : "bg-primary"
      } text-white px-4 py-5 flex justify-between w-full h-fit`}
    >
      <div className="text flex-wrap flex flex-col ">
        <div className="text-and-check flex-row flex gap-2 items-center">
          <input
            type="checkbox"
            className="checkbox checkbox-xs"
            checked={task.completed}
            onChange={() => {
              addTask({ ...task, completed: !task.completed, active: false });
            }}
          />
          <h1 className="task-name text-xl font-semibold">{name}</h1>
        </div>
        <div className="flex  flex-wrap w-1/2">
          <p className=" text-xs  break-words  ">{note}</p>
        </div>{" "}
      </div>

      <div className="time-left flex-y-1 flex flex-col items-end ">
        <FaEllipsis
          onClick={() => {
            setVisible((v) => !v);
          }}
        />
        <div className="time-remianing text-xs">
          {`${
            hoursLeft >= 1 ? hoursLeft + "hour" : ""
          } ${minutesLeft}mins left`}
        </div>
        <div className="tomatoes flex gap-x-4">
          <div className="tomato-complete w-6 h-6 bg-blue-500 rounded-full">
            {" "}
          </div>
          <div className="tomato-complete w-6 h-6 bg-blue-500 rounded-full">
            {" "}
          </div>
          <div className="tomato-complete w-6 h-6 bg-blue-500 rounded-full">
            {" "}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <AddTaskDialog task={task} visiblityOfTask={visible} />
  );
};

export default Task;
