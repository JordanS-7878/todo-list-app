import axios from "axios";

const API_URL = "http://localhost:5050/api/tasks";

export const getTasks = async () => {
  try {
    const response = await axios.get(API_URL);

    return response.data;
  } catch (err) {
    console.error("Failed to fetch tasks", err);
  }
};

export const createTask = async (data) => {
  try {
    const response = await axios.post(API_URL, data);

    return response.data;
  } catch (err) {
    console.error("Failed to create task", err);
  }
};

export const updateTask = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);

    return response.data;
  } catch (err) {
    console.error("Failed to update task", err);
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);

    return response.data;
  } catch (err) {
    console.error("Failed to delete task", err);
  }
};
