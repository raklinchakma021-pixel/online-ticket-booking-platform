"use client";

import React, {
  useEffect,
  useState
} from "react";

import { useSession } from "@/lib/auth-client";

import {
  Ticket,
  CreditCard,
  Person,
  Magnifier,
} from "@gravity-ui/icons";

import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { getUserStats } from "@/lib/api/stats";

const UserDashboardHomePage = () => {
  const { data: session, isPending } =
    useSession();

  const [stats, setStats] =
    useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      if (!session?.user?.id) return;

      const data =
        await getUserStats(
          session.user.id
        );

      setStats(data);
    };

    fetchStats();
  }, [session]);

  if (isPending || !stats) {
    return (
      <div className="flex items-center justify-center py-20">
        Loading...
      </div>
    );
  }

  const userStats = [
    {
      title: "My Bookings",
      value: stats.myBookings,
      icon: Ticket,
    },
    {
      title: "Pending Payments",
      value: stats.pendingPayments,
      icon: CreditCard,
    },
    {
      title: "Booked Trips",
      value: stats.bookedTrips,
      icon: Person,
    },
    {
      title: "Available Tickets",
      value: stats.availableTickets,
      icon: Magnifier,
    },
  ];

  const user = session?.user;

  return (
    <div className="space-y-8">
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

      <DashboardStats statsData={userStats} />

      {/* rest of your UI */}
    </div>
  );
};

export default UserDashboardHomePage;