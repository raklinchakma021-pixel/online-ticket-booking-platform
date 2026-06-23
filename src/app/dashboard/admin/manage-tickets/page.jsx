import React from "react";
import {
Table,
Chip,
Button,
} from "@heroui/react";

import {

  getAllTickets,

} from "@/lib/api/tickets";
import TicketActions from "@/components/admin/TicketActions";
const ManageTicketsPage = async () => {
const tickets = await getAllTickets() || [];

const getStatusColor = (status) => {
switch (status?.toLowerCase()) {
case "approved":
return "success";


  case "rejected":
    return "danger";

  case "pending":
    return "warning";

  default:
    return "default";
}


};

return ( <div className="max-w-7xl mx-auto p-6 space-y-4"> <div> <h2 className="text-2xl font-bold tracking-tight">
Manage Tickets </h2>


    <p className="text-sm text-default-500">
      Review vendor submitted tickets and approve or reject them.
    </p>
  </div>

<div className="w-full overflow-x-auto">
  <Table aria-label="Manage Tickets Table">
    <Table.ResizableContainer>
      <Table.Content className="min-w-[1600px]">
        <Table.Header>
          <Table.Column isRowHeader>Ticket</Table.Column>
          <Table.Column>Vendor</Table.Column>
          <Table.Column>Transport</Table.Column>
          <Table.Column>Route</Table.Column>
          <Table.Column>Date</Table.Column>
          <Table.Column>Price</Table.Column>
          <Table.Column>Seats</Table.Column>
          <Table.Column>Status</Table.Column>
          <Table.Column>Actions</Table.Column>
        </Table.Header>

        <Table.Body emptyContent="No tickets found.">
          {tickets.map((ticket) => (
            <Table.Row key={ticket._id}>
              <Table.Cell>
                {ticket.ticketTitle}
              </Table.Cell>

              <Table.Cell>
                {ticket.vendorName}
              </Table.Cell>

              <Table.Cell>
                {ticket.transportType}
              </Table.Cell>

              <Table.Cell>
                {ticket.from} → {ticket.to}
              </Table.Cell>

              <Table.Cell>
                {ticket.departureDate}
              </Table.Cell>

              <Table.Cell>
                ৳{ticket.price}
              </Table.Cell>

              <Table.Cell>
                {ticket.quantity}
              </Table.Cell>

              <Table.Cell>
                <Chip
                  size="sm"
                  variant="soft"
                  color={getStatusColor(ticket.status)}
                  className="capitalize"
                >
                  {ticket.status}
                </Chip>
              </Table.Cell>

           <Table.Cell>
  <TicketActions ticketId={ticket._id} />
</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Content>
    </Table.ResizableContainer>
  </Table>
</div>

</div>
);
};

export default ManageTicketsPage;
