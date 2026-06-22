"use client";

import React from "react";
import { Table, Button } from "@heroui/react";
import { CircleArrowDownFill } from "@gravity-ui/icons";

const VendorBookingsTable = ({
  bookings,
}) => {
  const handleAccept = async (
    bookingId
  ) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookings/${bookingId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          bookingStatus:
            "Accepted",
        }),
      }
    );

    const result =
      await res.json();

    if (
      result.modifiedCount > 0
    ) {
      window.location.reload();
    }
  };

  const handleReject = async (
    bookingId
  ) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookings/${bookingId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          bookingStatus:
            "Rejected",
        }),
      }
    );

    const result =
      await res.json();

    if (
      result.modifiedCount > 0
    ) {
      window.location.reload();
    }
  };

  const getStatusDetails = (
    status
  ) => {
    switch (
      status?.toLowerCase()
    ) {
      case "accepted":
        return {
          color:
            "text-green-500",
          label: "Accepted",
        };

      case "rejected":
        return {
          color:
            "text-red-500",
          label: "Rejected",
        };

      default:
        return {
          color:
            "text-yellow-500",
          label: "Pending",
        };
    }
  };

  return (
    <div className="w-full bg-[#121214] rounded-xl p-6">
      <Table className="bg-transparent">
        <Table.ScrollContainer>
          <Table.Content aria-label="Booking Management Table">
            <Table.Header>
              <Table.Column isRowHeader>
                User
              </Table.Column>

              <Table.Column>
                Email
              </Table.Column>

              <Table.Column>
                Ticket
              </Table.Column>

              <Table.Column>
                Quantity
              </Table.Column>

              <Table.Column>
                Total Price
              </Table.Column>

              <Table.Column>
                Status
              </Table.Column>

              <Table.Column className="text-right">
                Actions
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {bookings?.map(
                (booking) => {
                  const statusInfo =
                    getStatusDetails(
                      booking.bookingStatus
                    );

                  return (
                    <Table.Row
                      key={
                        booking._id
                      }
                    >
                      <Table.Cell>
                        <div>
                          <p className="font-medium">
                            {
                              booking.passengerName
                            }
                          </p>

                          <p className="text-xs text-zinc-500">
                            Booking ID:{" "}
                            {
                              booking._id
                            }
                          </p>
                        </div>
                      </Table.Cell>

                      <Table.Cell>
                        {
                          booking.userEmail
                        }
                      </Table.Cell>

                      <Table.Cell>
                        {
                          booking.ticketTitle
                        }
                      </Table.Cell>

                      <Table.Cell>
                        {
                          booking.quantity
                        }
                      </Table.Cell>

                      <Table.Cell>
                        ৳
                        {
                          booking.totalPrice
                        }
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
                        <div className="flex justify-end gap-2">
                          {booking.bookingStatus?.toLowerCase() !==
                            "accepted" && (
                            <Button
                              size="sm"
                              onClick={() =>
                                handleAccept(
                                  booking._id
                                )
                              }
                              className="bg-green-950/30 text-green-500 border border-green-900"
                            >
                              Accept
                            </Button>
                          )}

                          {booking.bookingStatus?.toLowerCase() !==
                            "rejected" && (
                            <Button
                              size="sm"
                              onClick={() =>
                                handleReject(
                                  booking._id
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
                }
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default VendorBookingsTable;