"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Pencil, ArrowLeft } from "@gravity-ui/icons";

const PERKS = ["AC", "Breakfast", "WiFi", "Water Bottle"];

export default function EditTicketPage() {
  const params = useParams();
  const router = useRouter();

  const { data: session, isPending: sessionLoading } = useSession();

  const ticketId = params.id;
  const vendorEmail = session?.user?.email;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [ticket, setTicket] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    from: "",
    to: "",
    transportType: "",
    price: "",
    quantity: "",
    departureDateTime: "",
    perks: [],
    image: "",
  });



  useEffect(() => {
    if (sessionLoading) return;

      if (!vendorEmail || !ticketId) {
         // eslint-disable-next-line react-hooks/set-state-in-effect -- standard fetch-on-mount pattern//
      setLoading(false);
      return;
    }

    const fetchTicket = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tickets/vendor?vendorEmail=${encodeURIComponent(
            vendorEmail
          )}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch ticket."
          );
        }

        const foundTicket = data.tickets?.find(
          (item) => item._id === ticketId
        );

        if (!foundTicket) {
          setError(
            "Ticket not found or you do not have permission to edit it."
          );
          setLoading(false);
          return;
        }

        // Rejected tickets cannot be edited
        if (foundTicket.verificationStatus === "rejected") {
          setTicket(foundTicket);
          setError(
            "This ticket has been rejected and cannot be edited."
          );
          setLoading(false);
          return;
        }

        setTicket(foundTicket);

        setFormData({
          title: foundTicket.title || "",
          from: foundTicket.from || "",
          to: foundTicket.to || "",
          transportType: foundTicket.transportType || "",
          price: foundTicket.price || "",
          quantity: foundTicket.quantity || "",
          
          perks: Array.isArray(foundTicket.perks)
            ? foundTicket.perks
            : [],
          image: foundTicket.image || "",
        });
      } catch (err) {
        console.error("Fetch ticket error:", err);
        setError(
          err.message || "Failed to load ticket."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [vendorEmail, ticketId, sessionLoading]);

  // --------------------------------------------------
  // FORMAT DATE FOR datetime-local
  // --------------------------------------------------

  function formatDateTimeLocal(dateValue) {
    if (!dateValue) return "";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  

  const handlePerkChange = (perk) => {
    setFormData((prev) => {
      const alreadySelected = prev.perks.includes(perk);

      return {
        ...prev,
        perks: alreadySelected
          ? prev.perks.filter((item) => item !== perk)
          : [...prev.perks, perk],
      };
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!vendorEmail) {
      alert("Vendor information is missing.");
      return;
    }

    if (ticket?.verificationStatus === "rejected") {
      alert("Rejected tickets cannot be updated.");
      return;
    }

    if (!formData.title.trim()) {
      alert("Please enter a ticket title.");
      return;
    }

    if (!formData.from.trim()) {
      alert("Please enter the departure location.");
      return;
    }

    if (!formData.to.trim()) {
      alert("Please enter the destination.");
      return;
    }

    if (!formData.transportType) {
      alert("Please select a transport type.");
      return;
    }

    if (Number(formData.price) <= 0) {
      alert("Price must be greater than 0.");
      return;
    }

    if (Number(formData.quantity) <= 0) {
      alert("Quantity must be greater than 0.");
      return;
    }

    if (!formData.departureDateTime) {
      alert("Please select departure date and time.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tickets/${ticketId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vendorEmail,
            title: formData.title,
            from: formData.from,
            to: formData.to,
            transportType: formData.transportType,
            price: Number(formData.price),
            quantity: Number(formData.quantity),
            departureDateTime: formData.departureDateTime,
            perks: formData.perks,
            image: formData.image,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update ticket."
        );
      }

      alert("Ticket updated successfully!");

      router.push("/dashboard/vendor/my-ticket");
    } catch (err) {
      console.error("Update ticket error:", err);

      alert(
        err.message || "Failed to update ticket."
      );
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (sessionLoading || loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-700 border-t-blue-500" />

          <p className="mt-3 text-sm text-gray-400">
            Loading ticket...
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // ERROR
  // --------------------------------------------------

  if (error) {
    return (
      <div>
        <div className="mb-6">
          <Link
            href="/dashboard/vendor/my-ticket"
            className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
          >
            <ArrowLeft width={16} height={16} />
            Back to My Added Tickets
          </Link>
        </div>

        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center">
          <h2 className="text-lg font-semibold text-red-400">
            Unable to edit ticket
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            {error}
          </p>

          <Link
            href="/dashboard/vendor/my-ticket"
            className="mt-5 inline-flex rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Back to My Tickets
          </Link>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // FORM
  // --------------------------------------------------

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/dashboard/vendor/my-ticket"
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
        >
          <ArrowLeft width={16} height={16} />
          Back to My Added Tickets
        </Link>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Update Ticket
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            Modify your ticket information and save the changes.
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-800 bg-gray-950 p-6 shadow-xl shadow-black/20"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* Ticket Title */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Ticket Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Dhaka to Sylhet Express"
              className="w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500"
            />
          </div>

          {/* From */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              From
            </label>

            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleChange}
              placeholder="Departure location"
              className="w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500"
            />
          </div>

          {/* To */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              To
            </label>

            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleChange}
              placeholder="Destination"
              className="w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500"
            />
          </div>

          {/* Transport Type */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Transport Type
            </label>

            <select
              name="transportType"
              value={formData.transportType}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
            >
              <option value="">
                Select transport type
              </option>

              <option value="Bus">Bus</option>
              <option value="Train">Train</option>
              <option value="Launch">Launch</option>
              <option value="Flight">Flight</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Price (BDT)
            </label>

            <input
              type="number"
              name="price"
              min="1"
              value={formData.price}
              onChange={handleChange}
              placeholder="1200"
              className="w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Ticket Quantity
            </label>

            <input
              type="number"
              name="quantity"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="40"
              className="w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500"
            />
          </div>

          {/* Departure */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Departure Date & Time
            </label>

            <input
              type="datetime-local"
              name="departureDateTime"
              value={formData.departureDateTime}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
            />
          </div>

          {/* Image */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Image URL
            </label>

            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://i.ibb.co/..."
              className="w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500"
            />

            {formData.image && (
              <div className="mt-4 overflow-hidden rounded-xl border border-gray-800">
                <img
                  src={formData.image}
                  alt="Ticket preview"
                  className="h-48 w-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Perks */}
          <div className="md:col-span-2">
            <label className="mb-3 block text-sm font-medium text-gray-300">
              Perks
            </label>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {PERKS.map((perk) => (
                <label
                  key={perk}
                  className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-800 bg-gray-900 p-3 transition hover:border-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={formData.perks.includes(perk)}
                    onChange={() => handlePerkChange(perk)}
                    className="h-4 w-4 accent-blue-600"
                  />

                  <span className="text-sm text-gray-300">
                    {perk}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Current Status */}
        {ticket && (
          <div className="mt-6 border-t border-gray-800 pt-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Verification Status
              </span>

              <span
                className={`rounded-lg border px-3 py-1 text-xs font-semibold ${
                  ticket.verificationStatus === "approved"
                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                    : "border-amber-500/20 bg-amber-500/10 text-amber-400"
                }`}
              >
                {ticket.verificationStatus}
              </span>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-gray-800 pt-6 sm:flex-row sm:justify-end">
          <Link
            href="/dashboard/vendor/my-ticket"
            className="inline-flex items-center justify-center rounded-xl border border-gray-700 bg-gray-900 px-5 py-3 text-sm font-semibold text-gray-300 transition hover:bg-gray-800 hover:text-white"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Pencil width={16} height={16} />

            {saving ? "Saving Changes..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}