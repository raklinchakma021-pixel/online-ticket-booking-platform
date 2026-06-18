import {
  LayoutSideContentLeft,
  House,
  Person,
  Ticket,
  Plus,
  CircleInfo,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export function DashboardSidebar() {
  const navItems = [
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
      href: "/dashboard/vendor/bookings",
      label: "Ticket Bookings",
    },
  ];

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
            Vendor Dashboard
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