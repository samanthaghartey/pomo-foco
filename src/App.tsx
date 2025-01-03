import Navbar from "./components/Navbar";

import TaskListProvider from "./components/TaskListProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React from "react";
import HomePage from "./pages/HomePage";

const App: React.FC = () => {
  return (
    <TaskListProvider>
      <Router>
        <div className="bg-mybackground lg:px-96  w-full mx-auto py-7 flex items-center flex-col overflow-x-hidden ">
          <Navbar />
        </div>

        <Routes>
          <Route path="/Home" element={<HomePage />} />
          {/*   <Route path="/Stats" element={<Graph />} />
          <Route path="/Settings" element={<Stats />} /> */}
        </Routes>
      </Router>
    </TaskListProvider>
  );
};

export default App;
