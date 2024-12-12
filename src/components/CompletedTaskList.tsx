import React, { useContext, useEffect } from "react";
import CompletedTask from "./CompletedTask";
import { TaskListContext } from "@/contexts/context";
import { TaskType } from "@/types/types";

const CompletedTaskList = () => {
  const completedtaskList = useContext(TaskListContext)!.taskList.filter(
    (task) => task.completed == true
  );

  return (
    <div className="bg-primary px-4 py-4 mt-10  items-center w-5/6 rounded-md ">
      <h1 className="mb-4 font-semibold text-white">Completed Tasks</h1>

      <div className="list flex transition-all   justify-center items-center flex-col gap-8">
        {completedtaskList.length == 0 ? (
          <div className="text-gray-200">No tasks completed</div>
        ) : (
          completedtaskList.map((task) => (
            <CompletedTask task={task} key={task.id} />
          ))
        )}
      </div>
    </div>
  );
};

export default CompletedTaskList;
