"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await signOut();
  };

 const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "All Tickets",
    href: "/tickets",
  },
  ...(user
    ? [
        {
          label: "Dashboard",
          href: "/dashboard",
        },
      ]
    : []),
];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg">
            <span className="text-xl font-bold text-white">🎫</span>
          </div>

          <h1 className="hidden text-lg font-bold text-white sm:block">
            TicketBari
          </h1>
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* DESKTOP MENU */}
          <div className="hidden items-center gap-6 md:flex">
            {/* NAV LINKS */}
            <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-full px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* DIVIDER */}
            <div className="h-6 w-px bg-white/20" />

            {/* AUTH */}
            <div className="flex items-center gap-4">
              {isPending ? null : user ? (
                <>
                  <span className="text-sm text-gray-300">
                    Hi, <span className="font-semibold">{user.name}</span>
                  </span>
                  <Button
                    onClick={handleSignOut}
                    variant="ghost"
                    className="text-red-400 hover:text-red-300"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
                  >
                    Login
                  </Link>

              <Link
  href="/auth/signup"
  className="flex h-11 items-center justify-center rounded-lg border-2 border-white px-6 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
>
  Register
</Link>
                </>
              )}
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 text-white transition hover:bg-white/10 md:hidden"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-black md:hidden">
          <div className="space-y-4 px-4 py-6">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="border-t border-white/10 pt-4">
              {user ? (
                <Button
                  onClick={handleSignOut}
                  className="w-full bg-red-500 font-semibold text-white"
                >
                  Sign Out
                </Button>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    href="/auth/signin"
                    className="rounded-xl px-4 py-3 text-center font-medium text-cyan-400 transition hover:bg-white/5"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>

                  <Link
  href="/auth/signup"
  className="flex h-11 items-center justify-center rounded-lg border-2 border-white px-6 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
>
  Register
</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}