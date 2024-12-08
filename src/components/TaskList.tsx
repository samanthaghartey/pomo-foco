import React, { useContext, useEffect, useState } from 'react'
import Task from './Task'
import { TaskListContext } from '../contexts/context'
import { TaskType } from '../types/types'
import { addData } from '../database/db'

const TaskList: React.FC = () => {

  const taskList = useContext(TaskListContext)!.taskList
  const addTask = useContext(TaskListContext)!.addTask

  const [task,setTask] = useState<TaskType >({name : "Melody", pomos: 3, id: 21})





  return (
    <div>
       
    <div className="task-list flex flex-col items-center gap-y-10">
      <h1 className="text-blue-700 text-xl">Tasks</h1>

      {
        taskList.map(
          (task)  => <Task name= {task.name} pomos = {task.pomos} key={task.id} />
        )
      }
   

    <button
    onClick={()=> addTask(task)} 
  className="px-4 py-3 rounded-sm bg-blue-600 w-5/6 text-white mt-4" 
  style={{ boxShadow: "4px 4px 0 rgba(0, 0, 0, 1)" }}
>
  Add New
</button>

    
    </div>



    </div>
  )
}

export default TaskList