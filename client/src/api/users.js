import axios from "axios";

const API_URL = "http://localhost:5050/api/users";

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    /*
      {
        message: "..."
        user: user
      }
    */
    return response.data;
  } catch (err) {
    console.error("Failed to fetch user", err);
    throw err; // Throw error message upwards to the function that calls this API
  }
};

export const updateCurrentUser = async (data) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(`${API_URL}/me`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    console.error("Failed to update user", err);
    throw err;
  }
};

export const deleteCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    console.error("Failed to delete user", err);
    throw err;
  }
};

export const updateUserPassword = async (id, data) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(`${API_URL}/${id}/password`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    console.error("Failed to update user", err);
    throw err;
  }
};
