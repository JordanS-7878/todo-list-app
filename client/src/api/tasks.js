import axios from "axios";

const API_URL = "http://localhost:5050/api/tasks";

// Calling these routes without getting token from localStorage will get a `401 Unauthorized Error`
export const getTasks = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    console.error("Failed to fetch tasks", err);
  }
};

export const createTask = async (data) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(API_URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response: ", response);

    return response.data;
  } catch (err) {
    console.error("Failed to create task", err);
  }
};

export const updateTask = async (id, data) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(`${API_URL}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    console.error("Failed to update task", err);
  }
};

export const deleteTask = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    console.error("Failed to delete task", err);
  }
};
