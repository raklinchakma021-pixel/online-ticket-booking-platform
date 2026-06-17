'use client';

import React from 'react';
import { useSession } from "@/lib/auth-client";
import {
    Persons,
    Briefcase,
    Ticket,
    Megaphone
} from '@gravity-ui/icons';

import { DashboardStats } from '@/components/dashboard/DashboardStats';

const AdminDashboardHomePage = () => {

    const { data: session, isPending } = useSession();

    if (isPending) {
        return (
            <div className="flex items-center justify-center py-20">
                Loading...
            </div>
        );
    }

    const adminStats = [
        {
            title: "Total Users",
            value: "1,245",
            icon: Persons,
        },
        {
            title: "Total Vendors",
            value: "86",
            icon: Briefcase,
        },
        {
            title: "Total Tickets",
            value: "532",
            icon: Ticket,
        },
        {
            title: "Advertised Tickets",
            value: "6",
            icon: Megaphone,
        },
    ];

    const user = session?.user;

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className='p-6'>
                <h1 className="text-3xl md:text-4xl font-bold">
                    Welcome back, {user?.name}
                </h1>

                <p className="mt-2 text-default-500">
                    Manage users, vendors, tickets, and platform activities from your admin dashboard.
                </p>
            </div>

            {/* Stats Cards */}
            <DashboardStats statsData={adminStats} />

            {/* Quick Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl border p-6">
                    <h3 className="text-xl font-semibold mb-2">
                        Ticket Approval Queue
                    </h3>

                    <p className="text-default-500">
                        Review pending ticket submissions from vendors and approve or reject them.
                    </p>
                </div>

                <div className="rounded-2xl border p-6">
                    <h3 className="text-xl font-semibold mb-2">
                        Platform Overview
                    </h3>

                    <p className="text-default-500">
                        Monitor user activity, vendor performance, and advertised tickets.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardHomePage;