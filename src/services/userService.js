import mongoose from "mongoose";

import { User } from "../models/userModel.js";
import { getRoleById } from "./roleService.js";
import { createError, isDuplicateKeyError } from "../utils/errors.js";
import { buildNotDeletedQuery } from "../utils/query.js";

export async function createUser(data) {
  await getRoleById(data.role);

  try {
    const user = await User.create(data);
    return User.findById(user._id).populate("role");
  } catch (error) {
    throw mapUserError(error);
  }
}

export async function getAllUsers(username = "") {
  const query = buildNotDeletedQuery();

  if (username) {
    query.username = { $regex: username, $options: "i" };
  }

  return User.find(query).populate("role").sort({ createdAt: 1 });
}

export async function getUserById(id) {
  validateObjectId(id, "User not found");

  const user = await User.findOne({
    _id: id,
    ...buildNotDeletedQuery(),
  }).populate("role");

  if (!user) {
    throw createError("User not found", 404);
  }

  return user;
}

export async function updateUser(id, data) {
  const user = await getUserById(id);

  if (data.role) {
    await getRoleById(data.role);
  }

  user.username = data.username ?? user.username;
  user.password = data.password ?? user.password;
  user.email = data.email ?? user.email;
  user.fullName = data.fullName ?? user.fullName;
  user.avatarUrl = data.avatarUrl ?? user.avatarUrl;
  user.status = data.status ?? user.status;
  user.role = data.role ?? user.role;
  user.loginCount = data.loginCount ?? user.loginCount;

  try {
    await user.save();
    await user.populate("role");
    return user;
  } catch (error) {
    throw mapUserError(error);
  }
}

export async function softDeleteUser(id) {
  const user = await getUserById(id);
  user.deletedAt = new Date();
  await user.save();
  await user.populate("role");
  return user;
}

export async function updateUserStatus({ email, username }, status) {
  const user = await User.findOne(
    buildNotDeletedQuery({
      email: email?.toLowerCase(),
      username,
    }),
  ).populate("role");

  if (!user) {
    throw createError("User not found with provided email and username", 404);
  }

  user.status = status;
  await user.save();
  return user;
}

function mapUserError(error) {
  if (isDuplicateKeyError(error)) {
    const field = Object.keys(error.keyPattern || {})[0];
    if (field === "username") {
      return createError("username must be unique", 400);
    }
    if (field === "email") {
      return createError("email must be unique", 400);
    }
    return createError("Duplicate key", 400);
  }

  if (error?.name === "ValidationError") {
    const message = Object.values(error.errors)[0]?.message || "Invalid user data";
    return createError(message, 400);
  }

  if (error?.name === "CastError") {
    return createError("Invalid id", 400);
  }

  return error;
}

function validateObjectId(id, message) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createError(message, 404);
  }
}
