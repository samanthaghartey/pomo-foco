import React from 'react'

const CompletedTask = () => {
  return (
    <>
        <div className='rounded-md bg-white text-blue-700  px-4 py-4  flex justify-between  w-5/6 '>
      <div className="text ">
        <h1 className="task-name  ">Mathematics</h1>
 
      </div>

      <div className="check">
      <input type="checkbox" defaultChecked className="checkbox" />
      </div>
    </div>
    </>

  )
}

export default CompletedTask