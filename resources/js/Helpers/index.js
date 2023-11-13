/**
 * Checks if the user has a permission
 * @param permissionSlug Permission slug to check
 * @param userRoles User roles to check
 * @returns {boolean} True if the user has the permission, false otherwise
 */
export const hasPermission = (permissionSlug, userRoles = []) => {
    for (const role of userRoles) {
        for (const permission of role.permissions) {
            if (permission.slug === permissionSlug) {
                return true;
            }
        }
    }
    return false;
}
