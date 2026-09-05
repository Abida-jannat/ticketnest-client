"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      const data = await response.json();

      console.log("Users API response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || `Server returned ${response.status}`
        );
      }

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch users.");
      }

      setUsers(Array.isArray(data.users) ? data.users : []);
    } catch (error) {
      console.error("Failed to load users:", error);

      setError(
        error.message ||
          "Failed to load users. Make sure the TicketNest backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
             // eslint-disable-next-line react-hooks/set-state-in-effect -- standard fetch-on-mount pattern//
    fetchUsers();
  }, []);

  const changeRole = async (id, role) => {
    try {
      const response = await fetch(
        `${API_URL}/api/users/${id}/role`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to update user role."
        );
      }

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user._id === id
            ? {
                ...user,
                role,
              }
            : user
        )
      );
    } catch (error) {
      console.error("Change role error:", error);

      alert(error.message || "Failed to update user role.");
    }
  };



  const markFraud = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to mark this vendor as fraud? Their tickets will be hidden and they will not be able to add new tickets."
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/users/${id}/fraud`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isFraud: true,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to mark vendor as fraud."
        );
      }

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user._id === id
            ? {
                ...user,
                isFraud: true,
              }
            : user
        )
      );

      alert("Vendor marked as fraud successfully.");
    } catch (error) {
      console.error("Mark fraud error:", error);

      alert(
        error.message || "Failed to mark vendor as fraud."
      );
    }
  };

  

  if (loading) {
    return (
      <div>
        <h1 className="mb-2 text-3xl font-bold text-white">
          Manage Users
        </h1>

        <p className="text-gray-400">
          Loading users...
        </p>
      </div>
    );
  }



  if (error) {
    return (
      <div>
        <h1 className="mb-2 text-3xl font-bold text-white">
          Manage Users
        </h1>

        <div className="mt-6 rounded-xl border border-red-800 bg-red-950/40 p-5">
          <p className="text-red-400">{error}</p>

          <button
            onClick={fetchUsers}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }


  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Manage Users
        </h1>

        <p className="mt-2 text-gray-400">
          Manage user roles and vendor accounts.
        </p>
      </div>

      {/* Total */}
      <div className="mb-5">
        <p className="text-sm text-gray-400">
          Total Users:{" "}
          <span className="font-semibold text-white">
            {users.length}
          </span>
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-gray-900">
        <table className="w-full text-left">
          <thead className="border-b border-gray-800 bg-gray-950">
            <tr>
              <th className="px-5 py-4 text-sm font-semibold text-white">
                Name
              </th>

              <th className="px-5 py-4 text-sm font-semibold text-white">
                Email
              </th>

              <th className="px-5 py-4 text-sm font-semibold text-white">
                Role
              </th>

              <th className="px-5 py-4 text-sm font-semibold text-white">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="px-5 py-10 text-center text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-800 last:border-0"
                >
                  {/* Name */}
                  <td className="px-5 py-4">
                    <p className="font-medium text-white">
                      {user.name || "Unnamed User"}
                    </p>
                  </td>

                  {/* Email */}
                  <td className="px-5 py-4 text-gray-300">
                    {user.email || "No email"}
                  </td>

                  {/* Role */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-purple-500/10 text-purple-400"
                            : user.role === "vendor"
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-gray-500/10 text-gray-400"
                        }`}
                      >
                        {user.role || "user"}
                      </span>

                      {user.isFraud && (
                        <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400">
                          Fraud
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      {/* Make Admin */}
                      <button
                        onClick={() =>
                          changeRole(user._id, "admin")
                        }
                        disabled={user.role === "admin"}
                        className="rounded-lg bg-purple-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Make Admin
                      </button>

                      {/* Make Vendor */}
                      <button
                        onClick={() =>
                          changeRole(user._id, "vendor")
                        }
                        disabled={user.role === "vendor"}
                        className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Make Vendor
                      </button>

                      {/* Mark Fraud */}
                      {user.role === "vendor" && (
                        <button
                          onClick={() =>
                            markFraud(user._id)
                          }
                          disabled={user.isFraud === true}
                          className="rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {user.isFraud
                            ? "Marked Fraud"
                            : "Mark as Fraud"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}