import axios from "axios";
import API_BASE_URL from "../config";

interface SignupData {
  name: string;
  email: string;
  password: string;
  role: string; // Example: "clubAdmin"
}

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string; // JWT token
}

// Service to handle Club Admin signup
const signup = async (data: SignupData): Promise<void> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "An error occurred during signup");
  }
};

// Service to handle Club Admin login
const login = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Invalid email or password");
  }
};

// Export the service functions
const clubAdminService = {
  signup,
  login,
};

export default clubAdminService;
