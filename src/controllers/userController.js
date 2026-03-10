import { toUserResponse } from "../serializers/userSerializer.js";
import {
  createUser,
  getAllUsers,
  getUserById,
  softDeleteUser,
  updateUser,
  updateUserStatus,
} from "../services/userService.js";

export async function createUserController(req, res) {
  const user = await createUser(req.body);
  res.status(201).json({ data: toUserResponse(user) });
}

export async function getAllUsersController(req, res) {
  const users = await getAllUsers(req.query.username);
  res.status(200).json({ data: users.map(toUserResponse) });
}

export async function getUserByIdController(req, res) {
  const user = await getUserById(req.params.id);
  res.status(200).json({ data: toUserResponse(user) });
}

export async function updateUserController(req, res) {
  const user = await updateUser(req.params.id, req.body);
  res.status(200).json({ data: toUserResponse(user) });
}

export async function deleteUserController(req, res) {
  const user = await softDeleteUser(req.params.id);
  res.status(200).json({ data: toUserResponse(user) });
}

export async function enableUserController(req, res) {
  const user = await updateUserStatus(req.body, true);
  res.status(200).json({ data: toUserResponse(user) });
}

export async function disableUserController(req, res) {
  const user = await updateUserStatus(req.body, false);
  res.status(200).json({ data: toUserResponse(user) });
}
