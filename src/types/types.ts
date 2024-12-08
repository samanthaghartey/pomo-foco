export type TaskType = {
    name: string
    pomos : number
    id: number
}

export type TaskListContextType = {
    taskList: TaskType[]
    setTaskList : React.Dispatch<React.SetStateAction<TaskType[]>>;
    db : IDBDatabase | null
    addTask: (task : TaskType) => void
  }