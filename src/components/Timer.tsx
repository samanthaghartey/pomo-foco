import React, { useState } from 'react'

const Timer = () => {
  const [active, setActive] = useState<number | null>(null)
  const sections : string[] = ["POMODORO", "SHORT BREAK", "LONG BREAK"]

  const handleClick = (index : number) => {
    setActive(index)
  }


  return (
    <div className='mt-10 lg:px-12 py-11 sm:px-5 flex flex-col  card items-center gap-x-4 gap-y-10' >

     {/*  // sections */}
        <div className="sections flex  gap-x-10 items-center ">
       
         {
          sections.map((section, index) => {
            return (
              <div key= {index} 
              onClick={() => handleClick(index)}
              className= {` px-4 py-2 cursor-pointer  rounded-md border-solid border-sky-50 border ${active == index ? "bg-white border-white text-blue-700" :  ""} 
              `}>
                {section}</div>
                 

            )
          })
         }
        </div>

        <div className="timer">

        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
 
{/* actual timer */}

{/* //minutes */}
  <div className="flex flex-col  bg-blue-500 rounded-box text-neutral-content  p-16">
    <span className=" text-5xl ">
      <span >24</span>
    </span>
    min
  </div>


{/* //secs */}
  <div className="  bg-blue-500  rounded-box text-neutral-content flex flex-col p-16 ">
    <span className=" text-5xl countown">
     14
    </span>
    <span >
     sec
    </span>
  </div>
</div>
 </div>


  {/*start btn*/}

  <button className="px-6 py-2  border shadow shadow-white drop-shadow-lg rounded-md text-3xl ">START</button>
    </div>
  )
}

export default Timer