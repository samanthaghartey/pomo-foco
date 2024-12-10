import { TaskListContext } from "@/contexts/context";
import { TaskType } from "@/types/types";
import React, { useContext } from "react";

type CompletedTaskListProps = {
  task: TaskType;
};

const CompletedTask: React.FC<CompletedTaskListProps> = (props) => {
  const { task } = props;
  const addTask = useContext(TaskListContext)!.addTask;
  return (
    <>
      <div className="rounded-md bg-white text-blue-700  px-4 py-4  flex justify-between  w-5/6 ">
        <div className="text ">
          <h1 className="task-name  ">{task.name}</h1>
        </div>

        <div className="check">
          <input
            type="checkbox"
            className="checkbox"
            checked={task.completed}
            onChange={() => {
              addTask({ ...task, completed: !task.completed });
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CompletedTask;
