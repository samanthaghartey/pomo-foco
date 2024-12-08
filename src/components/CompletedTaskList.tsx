import React from 'react'
import CompletedTask from './CompletedTask'

const CompletedTaskList = () => {
  return (
    <div className='bg-blue-700 px-4 py-4 mt-10  items-center w-5/6 rounded-md '>
        <h1 className='mb-4'>Completed</h1>
       

        <div className="list flex  justify-center items-center flex-col gap-8">
        
        <CompletedTask/>
        <CompletedTask/>
        <CompletedTask/>
        <CompletedTask/>


        </div>
        
        
    </div>
  )
}

export default CompletedTaskList