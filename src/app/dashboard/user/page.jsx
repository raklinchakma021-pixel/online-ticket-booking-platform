"use client";

import React from "react";
import { useSession } from "@/lib/auth-client";
import {
  Ticket,
  CreditCard,
  Person,
  Magnifier,
} from "@gravity-ui/icons";

import { DashboardStats } from "@/components/dashboard/DashboardStats";

const UserDashboardHomePage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-20">
        Loading...
      </div>
    );
  }

  const userStats = [
    {
      title: "My Bookings",
      value: "0",
      icon: Ticket,
    },
    {
      title: "Pending Payments",
      value: "0",
      icon: CreditCard,
    },
    {
      title: "Booked Trips",
      value: "0",
      icon: Person,
    },
    {
      title: "Available Tickets",
      value: "100+",
      icon: Magnifier,
    },
  ];

  const user = session?.user;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="p-6">
        <h1 className="text-3xl md:text-4xl font-bold">
          Welcome back, {user?.name}
        </h1>

        <p className="mt-2 text-default-500">
          Browse tickets, manage your bookings,
          track payments, and plan your next trip
          with TicketBari.
        </p>
      </div>

      {/* Stats */}
      <DashboardStats statsData={userStats} />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border p-6">
          <h3 className="text-xl font-semibold mb-2">
            My Bookings
          </h3>

          <p className="text-default-500">
            View all your booked tickets, check
            booking status, and manage upcoming
            journeys.
          </p>
        </div>

        <div className="rounded-2xl border p-6">
          <h3 className="text-xl font-semibold mb-2">
            Discover Tickets
          </h3>

          <p className="text-default-500">
            Explore available buses, trains,
            flights, and launches across
            Bangladesh and book instantly.
          </p>
        </div>
      </div>

      {/* Travel Tips */}
      <div className="rounded-2xl border p-6">
        <h3 className="text-xl font-semibold mb-2">
          Travel Reminder
        </h3>

        <p className="text-default-500">
          Arrive at your departure point at least
          30 minutes before departure time and
          keep your booking confirmation ready.
        </p>
      </div>
    </div>
  );
};

export default UserDashboardHomePage;