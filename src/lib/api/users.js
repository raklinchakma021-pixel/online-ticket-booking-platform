import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";

/**
 * Get all users (Admin)
 */
export const getUsers = async () => {
    return serverFetch("/api/users");
};

/**
 * Get single user by id
 */
export const getUser = async (userId) => {
    return serverFetch(`/api/users/${userId}`);
};

/**
 * Get currently logged in user
 */
export const getLoggedInUser = async () => {
    const user = await getUserSession();

    if (!user?.id) {
        return null;
    }

    return getUser(user.id);
};