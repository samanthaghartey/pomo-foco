import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

import { Button } from "../components/ui/button";
import { TaskType, TimeBlock } from "@/types/types";

import { TaskListContext } from "@/contexts/context";
import { FaTrash } from "react-icons/fa6";

type DialogProps = {
  task: TaskType | null;
  visiblityOfTask: boolean | null;
};
const AddTaskDialog: React.FC<DialogProps> = (props) => {
  if (!props) {
    return null; // Handle the case where no props are passed
  }
  const { task, visiblityOfTask } = props;
  const { visibilityOfDialog, setvisibilityOfDialog, addTask, deleteTask } =
    useContext(TaskListContext)!;

  //*adding task

  const [taskName, setTaskName] = task
    ? useState<string>(task.name)
    : useState<string>("");
  const [taskNote, setTaskNote] = task
    ? useState<string>(task.note)
    : useState<string>("");
  const [pomoNumber, setpomoNumber] = task
    ? useState<number>(task.pomos)
    : useState<number>(0);

  const [timeAllocated, setTimeAllocated] = task
    ? useState({
        minutes: task.minutes,
        hours: task.hours,
      })
    : useState({
        minutes: 0,
        hours: 0,
      });

  const calculateAllocatedTime = () => {
    //* Each pomo set has 25 minutes working period
    const totalTime = TimeBlock.POMODORO * pomoNumber;

    const minutes = totalTime > 60 ? totalTime % 60 : totalTime;
    const hours = (totalTime - minutes) / 60;

    setTimeAllocated({ minutes: minutes, hours: hours });
  };

  /* 
TODO: Check for empty name field
  */
  const saveTask = () => {
    const newTask: TaskType = {
      name: taskName,
      pomos: pomoNumber || 0,
      note: taskNote,
      hours: timeAllocated.hours || 0,
      minutes: timeAllocated.minutes || 0,
      id: task ? task.id : uuidv4(),
      completed: false,
      active: task ? task.active : false,
      pomosCompleted: task ? task.pomosCompleted : 0,
    };

    addTask(newTask);
    setvisibilityOfDialog(false);
    setTaskName("");
  };

  useEffect(() => {
    calculateAllocatedTime();
  }, [pomoNumber]);

  return (
    <div
      className={` mb-5 visibility: ${
        visibilityOfDialog || !visiblityOfTask ? "visible" : "hidden"
      }  `}
    >
      <div className={` px-2 `}>
        <Card className=" bg-tryColor w-full mb-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle> {task ? "Edit" : "Add New"} Task</CardTitle>
            {task && (
              <FaTrash
                onClick={() => {
                  deleteTask(task.id);
                }}
              />
            )}
            {/*  <CardDescription>Create a New Task</CardDescription> */}
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Name of your task"
                    value={taskName}
                    onChange={(e) => {
                      setTaskName(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Notes</Label>
                  <Input
                    id="name"
                    placeholder="Any notes...."
                    value={taskNote}
                    onChange={(e) => {
                      setTaskNote(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-row justify-between items-center">
                  <div className="number-of-pomos  w-fit">
                    <Label className="" htmlFor="pomos">
                      No. pomo blocks
                    </Label>
                    <Input
                      className="w-1/4 px-1"
                      id="pomos"
                      type="number"
                      placeholder="How many pomos?"
                      value={pomoNumber}
                      onChange={(e) => {
                        setpomoNumber(e.target.valueAsNumber);
                      }}
                    />
                  </div>

                  <div className=" flex flex-col ">
                    <Label htmlFor="pomos">Total Time </Label>
                    <div
                      className="time 
          flex h-9 w-full text-sm rounded-md border border-input bg-transparent 
          px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent 
          file:text-sm file:font-medium file:text-foreground 
          placeholder:text-muted-foreground focus-visible:outline-none 
          focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed 
          disabled:opacity-50 md:text-sm

         
        "
                    >
                      {timeAllocated.hours}hr {timeAllocated.minutes}mins
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={() => setvisibilityOfDialog((v) => !v)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                saveTask();
              }}
            >
              {" "}
              {task ? "Save Changes" : "Save"}{" "}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AddTaskDialog;
