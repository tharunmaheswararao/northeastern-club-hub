import {
  registerUserService,
  loginUserService,
  getUserByIdService,
  verifyUserService,
} from "../services/user-service.js";

export const registerUser = async (req, res) => {
  try {
      const user = await registerUserService(req.body);
      res.status(201).json(user);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
      const token = await loginUserService(req.body);
      res.status(200).json({ token });
  } catch (error) {
      res.status(401).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
      const user = await getUserByIdService(req.params.userId);
      res.status(200).json(user);
  } catch (error) {
      res.status(404).json({ error: error.message });
  }
};

export const verifyUser = async (req, res) => {
  try {
      const user = await verifyUserService(req.params.userId, req.body.status);
      res.status(200).json(user);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};
