"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { approveTicket, rejectTicket } from "@/lib/api/tickets.client";

export default function TicketActions({ ticketId }) {
  const router = useRouter();
const handleApprove = async () => {
  try {
    console.log("Approve clicked");

    const result = await approveTicket(ticketId);

    console.log("Approve result:", result);

    router.refresh();
  } catch (error) {
    console.error(error);
  }
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