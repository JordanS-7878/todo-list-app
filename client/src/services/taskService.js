import { getTasks, createTask, updateTask, deleteTask } from "../api/tasks";

export const getTasksService = async () => {
  const res = await getTasks();
  return res;
};

export const createTaskService = async (payload) => {
  const res = await createTask(payload);
  return res;
};

export const updateTaskService = async (id, payload) => {
  const res = await updateTask(id, payload);
  return res;
};

export const deleteTaskService = async (id) => {
  const res = await deleteTask(id);
  return res;
};
