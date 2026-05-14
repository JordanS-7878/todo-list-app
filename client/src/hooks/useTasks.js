import { useContext, useEffect } from "react";
import { getTasks } from "../api/tasks";
import { TasksContext } from "../context/TasksContext";

export const useTasks = () => {
  const { tasks, setTasks, activeTask, setActiveTask } =
    useContext(TasksContext);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.tasks);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    // No need to expose `setTasks` directly to prevent accidental overwrites
    activeTask,
    setActiveTask,
    fetchTasks,
  };
};
