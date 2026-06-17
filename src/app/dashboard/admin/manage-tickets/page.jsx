import React from "react";
import { Table, Chip, Button, Tooltip } from "@heroui/react";
import { Eye, Edit2, Trash2 } from "lucide-react";
// import { getVendorTickets } from "@/lib/api/tickets";

const ManageTicketsPage = async () => {
  // const tickets = await getVendorTickets();
  const tickets = [];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "success";
      case "sold out":
        return "warning";
      case "cancelled":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-4">
      <div>
        <h2 className="text-2xl font-bold">
          Manage Tickets
        </h2>

        <p className="text-sm text-default-500">
          View, update, and manage all your published tickets.
        </p>
      </div>

      <Table aria-label="Manage Tickets Table">
        <Table.ResizableContainer>
          <Table.Content className="min-w-[1000px]">
          <Table.Header>
  <Table.Column isRowHeader id="title" defaultWidth="2fr" minWidth={220}>
    Ticket
    <Table.ColumnResizer />
  </Table.Column>

  <Table.Column id="transport" defaultWidth="1fr" minWidth={120}>
    Transport
    <Table.ColumnResizer />
  </Table.Column>

  <Table.Column id="route" defaultWidth="2fr" minWidth={200}>
    Route
    <Table.ColumnResizer />
  </Table.Column>

  <Table.Column id="departureDate" defaultWidth="1fr" minWidth={140}>
    Departure Date
    <Table.ColumnResizer />
  </Table.Column>

  <Table.Column id="departureTime" defaultWidth="1fr" minWidth={120}>
    Departure Time
    <Table.ColumnResizer />
  </Table.Column>

  <Table.Column id="price" defaultWidth="1fr" minWidth={100}>
    Price
    <Table.ColumnResizer />
  </Table.Column>

  <Table.Column id="seats" defaultWidth="1fr" minWidth={120}>
    Seats
    <Table.ColumnResizer />
  </Table.Column>

  <Table.Column id="status" defaultWidth="1fr" minWidth={120}>
    Status
    <Table.ColumnResizer />
  </Table.Column>

  <Table.Column id="actions" defaultWidth="1.2fr" minWidth={150}>
    Actions
  </Table.Column>
</Table.Header>

            <Table.Body emptyContent="No tickets found.">
              {tickets.map((ticket) => (
               <Table.Row key={ticket._id}>
  {/* Ticket */}
  <Table.Cell>
    <div>
      <p className="font-medium">{ticket.title}</p>
      <p className="text-xs text-default-400">
        {ticket.operator}
      </p>
    </div>
  </Table.Cell>

  {/* Transport */}
  <Table.Cell>
    {ticket.transportType}
  </Table.Cell>

  {/* Route */}
  <Table.Cell>
    {ticket.from} → {ticket.to}
  </Table.Cell>

  {/* Departure Date */}
  <Table.Cell>
    {ticket.departureDate}
  </Table.Cell>

  {/* Departure Time */}
  <Table.Cell>
    {ticket.departureTime}
  </Table.Cell>

  {/* Price */}
  <Table.Cell>
    ৳{ticket.price}
  </Table.Cell>

  {/* Seats */}
  <Table.Cell>
    {ticket.availableSeats}
  </Table.Cell>

  {/* Status */}
  <Table.Cell>
    <Chip
      size="sm"
      variant="soft"
      color={getStatusColor(ticket.status)}
    >
      {ticket.status}
    </Chip>
  </Table.Cell>

  {/* Actions */}
  <Table.Cell>
    <div className="flex items-center gap-2">
      <Tooltip content="View Ticket">
        <Button isIconOnly size="sm" variant="light">
          <Eye className="w-4 h-4" />
        </Button>
      </Tooltip>

      <Tooltip content="Edit Ticket">
        <Button isIconOnly size="sm" variant="light">
          <Edit2 className="w-4 h-4" />
        </Button>
      </Tooltip>

      <Tooltip content="Delete Ticket">
        <Button
          isIconOnly
          size="sm"
          variant="light"
          color="danger"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </Tooltip>
    </div>
  </Table.Cell>
</Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ResizableContainer>
      </Table>
    </div>
  );
};

export default ManageTicketsPage;