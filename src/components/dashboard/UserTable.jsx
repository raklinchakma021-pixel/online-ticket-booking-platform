"use client";

import React from "react";
import { Table, Button, Chip } from "@heroui/react";
import {
makeAdmin,
makeVendor,
markVendorAsFraud,
  updateFraudStatus,
} from "@/lib/actions/users";

const UserTable = ({ users }) => {

const handleMakeAdmin = async (userId) => {
const result = await makeAdmin(userId);


if (result.modifiedCount > 0) {
  window.location.reload();
}


};

const handleMakeVendor = async (userId) => {
const result = await makeVendor(userId);


if (result.modifiedCount > 0) {
  window.location.reload();
}

};


const handleFraudToggle = async (userId, value) => {
  const result = await updateFraudStatus(userId, value);

  if (result.modifiedCount > 0) {
    window.location.reload();
  }
};
const getRoleColor = (role) => {
switch (role?.toLowerCase()) {
case "admin":
return "danger";

  case "vendor":
    return "warning";

  default:
    return "primary";
}


};

return ( <div className="w-full bg-[#121214] rounded-xl p-6 overflow-x-auto"> <Table aria-label="Users Table">
<Table.ScrollContainer>
<Table.Content className="min-w-[1100px]">


        <Table.Header>
          <Table.Column isRowHeader>
            Name
          </Table.Column>

          <Table.Column>
            Email
          </Table.Column>

          <Table.Column>
            Role
          </Table.Column>

          <Table.Column>
            Fraud Status
          </Table.Column>

          <Table.Column>
            Actions
          </Table.Column>
        </Table.Header>

        <Table.Body>
          {users?.map((user) => (
            <Table.Row key={user._id}>
              <Table.Cell>
                {user.name}
              </Table.Cell>

              <Table.Cell>
                {user.email}
              </Table.Cell>

              <Table.Cell>
                <Chip
                  size="sm"
                  color={getRoleColor(user.role)}
                  variant="flat"
                >
                  {user.role}
                </Chip>
              </Table.Cell>

            <Table.Cell>
  {user.role?.toLowerCase() === "vendor" ? (
    <Button
      size="sm"
      color={user.isFraud ? "success" : "danger"}
      variant="flat"
      onPress={() =>
        handleFraudToggle(
          user._id,
          !user.isFraud
        )
      }
    >
      {user.isFraud
        ? "Remove Fraud"
        : "Mark Fraud"}
    </Button>
  ) : (
    "-"
  )}
</Table.Cell>

              <Table.Cell>
                <div className="flex flex-wrap gap-2">

                  {user.role !== "admin" && (
                    <Button
                      size="sm"
                      color="danger"
                      onPress={() =>
                        handleMakeAdmin(user._id)
                      }
                    >
                      Make Admin
                    </Button>
                  )}

                  {user.role !== "vendor" && (
                    <Button
                      size="sm"
                      color="warning"
                      onPress={() =>
                        handleMakeVendor(user._id)
                      }
                    >
                      Make Vendor
                    </Button>
                  )}

                  
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

      </Table.Content>
    </Table.ScrollContainer>
  </Table>
</div>


);
};

export default UserTable;
