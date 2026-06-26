import { protectedFetch, serverFetch } from "../core/server";
import { getUserSession } from "../core/session";


export const getVendors = async () => {
    return protectedFetch(`/api/vendors`);
}
/**
 * Get vendor profile by vendorId
 */
export const getVendorProfile = async (vendorId) => {
  return serverFetch(`/api/my/vendors?vendorId=${vendorId}`);
};

/**
 * Get currently logged-in vendor profile
 */
export const getLoggedInVendorProfile = async () => {
  const user = await getUserSession();

  if (!user?.id) {
    return null;
  }

  return getVendorProfile(user.id);
};