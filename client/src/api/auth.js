import axios from "axios";

const API_URL = "http://localhost:5050/api/auth";

export const register = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data);

    return response.data;
  } catch (err) {
    console.error("Failed to register", err);
    throw err;
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    console.log("response: ", response);

    return response.data;
  } catch (err) {
    console.error("Failed to login", err);
    throw err;
  }
};
