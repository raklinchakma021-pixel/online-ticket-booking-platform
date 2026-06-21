"use client";

import { authClient } from "@/lib/auth-client";
import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";

export function BookingCancelAlert({ bookingId }) {
  const handleCancelBooking = async () => {
    try {
      

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookings/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            "content-type":
              "application/json",
          
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert(
          "Booking cancelled successfully."
        );

        window.location.reload();
      } else {
        alert(
          data?.message ||
            "Failed to cancel booking."
        );
      }
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong while cancelling the booking."
      );
    }
  };

  return (
    <AlertDialog>
      <Button
        variant="bordered"
        color="danger"
        startContent={<TrashBin />}
      >
        Cancel Booking
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[420px]">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />

              <AlertDialog.Heading>
                Cancel Booking?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p className="text-sm text-zinc-500">
                Are you sure you want to
                cancel this ticket booking?
                This action cannot be
                undone.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button
                slot="close"
                variant="light"
              >
                Keep Booking
              </Button>

              <Button
                slot="close"
                color="danger"
                onClick={
                  handleCancelBooking
                }
              >
                Cancel Booking
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}