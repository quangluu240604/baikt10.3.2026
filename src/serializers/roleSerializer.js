export function toRoleResponse(role) {
  return {
    id: role._id,
    name: role.name,
    description: role.description,
    createdAt: role.createdAt,
    updatedAt: role.updatedAt,
  };
}
