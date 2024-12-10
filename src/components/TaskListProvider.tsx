import React, { useEffect, useState } from "react";
import { TaskListContext } from "../contexts/context";
import { addData, deleteData, getData, openDatabase } from "../database/db";
import { TaskType, TimeType } from "../types/types";

const TaskListProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const [taskList, setTaskList] = useState<TaskType[]>([]);
  const [currentTime, setCurrentTime] = useState<TimeType>({
    minutes: 25,
    seconds: 0,
  });
  const [visibilityOfDialog, setvisibilityOfDialog] = useState<boolean>(false);

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
        })
        .catch((e) => console.error("Error :(", e));
    }
  };

  useEffect(() => {
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
      fetchList(); // Fetch data when the DB is successfully opened and set
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
      }}
    >
      {children}
    </TaskListContext.Provider>
  );
};

export default TaskListProvider;
