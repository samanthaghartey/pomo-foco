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
    <div className="transition-all  flex flex-col justify-center items-center gap-y-10 w-5/6 o">
      <div className="task-list flex flex-col justify-center items-center gap-y-8 w-full">
        <h1 className="text-primary text-3xl font-semibold">Tasks</h1>

        {taskList.length == 0 ? (
          <div className=" rounded-md text-center p-10 bg-primary-light text-white w-full">
            {" "}
            No tasks yet
          </div>
        ) : (
          taskList.map((task) => <Task task={task} key={uuidv4()} />)
        )}
      </div>

      <button
        className="text-white  px-5 py-4 bg-primary rounded-md flex items-center justify-center gap-4"
        onClick={() => {
          setVisible((v) => !v);
        }}
      >
        <FaPlusCircle className="text-white" /> Add New
      </button>
      {visibilityOfDialog && (
        <AddTaskDialog task={null} visiblityOfTask={null} />
      )}
    </div>
  );
};

export default TaskList;
