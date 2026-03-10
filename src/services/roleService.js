import { Role } from "../models/roleModel.js";
import { User } from "../models/userModel.js";
import { createError, isDuplicateKeyError } from "../utils/errors.js";
import { buildNotDeletedQuery } from "../utils/query.js";

export async function createRole(data) {
  try {
    return await Role.create({
      name: data.name,
      description: data.description,
    });
  } catch (error) {
    throw mapRoleError(error);
  }
}

export async function getAllRoles() {
  return Role.find(buildNotDeletedQuery()).sort({ createdAt: 1 });
}

export async function getRoleById(id) {
  const role = await Role.findOne({
    _id: id,
    ...buildNotDeletedQuery(),
  });

  if (!role) {
    throw createError("Role not found", 404);
  }

  return role;
}

export async function updateRole(id, data) {
  const role = await getRoleById(id);
  role.name = data.name ?? role.name;
  role.description = data.description ?? role.description;

  try {
    await role.save();
    return role;
  } catch (error) {
    throw mapRoleError(error);
  }
}

export async function softDeleteRole(id) {
  const role = await getRoleById(id);
  role.deletedAt = new Date();
  await role.save();
  return role;
}

export async function getUsersByRole(roleId) {
  await getRoleById(roleId);
  return User.find(buildNotDeletedQuery({ role: roleId })).populate("role").sort({ createdAt: 1 });
}

function mapRoleError(error) {
  if (isDuplicateKeyError(error)) {
    return createError("name must be unique", 400);
  }

  if (error?.name === "ValidationError") {
    const message = Object.values(error.errors)[0]?.message || "Invalid role data";
    return createError(message, 400);
  }

  return error;
}
