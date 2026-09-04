"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@heroui/react";
import {
  Car,
  Person,
  ArrowRightFromSquare,
  Bars,
  Xmark,
} from "@gravity-ui/icons";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Temporary authentication state
  // Later replace this with Better Auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const user = {
    name: "name",
    email: "exmple@ticketnest.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    closeMenu();
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

            {/* Active */}
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

            {!isLoggedIn ? (
              <>
                {/* Desktop Auth Buttons */}
                <div className="hidden items-center gap-2 sm:flex">

                  <Button
                    as={Link}
                    href="/auth/login"
                    variant="light"
                    className="font-semibold text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    Login
                  </Button>

                  <Button
                    as={Link}
                    href="/auth/register"
                    color="primary"
                    className="rounded-xl px-5 font-semibold shadow-lg shadow-blue-900/30"
                  >
                    Register
                  </Button>

                </div>

                {/* Mobile Button */}
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
                {/* Logged In User */}
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <button
                      type="button"
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
                    </button>
                  </DropdownTrigger>

                  <DropdownMenu aria-label="User menu" className="border border-gray-800 bg-gray-950 p-1 text-gray-200">

                    {/* User Information */}
                    <DropdownItem
                      key="profile-info"
                      isReadOnly
                      className="cursor-default opacity-100"
                    >
                      <div>
                        <p className="font-semibold text-white">
                          {user.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </DropdownItem>

                    {/* My Profile */}
                    <DropdownItem key="profile">
                      <Link
                        href="/profile"
                        className="flex w-full items-center gap-2 text-gray-300"
                      >
                        <Person width={17} height={17} />
                        My Profile
                      </Link>
                    </DropdownItem>

                    {/* Logout */}
                    <DropdownItem
                      key="logout"
                      className="text-danger"
                      color="danger"
                      onPress={handleLogout}
                    >
                      <div className="flex items-center gap-2">
                        <ArrowRightFromSquare
                          width={17}
                          height={17}
                        />
                        Logout
                      </div>
                    </DropdownItem>

                  </DropdownMenu>
                </Dropdown>

                {/* Mobile Menu Button */}
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mt-2 w-full rounded-2xl border border-gray-800 bg-gray-950 p-4 shadow-xl shadow-black/20 md:hidden">

            <nav className="flex flex-col gap-1">

              {/* Active Mobile Link */}
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
                <Link
                  href="/dashboard"
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 font-medium text-gray-400 transition hover:bg-gray-900 hover:text-white"
                >
                  Dashboard
                </Link>
              )}

              {/* Mobile Auth */}
              {!isLoggedIn && (
                <div className="mt-2 grid grid-cols-2 gap-2 border-t border-gray-800 pt-4">

                  <Button
                    as={Link}
                    href="/auth/login"
                    variant="bordered"
                    onPress={closeMenu}
                    className="border-gray-700 text-gray-300 hover:bg-gray-900 hover:text-white"
                  >
                    Login
                  </Button>

                  <Button
                    as={Link}
                    href="/auth/register"
                    color="primary"
                    onPress={closeMenu}
                  >
                    Register
                  </Button>

                </div>
              )}

            </nav>
          </div>
        )}

      </div>
    </header>
  );
}