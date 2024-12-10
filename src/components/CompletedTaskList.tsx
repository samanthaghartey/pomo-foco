import React, { useContext, useEffect } from "react";
import CompletedTask from "./CompletedTask";
import { TaskListContext } from "@/contexts/context";
import { TaskType } from "@/types/types";

const CompletedTaskList = () => {
  const completedtaskList = useContext(TaskListContext)!.taskList.filter(
    (task) => task.completed == true
  );

  return (
    <div className="bg-blue-700 px-4 py-4 mt-10  items-center w-5/6 rounded-md ">
      <h1 className="mb-4">Completed</h1>

      <div className="list flex  justify-center items-center flex-col gap-8">
        {completedtaskList.map((task) => (
          <CompletedTask task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
};

export default CompletedTaskList;
