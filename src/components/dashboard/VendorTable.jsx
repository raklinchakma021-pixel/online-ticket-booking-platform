"use client";

import React from "react";
import { Table, Button } from "@heroui/react";
import { CircleArrowDownFill } from "@gravity-ui/icons";
import { updateVendor } from "@/lib/actions/vendors";

const VendorTable = ({ vendors }) => {
 const handleApprove = async (vendorId) => {
  const result = await updateVendor(
    vendorId,
    {
      status: "Approved",
    }
  );

  console.log(result);

  if (result.modifiedCount > 0) {
    window.location.reload();
  }
};

  const handleReject = async (vendorId) => {
  const result = await updateVendor(
    vendorId,
    {
      status: "Rejected",
    }
  );

  if (result.modifiedCount > 0) {
    window.location.reload();
  }
};

  const formatDate = (dateString) => {
    if (!dateString) return "-";

    return new Date(dateString).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    );
  };

  const getStatusDetails = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return {
          color: "text-green-500",
          label: "Approved",
        };

      case "rejected":
        return {
          color: "text-red-500",
          label: "Rejected",
        };

      default:
        return {
          color: "text-yellow-500",
          label: "Pending",
        };
    }
  };

  const getInitials = (name) => {
    return name
      ? name
          .split(" ")
          .map((word) => word[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : "VD";
  };

  return (
    <div className="w-full bg-[#121214] rounded-xl p-6">
      <Table className="bg-transparent">
        <Table.ScrollContainer>
          <Table.Content aria-label="Vendor Management Table">
            <Table.Header>
              <Table.Column isRowHeader>
                Vendor
              </Table.Column>

              <Table.Column>
                Email
              </Table.Column>

              <Table.Column>
                Business Name
              </Table.Column>

              <Table.Column>
                Tickets
              </Table.Column>

              <Table.Column>
                Status
              </Table.Column>

              <Table.Column>
                Joined
              </Table.Column>

              <Table.Column className="text-right">
                Actions
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {vendors?.map((vendor) => {
                const vendorId =
                  vendor._id?.$oid ||
                  vendor._id;

                const statusInfo =
                  getStatusDetails(
                    vendor.status
                  );

                return (
                  <Table.Row
                    key={vendorId}
                  >
                    <Table.Cell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-semibold">
                          {getInitials(
                            vendor.vendorName
                          )}
                        </div>

                        <div>
                          <p className="font-medium">
                            {
                              vendor.vendorName
                            }
                          </p>

                          <p className="text-xs text-zinc-500">
                            Vendor ID:{" "}
                            {
                              vendor.vendorId
                            }
                          </p>
                        </div>
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      {
                        vendor.vendorEmail
                      }
                    </Table.Cell>

                    <Table.Cell>
                      {vendor.businessName ||
                        "N/A"}
                    </Table.Cell>

                    <Table.Cell>
                      {vendor.totalTickets ||
                        0}
                    </Table.Cell>

                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <CircleArrowDownFill
                          className={`w-2 h-2 ${statusInfo.color}`}
                        />

                        <span
                          className={`font-medium ${statusInfo.color}`}
                        >
                          {
                            statusInfo.label
                          }
                        </span>
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      {formatDate(
                        vendor.createdAt
                      )}
                    </Table.Cell>

                    <Table.Cell>
                      <div className="flex justify-end gap-2">
                        {vendor.status?.toLowerCase() !==
                          "approved" && (
                          <Button
                            size="sm"
                            onClick={() =>
                              handleApprove(
                                vendorId
                              )
                            }
                            className="bg-green-950/30 text-green-500 border border-green-900"
                          >
                            Approve
                          </Button>
                        )}

                        {vendor.status?.toLowerCase() !==
                          "rejected" && (
                          <Button
                            size="sm"
                            onClick={() =>
                              handleReject(
                                vendorId
                              )
                            }
                            className="bg-red-950/30 text-red-500 border border-red-900"
                          >
                            Reject
                          </Button>
                        )}
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default VendorTable;