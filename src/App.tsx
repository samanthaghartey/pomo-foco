import Navbar from "./components/Navbar";
import Timer from "./components/Timer";
import TaskList from "./components/TaskList";
import CompletedTaskList from "./components/CompletedTaskList";
import TextContent from "./components/TextContent";

import TaskListProvider from "./components/TaskListProvider";
import AddTaskButton from "./components/addTaskButton";
import React, { FC, useContext } from "react";
import { TaskListContext } from "./contexts/context";
import AddTaskDialog from "./custom hooks/useShowDialog";
import { FaPlusCircle } from "react-icons/fa";

const App: React.FC = () => {
  return (
    <TaskListProvider>
      <div className="bg-mybackground lg:px-96 md:px-16 sm:px-4 py-7 flex items-center flex-col ">
        <Navbar />

        <Timer />
      </div>

      <div className=" min-h-screen lg:px-96 pt-7 flex items-center flex-col bg-white sm:px-11">
        <TaskList />

        <CompletedTaskList />

        <TextContent />
      </div>
    </TaskListProvider>
  );
};

export default App;
