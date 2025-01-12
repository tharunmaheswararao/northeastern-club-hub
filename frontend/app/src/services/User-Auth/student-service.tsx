import axios from "axios";
import API_BASE_URL from "../config";

const signup = async (data: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/register`, data);
  return response.data;
};

const login = async (data: { email: string; password: string }) => {
  const response = await axios.post(`${API_BASE_URL}/login`, data);
  return response.data;
};

const studentService = {
  signup,
  login,
};

export default studentService;
