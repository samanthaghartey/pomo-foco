
import Navbar from "./components/Navbar"
import Timer from "./components/Timer"
import TaskList from "./components/TaskList"
import CompletedTaskList from "./components/CompletedTaskList"
import TextContent from "./components/TextContent"

import TaskListProvider from "./components/TaskListProvider"


const App = () => {
  return (
    <TaskListProvider>

    <div   className='bg-blue-700 lg:px-80 py-7  flex items-center flex-col sm:px-4 '>
      <Navbar/>
      <Timer/>
    </div>

    <div className="white min-h-screen lg:px-80 pt-7 flex items-center flex-col bg-white sm:px-11">
      
 
    <TaskList/>

    <CompletedTaskList/>

    <TextContent/>


    </div>


</TaskListProvider>
  )
}

export default App