import { createContext, useContext } from "react";
import { TaskListContextType, TaskType, TimeType } from "../types/types";

export const TaskListContext = createContext<TaskListContextType | null>(null);
