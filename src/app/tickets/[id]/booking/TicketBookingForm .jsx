"use client";

import React, { useState } from "react";
import {
  Form,
  Button,
  TextField,
  Label,
  Input,
} from "@heroui/react";

import {
  Person,
  
  ArrowRight,
} from "@gravity-ui/icons";

import { createBooking } from "@/lib/actions/bookings";
import { Phone } from "lucide-react";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

const TicketBookingForm = ({
  ticket,
  user,
}) => {
  const [formData, setFormData] =
    useState({
      passengerName:
        user?.name || "",
      phone: "",
      quantity: 1,
    });

  const handleChange = (e) => {
    const { name, value } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const totalPrice =
    ticket.price *
    Number(formData.quantity || 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      ticketId: ticket._id,
      ticketTitle:
        ticket.ticketTitle,

      from: ticket.from,
      to: ticket.to,

      transportType:
        ticket.transportType,

      vendorId:
        ticket.vendorId,

      vendorName:
        ticket.vendorName,
      vendorEmail:
        ticket.vendorEmail,

      userId: user.id,
      userEmail: user.email,

      passengerName:
        formData.passengerName,

      phone:
        formData.phone,

      quantity: Number(
        formData.quantity
      ),

      totalPrice,

      bookingStatus:
        "Pending",

      paymentStatus:
        "Unpaid",
    };

    const result =
      await createBooking(
        bookingData
      );

    if (result?.insertedId) {
      toast.success(
        "Booking created successfully!"
      );

      setFormData({
        passengerName:
          user?.name || "",
        phone: "",
        quantity: 1,
      });
      redirect("/dashboard/user/my-bookings")
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Book Ticket
        </h2>

        <p className="text-zinc-400 mt-2">
          {ticket.from} → {ticket.to}
        </p>
      </div>

      <Form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <TextField
          isRequired
          name="passengerName"
        >
        <Label className="!text-white dark:!text-black">
            Passenger Name
          </Label>

          <Input
            name="passengerName"
            value={
              formData.passengerName
            }
            onChange={
              handleChange
            }
            startContent={
              <Person />
            }
          />
        </TextField>

        <TextField
          isRequired
          name="phone"
        >
          <Label className="!text-white dark:!text-black">
            Phone Number
          </Label>

          <Input
            name="phone"
            value={
              formData.phone
            }
            onChange={
              handleChange
            }
            startContent={
              <Phone />
            }
          />
        </TextField>

        <TextField
          isRequired
          name="quantity"
        >
       <Label className="!text-white dark:!text-black">
            Number of Tickets
          </Label>

          <Input
            type="number"
            min="1"
            max={
              ticket.quantity
            }
            name="quantity"
            value={String(
              formData.quantity
            )}
            onChange={
              handleChange
            }
          />
        </TextField>

        <div className="bg-zinc-800 rounded-xl p-4">
          <p className="text-zinc-400 text-sm">
            Ticket Price
          </p>

          <p className="text-lg font-semibold text-white">
            ৳{ticket.price}
          </p>

          <p className="text-zinc-400 text-sm mt-2">
            Total Price
          </p>

          <p className="text-2xl font-bold text-green-400">
            ৳{totalPrice}
          </p>
        </div>

        <Button
          type="submit"
          className="w-full bg-white text-black"
          endContent={
            <ArrowRight />
          }
        >
          Confirm Booking
        </Button>

      </Form>
    </div>
  );
};

export default TicketBookingForm;