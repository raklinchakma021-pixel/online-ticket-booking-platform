"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { approveTicket, rejectTicket } from "@/lib/api/tickets.client";

export default function TicketActions({ ticketId }) {
  const router = useRouter();

  const handleApprove = async () => {
    await approveTicket(ticketId);
    router.refresh();
  };

  const handleReject = async () => {
    await rejectTicket(ticketId);
    router.refresh();
  };

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        color="success"
        onPress={handleApprove}
      >
        Approve
      </Button>

      <Button
        size="sm"
        color="danger"
        onPress={handleReject}
      >
        Reject
      </Button>
    </div>
  );
}