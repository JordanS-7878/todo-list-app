import { useContext, useEffect } from "react";
import { TasksContext } from "../context/TasksContext";
import { getTasksService } from "../services/taskService";

export const useTasks = () => {
  const { tasks, setTasks, activeTask, setActiveTask } =
    useContext(TasksContext);

  const fetchTasks = async () => {
    try {
      const data = await getTasksService();
      setTasks(data);
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
