"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar } from "@heroui/react";
import {
  Car,
  Person,
  ArrowRightFromSquare,
  Bars,
  Xmark,
} from "@gravity-ui/icons";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  

  const { data: session, isPending } = useSession();
  const isLoggedIn = !!session;

  const user = {
    name: session?.user?.name || "User",
    email: session?.user?.email || "",
    avatar: session?.user?.image || "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          closeMenu();
        },
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4">
      <div className="w-full">

        {/* Main Navbar */}
        <div className="flex h-16 w-full items-center justify-between rounded-2xl border border-gray-800 bg-gray-950 px-4 shadow-xl shadow-black/20 sm:px-6">

          {/* Logo Section */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-900/40">
              <Car width={21} height={21} />
            </div>

            <div className="hidden sm:block">
              <h1 className="text-lg font-black tracking-tight text-white">
                Ticket<span className="text-blue-500">Nest</span>
              </h1>

              <p className="-mt-1 text-[9px] font-medium uppercase tracking-widest text-gray-500">
                Travel smarter
              </p>
            </div>

            {/* Mobile Logo */}
            <span className="text-lg font-black text-white sm:hidden">
              Ticket<span className="text-blue-500">Nest</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 rounded-xl border border-gray-800 bg-gray-900 p-1 md:flex">
            <Link
              href="/"
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-blue-900/30 transition hover:bg-blue-500"
            >
              Home
            </Link>

            <Link
              href="/tickets"
              className="rounded-lg px-5 py-2 text-sm font-medium text-gray-400 transition hover:bg-gray-800 hover:text-white"
            >
              All Tickets
            </Link>

            {isLoggedIn && (
              <Link
                href="/dashboard"
                className="rounded-lg px-5 py-2 text-sm font-medium text-gray-400 transition hover:bg-gray-800 hover:text-white"
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2">

            {isPending ? (
              <div className="h-9 w-20 animate-pulse rounded-xl bg-gray-900" />
            ) : !isLoggedIn ? (
              <>
                {/* Desktop Auth Links */}
                <div className="hidden items-center gap-2 sm:flex">
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-gray-300 transition hover:bg-gray-800 hover:text-white"
                  >
                    Login
                  </Link>

                  <Link
                    href="/auth/register"
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-500"
                  >
                    Register
                  </Link>
                </div>

                {/* Mobile Hamburger Toggle Button */}
                <button
                  type="button"
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                  className="rounded-xl bg-gray-900 p-2.5 text-gray-300 transition hover:bg-gray-800 hover:text-blue-400 sm:hidden"
                  aria-label="Toggle menu"
                  aria-expanded={isMenuOpen}
                >
                  {isMenuOpen ? (
                    <Xmark width={21} height={21} />
                  ) : (
                    <Bars width={21} height={21} />
                  )}
                </button>
              </>
            ) : (
              <>
                {/* Logged In Direct Profile & Logout Buttons (No Dropdown) */}
                <div className="flex items-center gap-2">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 rounded-xl border border-gray-800 bg-gray-900 p-1.5 pr-3 transition hover:border-gray-700 hover:bg-gray-800"
                  >
                    <Avatar
                      src={user.avatar}
                      name={user.name}
                      size="sm"
                    />

                    <div className="hidden text-left sm:block">
                      <p className="text-xs font-bold text-white">
                        {user.name}
                      </p>

                      <p className="text-[10px] text-gray-500">
                        Account
                      </p>
                    </div>
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-red-900/50 bg-red-950/30 px-3.5 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-900/40"
                  >
                    <ArrowRightFromSquare width={15} height={15} />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>

                {/* Mobile Menu Button for Logged In User */}
                <button
                  type="button"
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                  className="rounded-xl bg-gray-900 p-2.5 text-gray-300 transition hover:bg-gray-800 hover:text-blue-400 md:hidden"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <Xmark width={21} height={21} />
                  ) : (
                    <Bars width={21} height={21} />
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="mt-2 w-full rounded-2xl border border-gray-800 bg-gray-950 p-4 shadow-xl shadow-black/20 md:hidden">
            <nav className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={closeMenu}
                className="rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500"
              >
                Home
              </Link>

              <Link
                href="/tickets"
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 font-medium text-gray-400 transition hover:bg-gray-900 hover:text-white"
              >
                All Tickets
              </Link>

              {isLoggedIn && (
                <>
                  <Link
                    href="/dashboard"
                    onClick={closeMenu}
                    className="rounded-xl px-4 py-3 font-medium text-gray-400 transition hover:bg-gray-900 hover:text-white"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    onClick={closeMenu}
                    className="rounded-xl px-4 py-3 font-medium text-gray-400 transition hover:bg-gray-900 hover:text-white"
                  >
                    My Profile
                  </Link>
                </>
              )}

              {/* Mobile Auth Buttons */}
              {!isLoggedIn ? (
                <div className="mt-2 grid grid-cols-2 gap-2 border-t border-gray-800 pt-4">
                  <Link
                    href="/auth/login"
                    onClick={closeMenu}
                    className="inline-flex items-center justify-center rounded-xl border border-gray-700 px-4 py-2.5 text-sm font-semibold text-gray-300 transition hover:bg-gray-900 hover:text-white"
                  >
                    Login
                  </Link>

                  <Link
                    href="/auth/register"
                    onClick={closeMenu}
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-500"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="mt-2 border-t border-gray-800 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-red-950/40 border border-red-900/50 px-4 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-900/40"
                  >
                    <ArrowRightFromSquare width={16} height={16} />
                    Logout
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}

      </div>
    </header>
  );
}