import React, { useEffect, useState } from "react";
import { TaskListContext } from "../contexts/context";
import { addData, deleteData, getData, openDatabase } from "../database/db";
import { TaskType, TimeBlock, TimeType } from "../types/types";

const TaskListProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dat, setDay] = useState<Date | null>(null);
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const [taskList, setTaskList] = useState<TaskType[]>([]);
  const [currentTime, setCurrentTime] = useState<TimeType>({
    minutes: 25,
    seconds: 0,
  });
  const [visibilityOfDialog, setvisibilityOfDialog] = useState<boolean>(false);

  const [activeTask, setactiveTask] = useState<TaskType | undefined>(undefined);

  let Sessions = {
    POMODORO: { name: "POMODORO", minutes: TimeBlock.POMODORO, active: true },
    SHORTBREAK: {
      name: "SHORT BREAK",
      minutes: TimeBlock.SHORTBREAK,
      active: false,
    },
    LONGBREAK: {
      name: "LONG BREAK",
      minutes: TimeBlock.LONGBREAK,
      active: false,
    },
  };

  const [sessions, setSessions] = useState(Sessions);

  //* FUNCTIONS
  const addTask = (task: TaskType) => {
    if (db) {
      addData(db, task);
      fetchList();
    }
  };

  const deleteTask = (id: number | string) => {
    if (db) {
      deleteData(db, id);
      fetchList();
    }
  };

  const resetTime = (newTime: TimeType) => {
    setCurrentTime(newTime);
  };

  const fetchList = () => {
    if (db) {
      getData(db)
        .then((taskList) => {
          setTaskList(taskList);
          setactiveTask(taskList.find((task) => task.active == true));
        })
        .catch((e) => console.error("Error :(", e));
    }
  };

  // Filter tasks by the given date
  const getTasksForDate = async (date: string): Promise<TaskType[]> => {
    const db = await openDatabase();
    const tasks = await getData(db);

    return tasks.filter((task) => task.date === date);
  };

  useEffect(() => {
    setDay(new Date());
    openDatabase()
      .then((openedDb) => {
        setDb(openedDb);
      })
      .catch((error) => {
        console.log("Error opening database", error);
      });
    fetchList();
  }, []);

  useEffect(() => {
    if (db) {
      fetchList();
      setactiveTask(taskList.find((task) => task.active == true));

      // Fetch data when the DB is successfully opened and set
    }
  }, [db]); // Trigger fetch when the db state changes

  return (
    <TaskListContext.Provider
      value={{
        taskList,
        setTaskList,
        db,
        addTask,
        currentTime,
        setCurrentTime,
        resetTime,
        visibilityOfDialog,
        setvisibilityOfDialog,
        deleteTask,
        activeTask,
        sessions,
        setSessions,
        setactiveTask,
        getTasksForDate,
      }}
    >
      {children}
    </TaskListContext.Provider>
  );
};

export default TaskListProvider;
