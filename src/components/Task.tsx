import React from 'react'
import { FaEllipsis } from "react-icons/fa6";
import { TaskType } from '../types/types';

type TaskProp = {

  name : string
  pomos : number
}

const Task: React.FC<TaskProp> = ({name, pomos}) => {
  return (
    <div className='rounded-lg bg-blue-700 text-white px-10 py-5 flex justify-between w-4/6  sm:px-4 sm:w-5/6'>
      <div className="text w-1/2 sm:w-full">
        <h1 className="task-name text-xl font-semibold">{name}</h1>
        <p className="task-notes text-xs"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt esse quam necessitatibus amet ab itaque ratione! Aperiam perferendis molestias ut!</p>

      </div>

      <div className="time-left flex-y-1 flex flex-col justify-between items-end sm:items-center">
      <FaEllipsis />
        <div className="time-remianing text-xs"> {pomos}mins left</div>
        <div className="tomatoes flex gap-x-4">
          <div className="tomato-complete w-6 h-6 bg-blue-500 rounded-full">  </div>
          <div className="tomato-complete w-6 h-6 bg-blue-500 rounded-full">  </div>
          <div className="tomato-complete w-6 h-6 bg-blue-500 rounded-full">  </div>
        </div>
        
      </div>
      
    </div>
  )
}

export default Task