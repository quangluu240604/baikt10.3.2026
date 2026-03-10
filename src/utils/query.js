export function buildNotDeletedQuery(extra = {}) {
  return {
    deletedAt: null,
    ...extra,
  };
}
