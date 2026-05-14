import { createContext, useState } from "react";

export const TasksContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);

  return (
    <TasksContext.Provider
      value={{ tasks, setTasks, activeTask, setActiveTask }}
    >
      {children}
    </TasksContext.Provider>
  );
}
