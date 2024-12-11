import React, { useContext } from "react";
import Task from "./Task";
import { TaskListContext } from "../contexts/context";
import { v4 as uuidv4 } from "uuid";
import { FaPlusCircle } from "react-icons/fa";
import AddTaskDialog from "@/custom hooks/useShowDialog";
import { TaskType } from "@/types/types";

const TaskList: React.FC = () => {
  const taskList = useContext(TaskListContext)!.taskList.filter(
    (task) => task.completed == false
  );
  // get only uncompleted tasks

  taskList.sort((a, b) => Number(b.active) - Number(a.active));
  const setVisible = useContext(TaskListContext)!.setvisibilityOfDialog;
  const activeTask = useContext(TaskListContext)!.activeTask;

  const visibilityOfDialog = useContext(TaskListContext)!.visibilityOfDialog;

  return (
    <div>
      <button
        className="text-white  px-5 py-2 bg-primary rounded-md w-full flex items-center justify-center gap-4"
        onClick={() => {
          setVisible((v) => !v);
        }}
      >
        <FaPlusCircle className="text-white" /> Add New
      </button>

      {visibilityOfDialog && (
        <AddTaskDialog task={null} visiblityOfTask={null} />
      )}

      <div className="task-list flex flex-col items-center gap-y-10">
        <h1 className="text-blue-700 text-xl">Tasks</h1>

        {taskList.map((task) => (
          <Task task={task} key={uuidv4()} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
