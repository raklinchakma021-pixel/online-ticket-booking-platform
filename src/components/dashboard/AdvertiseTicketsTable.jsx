"use client";

import React from "react";
import { Table, Button, Chip } from "@heroui/react";
import { updateAdvertiseStatus } from "@/lib/actions/tickets";

const AdvertiseTicketsTable = ({ tickets }) => {
  const handleToggle = async (id, value) => {
    const result = await updateAdvertiseStatus(id, value);

    if (result.modifiedCount > 0) {
      window.location.reload();
    } else {
      alert(result.message || "Failed to update");
    }
  };

  return (
    <div className="w-full bg-[#121214] rounded-xl p-6">
      <Table aria-label="Advertise Tickets Table">

        <Table.Content>
          <Table.Header>
            <Table.Column isRowHeader>Ticket</Table.Column>
            <Table.Column>Vendor</Table.Column>
            <Table.Column>Route</Table.Column>
            <Table.Column>Price</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Advertise</Table.Column>
          </Table.Header>

          <Table.Body emptyContent="No tickets found">
            {tickets.map((t) => (
              <Table.Row key={t._id}>

                <Table.Cell>
                  {t.ticketTitle}
                </Table.Cell>

                <Table.Cell>
                  {t.vendorName}
                </Table.Cell>

                <Table.Cell>
                  {t.from} → {t.to}
                </Table.Cell>

                <Table.Cell>
                  ৳{t.price}
                </Table.Cell>

                <Table.Cell>
                  <Chip size="sm" variant="flat">
                    {t.status}
                  </Chip>
                </Table.Cell>

                <Table.Cell>
                  <Button
                    size="sm"
                    color={t.isAdvertised ? "danger" : "success"}
                    onPress={() =>
                      handleToggle(
                        t._id,
                        !t.isAdvertised
                      )
                    }
                  >
                    {t.isAdvertised
                      ? "Unadvertise"
                      : "Advertise"}
                  </Button>
                </Table.Cell>

              </Table.Row>
            ))}
          </Table.Body>

        </Table.Content>
      </Table>
    </div>
  );
};

export default AdvertiseTicketsTable;