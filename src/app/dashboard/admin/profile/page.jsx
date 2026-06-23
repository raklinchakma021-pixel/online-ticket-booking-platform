import React from "react";
import { getLoggedInUser } from "@/lib/api/users";
import { Chip } from "@heroui/react";

const AdminProfilePage = async () => {
  const admin = await getLoggedInUser();

  if (!admin) {
    return (
      <div className="p-6 text-red-500">
        Unauthorized access
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-[#121214] rounded-xl p-6 space-y-6">

        {/* Header */}
        <div className="flex items-center gap-4">
          <img
            src={admin.image || "/avatar.png"}
            alt="Admin"
            className="w-20 h-20 rounded-full object-cover border border-neutral-700"
          />

          <div>
            <h2 className="text-xl font-bold text-white">
              {admin.name}
            </h2>

            <p className="text-sm text-neutral-400">
              {admin.email}
            </p>

            <Chip
              size="sm"
              color="danger"
              variant="flat"
              className="mt-2"
            >
              {admin.role || "admin"}
            </Chip>
          </div>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

          <div className="bg-[#1a1a1d] p-4 rounded-lg">
            <p className="text-neutral-400">Full Name</p>
            <p className="text-white font-medium">
              {admin.name}
            </p>
          </div>

          <div className="bg-[#1a1a1d] p-4 rounded-lg">
            <p className="text-neutral-400">Email</p>
            <p className="text-white font-medium">
              {admin.email}
            </p>
          </div>

          <div className="bg-[#1a1a1d] p-4 rounded-lg">
            <p className="text-neutral-400">Role</p>
            <p className="text-white font-medium capitalize">
              {admin.role}
            </p>
          </div>

          <div className="bg-[#1a1a1d] p-4 rounded-lg">
            <p className="text-neutral-400">User ID</p>
            <p className="text-white font-medium break-all">
              {admin._id}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminProfilePage;