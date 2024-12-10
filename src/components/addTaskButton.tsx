import { TaskListContext } from "@/contexts/context";
import React, { useContext } from "react";
import { FaPlusCircle } from "react-icons/fa";

const AddTaskButton = (
  click: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const setVisible = useContext(TaskListContext)!.setvisibilityOfDialog;

  return (
    <div>
      <button
        className="text-white  px-5 py-2 bg-primary rounded-md w-full flex items-center justify-center gap-4"
        onClick={() => click}
      >
        <FaPlusCircle className="text-white" /> Add New
      </button>
    </div>
  );
};

export default AddTaskButton;
