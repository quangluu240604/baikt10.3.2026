import { toRoleResponse } from "./roleSerializer.js";

export function toUserResponse(user) {
  const role = user.role && typeof user.role === "object" && user.role.name ? user.role : null;

  return {
    id: user._id,
    username: user.username,
    password: user.password,
    email: user.email,
    fullName: user.fullName,
    avatarUrl: user.avatarUrl,
    status: user.status,
    role: role ? toRoleResponse(role) : user.role,
    loginCount: user.loginCount,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
