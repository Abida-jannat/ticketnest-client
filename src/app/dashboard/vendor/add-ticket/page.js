"use client";

import { useState } from "react";
import { Plus } from "@gravity-ui/icons";
import { useSession } from "@/lib/auth-client";

export default function AddTicketPage() {
  const [loading, setLoading] = useState(false);

  const {
    data: session,
    isPending,
  } = useSession();

  // ==========================================
  // LOADING SESSION
  // ==========================================

  if (isPending) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-blue-500" />

          <p className="text-sm text-gray-400">
            Loading vendor information...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // GET LOGGED-IN USER
  // ==========================================

  const user = session?.user;

  const vendorName = user?.name || "";
  const vendorEmail = user?.email || "";

  // ==========================================
  // NO SESSION
  // ==========================================

  if (!user) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-6 py-5 text-center">
          <h2 className="text-lg font-semibold text-red-400">
            Vendor account not found
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Please log in again to continue.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const form = e.target;

      // ======================================
      // CHECK VENDOR INFORMATION
      // ======================================

      if (!vendorName || !vendorEmail) {
        throw new Error(
          "Your account name or email could not be found."
        );
      }

      // ======================================
      // IMAGE
      // ======================================

      const imageFile =
        form.image.files[0];

      if (!imageFile) {
        alert(
          "Please select a ticket banner or bus image."
        );

        setLoading(false);
        return;
      }

      // ======================================
      // UPLOAD IMAGE TO IMGBB
      // ======================================

      const imageFormData =
        new FormData();

      imageFormData.append(
        "image",
        imageFile
      );

      const imgbbRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: imageFormData,
        }
      );

      const imgbbData =
        await imgbbRes.json();

      if (!imgbbData.success) {
        throw new Error(
          "Image upload failed via ImgBB."
        );
      }

      const imageUrl =
        imgbbData.data.url;

      // ======================================
      // PERKS
      // ======================================

      const perks = Array.from(
        form.querySelectorAll(
          'input[name="perks"]:checked'
        )
      ).map(
        (el) => el.value
      );

      // ======================================
      // TICKET PAYLOAD
      // ======================================

      const ticketPayload = {
        title:
          form.title.value.trim(),

        from:
          form.from.value.trim(),

        to:
          form.to.value.trim(),

        transportType:
          form.transportType.value,

        price:
          Number(form.price.value),

        quantity:
          Number(form.quantity.value),

        departureDateTime:
          form.departureDateTime.value,

        perks,

        image: imageUrl,

        // IMPORTANT
        // From Better Auth session
        vendorName,

        vendorEmail,
      };

      console.log(
        "Sending ticket:",
        ticketPayload
      );

      // ======================================
      // SEND TO BACKEND
      // ======================================

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tickets`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            ticketPayload
          ),
        }
      );

      const result =
        await res.json();

      // ======================================
      // SUCCESS
      // ======================================

      if (result.success) {
        alert(
          "Ticket added successfully with 'pending' status!"
        );

        form.reset();
      } else {
        alert(
          result.message ||
            "Failed to add ticket."
        );
      }
    } catch (error) {
      console.error(
        "Submission error:",
        error
      );

      alert(
        error.message ||
          "An error occurred while publishing the ticket."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="mx-auto max-w-3xl pb-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Add New Ticket
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          Publish a new intercity bus or transport
          ticket for users to book.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 shadow-xl shadow-black/20 md:p-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* Ticket Title */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Ticket Title / Route Name
              </label>

              <input
                name="title"
                type="text"
                required
                placeholder="e.g. Dhaka to Sylhet Express"
                className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Transport Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Transport Type
              </label>

              <select
                name="transportType"
                required
                className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">
                  Select Transport Type
                </option>

                <option value="AC Bus">
                  AC Bus
                </option>

                <option value="Non-AC Bus">
                  Non-AC Bus
                </option>

                <option value="Sleeper Coach">
                  Sleeper Coach
                </option>

                <option value="Microbus">
                  Microbus
                </option>
              </select>
            </div>

            {/* From */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                From (Departure)
              </label>

              <input
                name="from"
                type="text"
                required
                placeholder="e.g. Dhaka"
                className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* To */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                To (Destination)
              </label>

              <input
                name="to"
                type="text"
                required
                placeholder="e.g. Sylhet"
                className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Price */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Price (per unit in BDT)
              </label>

              <input
                name="price"
                type="number"
                min="1"
                required
                placeholder="e.g. 1200"
                className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Ticket Quantity (Total Seats)
              </label>

              <input
                name="quantity"
                type="number"
                min="1"
                required
                placeholder="e.g. 40"
                className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Departure Date */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Departure Date & Time
              </label>

              <input
                name="departureDateTime"
                type="datetime-local"
                required
                className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Perks */}
            <div className="md:col-span-2">
              <label className="mb-3 block text-sm font-medium text-gray-300">
                Perks & Amenities
              </label>

              <div className="flex flex-wrap gap-4">
                {[
                  "AC",
                  "Breakfast",
                  "WiFi",
                  "Water Bottle",
                  "Blanket",
                  "TV",
                ].map(
                  (perk) => (
                    <label
                      key={perk}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gray-800 bg-gray-900 px-3.5 py-2 text-sm text-gray-300 hover:border-gray-700"
                    >
                      <input
                        type="checkbox"
                        name="perks"
                        value={perk}
                        className="rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-blue-500"
                      />

                      {perk}
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Image */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Ticket / Bus Image Upload
              </label>

              <input
                name="image"
                type="file"
                accept="image/*"
                required
                className="w-full cursor-pointer rounded-xl border border-gray-800 bg-gray-900 text-sm text-gray-400 file:mr-4 file:rounded-xl file:border-0 file:bg-blue-600 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-500"
              />
            </div>

            {/* Vendor Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Vendor Name
              </label>

              <input
                type="text"
                value={vendorName}
                readOnly
                className="w-full cursor-not-allowed rounded-xl border border-gray-800 bg-gray-900/50 px-4 py-2.5 text-sm text-gray-400 focus:outline-none"
              />
            </div>

            {/* Vendor Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Vendor Email
              </label>

              <input
                type="text"
                value={vendorEmail}
                readOnly
                className="w-full cursor-not-allowed rounded-xl border border-gray-800 bg-gray-900/50 px-4 py-2.5 text-sm text-gray-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus
                width={18}
                height={18}
              />

              <span>
                {loading
                  ? "Publishing Ticket..."
                  : "Add Ticket"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}