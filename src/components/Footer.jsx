"use client";

import Link from "next/link";
import { Car, CreditCard } from "@gravity-ui/icons";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 text-gray-300">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Column 1 - Logo & Description */}
          <div>
            <Link
              href="/"
              className="mb-5 flex items-center gap-2.5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-900/30">
                <Car width={21} height={21} />
              </div>

              <h2 className="text-xl font-black text-white">
                Ticket<span className="text-blue-500">Nest</span>
              </h2>
            </Link>

            <p className="max-w-xs text-sm leading-6 text-gray-500">
              Book bus, train, launch & flight tickets easily.
              Travel smarter, faster, and more conveniently with
              TicketNest.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-500 transition hover:text-blue-400"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/tickets"
                  className="text-sm text-gray-500 transition hover:text-blue-400"
                >
                  All Tickets
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-500 transition hover:text-blue-400"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-500 transition hover:text-blue-400"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contact Info */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
              Contact Us
            </h3>

            <ul className="space-y-4">

              <li className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>

                <a
                  href="mailto:support@ticketnest.com"
                  className="text-sm text-gray-500 transition hover:text-blue-400"
                >
                  support@ticketnest.com
                </a>
              </li>

              <li className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>

                <a
                  href="tel:+8801700000000"
                  className="text-sm text-gray-500 transition hover:text-blue-400"
                >
                  +880 1700-000000
                </a>
              </li>

              <li className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>

                <a
                  href="#"
                  className="text-sm text-gray-500 transition hover:text-blue-400"
                >
                  Facebook Page
                </a>
              </li>

            </ul>
          </div>

          {/* Column 4 - Payment Methods */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
              Payment Methods
            </h3>

            <p className="mb-4 text-sm text-gray-500">
              Secure payments powered by
            </p>

            <div className="flex items-center gap-3">

              {/* Stripe */}
              <div className="flex h-11 items-center gap-2 rounded-xl border border-gray-800 bg-gray-900 px-4 transition hover:border-blue-600">
                <CreditCard
                  width={19}
                  height={19}
                  className="text-blue-500"
                />

                <span className="font-bold text-white">
                  stripe
                </span>
              </div>

            </div>

            <p className="mt-4 text-xs text-gray-600">
              Your payment information is securely processed.
            </p>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-center sm:flex-row sm:px-8 sm:text-left">

          <p className="text-xs text-gray-600">
            © 2025 TicketNest. All rights reserved.
          </p>

          <p className="text-xs text-gray-600">
            Secure • Simple • Reliable
          </p>

        </div>

      </div>

    </footer>
  );
}