import { useContext } from "react";
import CompletedTask from "./CompletedTask";
import { TaskListContext } from "@/contexts/context";

const CompletedTaskList = () => {
  const completedtaskList = useContext(TaskListContext)!.taskList.filter(
    (task) => task.completed == true
  );
  const deleteTask = useContext(TaskListContext)!.deleteTask;

  const deleteTaskList = () => {
    completedtaskList.map((task) => deleteTask(task.id));
  };
  return (
    <div className="bg-primary-light px-4 py-4 mt-10  items-center w-5/6 rounded-md ">
      <h1 className="mb-4 font-semibold text-white">Completed Tasks</h1>

      <div className="list flex transition-all   justify-center items-center flex-col gap-8">
        {completedtaskList.length == 0 ? (
          <div className="text-white">No tasks completed</div>
        ) : (
          completedtaskList.map((task) => (
            <CompletedTask task={task} key={task.id} />
          ))
        )}

        <button
          className="bg-primary px-10 py-2 text-white rounded-md"
          onClick={deleteTaskList}
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default CompletedTaskList;
