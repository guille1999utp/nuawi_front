import React, { createContext, useEffect, useState } from 'react';
import useTask from '../hooks/useTask';

export const BacklogContext = createContext();

export function BacklogProvider({ children }) {
  
  const [list, setList] = useState([]);
  const {addTask,deleteTask,error,loading,tasks,updateTask} = useTask();

  return (
    <BacklogContext.Provider value={{ addTask,deleteTask,updateTask,error,loading,tasks }}>
        { children }
    </BacklogContext.Provider>
  );
}