import React from "react";
import { Avatar, Card, CardContent, Chip } from "@heroui/react";
import { getLoggedInUser } from "@/lib/api/users";

const UserProfilePage = async () => {
  const user = await getLoggedInUser();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card className="border shadow-sm">
        <CardContent className="p-8">

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">

            <Avatar
              src={user?.image}
              name={user?.name}
              className="w-32 h-32 text-3xl"
            />

            <div className="flex-1 space-y-6">

              <div>
                <h1 className="text-3xl font-bold">
                  {user?.name}
                </h1>

                <p className="text-default-500">
                  User Profile Information
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <p className="text-sm text-default-500">
                    Full Name
                  </p>

                  <p className="font-medium">
                    {user?.name || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-default-500">
                    Email
                  </p>

                  <p className="font-medium">
                    {user?.email || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-default-500">
                    Role
                  </p>

                  <Chip
                    color="primary"
                    variant="flat"
                    size="sm"
                    className="capitalize"
                  >
                    {user?.role || "user"}
                  </Chip>
                </div>

                <div>
                  <p className="text-sm text-default-500">
                    Email Verified
                  </p>

                  <Chip
                    color={
                      user?.emailVerified
                        ? "success"
                        : "warning"
                    }
                    variant="flat"
                    size="sm"
                  >
                    {user?.emailVerified
                      ? "Verified"
                      : "Not Verified"}
                  </Chip>
                </div>

                <div>
                  <p className="text-sm text-default-500">
                    User ID
                  </p>

                 <p className="font-medium break-all">
  {user?._id?.toString()}
</p>
                </div>

                <div>
                  <p className="text-sm text-default-500">
                    Joined
                  </p>

                  <p className="font-medium">
                    {user?.createdAt
                      ? new Date(
                          user.createdAt
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

              </div>
            </div>

          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfilePage;