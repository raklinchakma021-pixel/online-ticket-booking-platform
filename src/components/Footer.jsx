import Link from "next/link";
import {
  LogoFacebook,
  LogoLinkedin,
  LogoGithub,
} from "@gravity-ui/icons";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* TOP SECTION */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* LOGO & DESCRIPTION */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500">
                <span className="text-xl font-bold text-white">🎫</span>
              </div>

              <div>
                <h2 className="text-2xl font-bold">TicketBari</h2>
              </div>
            </Link>

            <p className="max-w-xs leading-8 text-gray-400">
              Book bus, train, launch, and flight tickets easily from one
              trusted platform. Fast, secure, and hassle-free travel booking.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <Link
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 transition hover:bg-blue-600"
              >
                <LogoFacebook className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 transition hover:bg-blue-600"
              >
                <LogoGithub className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 transition hover:bg-blue-600"
              >
                <LogoLinkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-cyan-400">
              Quick Links
            </h3>

            <ul className="space-y-4 text-gray-400">
              <li>
                <Link href="/" className="transition hover:text-white">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/tickets" className="transition hover:text-white">
                  All Tickets
                </Link>
              </li>

              <li>
                <Link href="/about" className="transition hover:text-white">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="/contact" className="transition hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-cyan-400">
              Contact Info
            </h3>

            <ul className="space-y-4 text-gray-400">
              <li>📧 support@ticketbari.com</li>
              <li>📞 +880 1234-567890</li>
              <li>📍 Chattogram, Bangladesh</li>
              <li>
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  className="transition hover:text-white"
                >
                  Facebook Page
                </Link>
              </li>
            </ul>
          </div>

          {/* PAYMENT METHODS */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-cyan-400">
              Payment Methods
            </h3>

            <div className="space-y-4 text-gray-400">
              <div className="rounded-xl border border-white/10 p-4">
                💳 Stripe Payments
              </div>

              <div className="rounded-xl border border-white/10 p-4">
                🔒 Secure Checkout
              </div>

              <div className="rounded-xl border border-white/10 p-4">
                ⚡ Instant Confirmation
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-gray-500 md:flex-row">
          <p>© 2026 TicketBari. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/terms" className="transition hover:text-white">
              Terms & Conditions
            </Link>

            <Link href="/privacy" className="transition hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}