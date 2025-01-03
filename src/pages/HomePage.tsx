import CompletedTaskList from "@/components/CompletedTaskList";

import TaskList from "@/components/TaskList";
import Timer from "@/components/Timer";

const HomePage = () => {
  return (
    <>
      <div className="bg-mybackground  flex items-center flex-col overflow-x-hidden ">
        <Timer />
      </div>

      <div className=" min-h-screen  w-full mx-auto lg:px-96 md:px-32 py-7 flex items-center flex-col bg-white overflow-x-hidden ">
        <TaskList />

        <CompletedTaskList />
      </div>
    </>
  );
};

export default HomePage;
