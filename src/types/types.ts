export type TaskType = {
  name: string;
  pomos: number;
  id: number | string;
  note: string;
  hours: number;
  minutes: number;
  completed: boolean;
  active: boolean;
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
  activeTask: TaskType | undefined;
  sessions: Session;
  setSessions: React.Dispatch<React.SetStateAction<Session>>;
  setactiveTask: React.Dispatch<React.SetStateAction<TaskType | undefined>>;
};

export enum TimeBlock {
  POMODORO = 1,
  SHORTBREAK = 1,
  LONGBREAK = 2,
}

export type Session = {
  POMODORO: SessionBlock;
  SHORTBREAK: SessionBlock;
  LONGBREAK: SessionBlock;
};

export type SessionBlock = {
  name: string;
  minutes: number;
  active: boolean;
};
