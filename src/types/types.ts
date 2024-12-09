export type TaskType = {
  name: string;
  pomos: number;
  id: number;
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
  currentTime: TimeType;
  setCurrentTime: React.Dispatch<React.SetStateAction<TimeType>>;
  resetTime: (time: TimeType) => void;
};

/* export type TimeBlock = {
  minutes : number
  seconds : number
} */

export enum TimeBlock {
  POMODORO = 25,
  SHORTBREAK = 5,
  LONGBREAK = 15,
}
