import axios from 'axios';

const API_BASE_URL = 'http://localhost:3002/api/users'; // Replace with your backend API base URL

/**
 * Creates a new user by sending a POST request to the backend.
 *
 * @param userData - The user data object containing email, name, password, and role.
 * @returns A promise that resolves to the backend response.
 */
export const createUser = async (userData: {
  email: string;
  name: string;
  password: string;
  role: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('API Response:', response.data); // Debugging the API response
    return response.data; // Return only the data, as the frontend expects it
  } catch (error: any) {
    console.error('Error creating user:', error.response?.data || error.message);
    // Standardize error response for the frontend
    throw error.response?.data || { success: false, message: error.message || 'An error occurred' };
  }
};
