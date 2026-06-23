import React from "react";
import UserTable from "@/components/dashboard/UserTable";
import { getUsers } from "@/lib/api/users";

const ManageUsersPage = async () => {
const users = await getUsers();

return ( <div className="min-h-screen bg-[#0d0d0f] p-8 text-neutral-100"> <div className="max-w-7xl mx-auto space-y-6"> <div> <h2 className="text-xl font-semibold tracking-tight text-neutral-200">
Users Management </h2>


      <p className="text-sm text-neutral-500 mt-1">
        Total Users: {users.length}
      </p>
    </div>

    <UserTable users={users} />
  </div>
</div>


);
};

export default ManageUsersPage;
