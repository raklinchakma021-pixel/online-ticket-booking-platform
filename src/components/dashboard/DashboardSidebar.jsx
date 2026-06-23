import { getUserSession } from "@/lib/core/session";
import {
  LayoutSideContentLeft,
  House,
  Person,
  Ticket,
  Plus,
  CircleInfo,
   
  
  Megaphone,
  CircleDollar,
  
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { CodeSquare } from "lucide-react";
import Link from "next/link";

export async function DashboardSidebar() {
   const user = await getUserSession();
  const vendorNavLinks = [
    {
      icon: House,
      href: "/dashboard/vendor",
      label: "Dashboard",
    },
    {
      icon: Ticket,
      href: "/dashboard/vendor/tickets",
      label: "My Tickets",
    },
    {
      icon: Plus,
      href: "/dashboard/vendor/tickets/add-tickets",
      label: "Add Ticket",
    },
    {
      icon: Person,
      href: "/dashboard/vendor/profile",
      label: "Vendor Profile",
    },
    {
      icon: CircleInfo,
      href: "/dashboard/vendor/manage-bookings",
      label: "Requested Bookings",
    },
    {
      icon: CodeSquare,
      href: "/dashboard/vendor/revenue",
      label: "Revenue Overview",
    },
  ];


const userNavLinks = [
  {
    icon: House,
    href: "/dashboard/user",
    label: "Dashboard",
  },
  {
    icon: Ticket,
    href: "/tickets",
    label: "Browse Tickets",
  },
  {
    icon: CircleInfo,
    href: "/dashboard/user/my-bookings",
    label: "My Bookings",
  },
  {
    icon: CircleDollar,
    href: "/dashboard/user/payment-history",
    label: "Payment History",
  },
  {
    icon: Person,
    href: "/dashboard/user/profile",
    label: "Profile",
  },
];


const adminNavLinks = [
  {
    icon: House,
    href: "/dashboard/admin",
    label: "Dashboard",
  },
  {
    icon: Person,
    href: "/dashboard/admin/users",
    label: "Manage Users",
  },
  {
    icon: Ticket,
    href: "/dashboard/admin/manage-tickets",
    label: "Manage Tickets",
  },
  {
    icon: Person,
    href: "/dashboard/admin/vendors",
    label: "Manage Vendors",
  },
  {
    icon: Megaphone,
    href: "/dashboard/admin/advertisements",
    label: "Advertisements",
  },
  {
    icon: CircleInfo,
    href: "/dashboard/admin/bookings",
    label: "All Bookings",
  },
];
 const navLinksMap = {
        user: userNavLinks,
        vendor: vendorNavLinks,
        admin: adminNavLinks
    }

    const navItems = navLinksMap[user?.role || 'user'];
  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-default"
        >
          <item.icon className="size-5" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        <div className="mb-6">
          <h2 className="text-xl font-bold">🎫 TicketBari</h2>
        <p className="text-sm text-default-500">
  {user?.role === "admin"
    ? "Admin Dashboard"
    : user?.role === "vendor"
    ? "Vendor Dashboard"
    : "User Dashboard"}
</p>
        </div>

        {navContent}
      </aside>

      {/* Mobile Sidebar */}
      <Drawer>
        <Button className="lg:hidden mt-6 ml-4" variant="secondary">
          <LayoutSideContentLeft />
          Menu
        </Button>

        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />

              <Drawer.Header>
                <Drawer.Heading>
                  TicketBari (Vendor)
                </Drawer.Heading>
              </Drawer.Header>

              <Drawer.Body>
                {navContent}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}