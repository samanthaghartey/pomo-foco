import React, { useContext, useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { TaskType, TimeBlock, TimeType } from "@/types/types";
import { log } from "console";
import { TaskListContext } from "@/contexts/context";

const AddTaskDialog = () => {
  const [visible, setVisible] = useState<boolean>(false);

  //*adding task
  /*   const [task, setTask] = useState<TaskType | null>(null); */
  const [taskName, setTaskName] = useState<string>("");
  const [taskNote, setTaskNote] = useState<string>("");
  const [pomoNumber, setpomoNumber] = useState<number>(0);

  const addTask = useContext(TaskListContext)!.addTask;

  const [timeAllocated, setTimeAllocated] = useState({
    minutes: 0,
    hours: 0,
  });

  const calculateAllocatedTime = () => {
    //* Each pomo set has 4*25 minutes working period and 3*5mins break
    const totalTime =
      TimeBlock.SHORTBREAK * 3 * pomoNumber +
      TimeBlock.POMODORO * 4 * pomoNumber +
      TimeBlock.LONGBREAK * 1 * pomoNumber;
    const minutes = totalTime % 60;
    const hours = (totalTime - minutes) / 60;

    setTimeAllocated({ minutes: minutes, hours: hours });
  };

  const saveTask = () => {
    const newTask: TaskType = {
      name: taskName || `Task_${new Date().getTime()}`,
      pomos: pomoNumber || 0,
      note: taskNote,
      hours: timeAllocated.hours || 0,
      minutes: timeAllocated.minutes || 0,
      /*      id: 0, */
    };

    addTask(newTask);
  };

  useEffect(() => {
    calculateAllocatedTime();
  }, [pomoNumber]);

  return (
    <div className="w-5/6 mb-5">
      <div
        className={` px-2 ${
          visible ? "visibility: visible" : "visibility: hidden"
        }`}
      >
        <Card className=" bg-tryColor w-full mb-4">
          <CardHeader>
            <CardTitle>Add New Task</CardTitle>
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
          flex h-9 w-full text-sm rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm
         
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
            <Button onClick={() => setVisible((v) => !v)} variant="outline">
              Cancel
            </Button>
            <Button onClick={() => saveTask()}>Save</Button>
          </CardFooter>
        </Card>
      </div>

      <button
        className="text-white  px-5 py-2 bg-primary rounded-md w-full flex items-center justify-center gap-4"
        onClick={() => {
          setVisible((v) => !v);
        }}
      >
        <FaPlusCircle className="text-white" /> Add New
      </button>
    </div>
  );
};

/* export default AddTaskDialog; */
