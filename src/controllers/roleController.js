import { toRoleResponse } from "../serializers/roleSerializer.js";
import { toUserResponse } from "../serializers/userSerializer.js";
import {
  createRole,
  getAllRoles,
  getRoleById,
  getUsersByRole,
  softDeleteRole,
  updateRole,
} from "../services/roleService.js";

export async function createRoleController(req, res) {
  const role = await createRole(req.body);
  res.status(201).json({ data: toRoleResponse(role) });
}

export async function getAllRolesController(req, res) {
  const roles = await getAllRoles();
  res.status(200).json({ data: roles.map(toRoleResponse) });
}

export async function getRoleByIdController(req, res) {
  const role = await getRoleById(req.params.id);
  res.status(200).json({ data: toRoleResponse(role) });
}

export async function updateRoleController(req, res) {
  const role = await updateRole(req.params.id, req.body);
  res.status(200).json({ data: toRoleResponse(role) });
}

export async function deleteRoleController(req, res) {
  const role = await softDeleteRole(req.params.id);
  res.status(200).json({ data: toRoleResponse(role) });
}

export async function getUsersByRoleController(req, res) {
  const users = await getUsersByRole(req.params.id);
  res.status(200).json({ data: users.map(toUserResponse) });
}
