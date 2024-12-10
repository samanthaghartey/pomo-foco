export type TaskType = {
  name: string;
  pomos: number;
  id: number | string;
  note: string;
  hours: number;
  minutes: number;
  completed: boolean;
};

export type TimeType = {
  minutes: number;
  seconds: number;
};

export type TaskListContextType = {
  taskList: TaskType[];
  setTaskList: React.Dispatch<React.SetStateAction<TaskType[]>>;
  db: IDBDatabase | null;
  addTask: (task: TaskType) => void;
  deleteTask: (id: number | string) => void;
  currentTime: TimeType;
  setCurrentTime: React.Dispatch<React.SetStateAction<TimeType>>;
  resetTime: (time: TimeType) => void;
  visibilityOfDialog: boolean;
  setvisibilityOfDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

/* export type TimeBlock = {
  minutes : number
  seconds : number
} */

export enum TimeBlock {
  POMODORO = 25,
  SHORTBREAK = 5,
  LONGBREAK = 20,
}
