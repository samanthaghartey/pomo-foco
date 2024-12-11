import React, { useContext, useState } from "react";
import { FaEllipsis } from "react-icons/fa6";
import AddTaskDialog from "../custom hooks/useShowDialog";
import { TaskType } from "@/types/types";
import { TaskListContext } from "@/contexts/context";

type TaskProp = {
  task: TaskType;
};

const Task: React.FC<TaskProp> = ({ task }) => {
  const { name, note, hours, minutes } = task;

  const taskList = useContext(TaskListContext)!.taskList.filter(
    (task) => task.completed == false
  );

  const [visible, setVisible] = useState(true);
  const addTask = useContext(TaskListContext)!.addTask;

  const setTaskAsActive = (task: TaskType) => {
    taskList.map((item) => {
      item.id == task.id
        ? addTask({ ...item, active: true })
        : addTask({ ...item, active: false });
    });
  };

  return visible ? (
    <div
      onDoubleClick={() => setTaskAsActive(task)}
      className={`rounded-lg  ${
        task.active ? "bg-green-500" : "bg-primary"
      } text-white px-10 py-5 flex justify-between w-5/6  sm:px-4 sm:w-5/6 `}
    >
      <div className="text  sm:w-full">
        <input
          type="checkbox"
          className="checkbox"
          checked={task.completed}
          onChange={() => {
            addTask({ ...task, completed: !task.completed, active: false });
          }}
        />
        <h1 className="task-name text-xl font-semibold">{name}</h1>
        <p className="task-notes text-xs">{note}</p>
      </div>

      <div className="time-left flex-y-1 flex flex-col justify-between items-end sm:items-center">
        <FaEllipsis
          onClick={() => {
            setVisible((v) => !v);
          }}
        />
        <div className="time-remianing text-xs">
          {`${hours > 1 ? hours + "hour" : ""} ${minutes}mins left`}
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
