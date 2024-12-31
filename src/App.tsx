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
import Signup from "./components/Signup";

const App: React.FC = () => {
  return (
    <TaskListProvider>
      <div className="bg-mybackground lg:px-96  w-full mx-auto py-7 flex items-center flex-col overflow-x-hidden ">
        <Navbar />

        <Timer />
      </div>

      <div className=" min-h-screen  w-full mx-auto lg:px-96 py-7 flex items-center flex-col bg-white overflow-x-hidden ">
        <TaskList />

        <CompletedTaskList />
      </div>
    </TaskListProvider>
  );
};

export default App;
