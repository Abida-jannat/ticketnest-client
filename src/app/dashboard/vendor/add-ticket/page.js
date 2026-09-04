"use client";

import { useState } from "react";
import { Plus } from "@gravity-ui/icons";

export default function AddTicketPage() {
  const [loading, setLoading] = useState(false);

  // Replace with your actual authentication context or props user email/name
  const vendorName = "Green Travels Ltd";
  const vendorEmail = "vendor@ticketnest.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = e.target;
      const imageFile = form.image.files[0];

      if (!imageFile) {
        alert("Please select a ticket banner or bus image.");
        setLoading(false);
        return;
      }

      // 1. Upload Image to ImgBB using environment variable
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgbbRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const imgbbData = await imgbbRes.json();

      if (!imgbbData.success) {
        throw new Error("Image upload failed via ImgBB.");
      }
      const imageUrl = imgbbData.data.url;

      // 2. Gather Perks (Checkboxes)
      const perks = Array.from(
        form.querySelectorAll('input[name="perks"]:checked')
      ).map((el) => el.value);

      // 3. Construct Ticket Payload
      const ticketPayload = {
        title: form.title.value,
        from: form.from.value,
        to: form.to.value,
        transportType: form.transportType.value,
        price: Number(form.price.value),
        quantity: Number(form.quantity.value),
        departureDateTime: form.departureDateTime.value,
        perks: perks,
        image: imageUrl,
        vendorName: vendorName,
        vendorEmail: vendorEmail,
      };

      // 4. Send to Backend Server using environment variable base URL
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticketPayload),
      });

      const result = await res.json();

      if (result.success) {
        alert("Ticket added successfully with 'pending' status!");
        form.reset();
      } else {
        alert(result.message || "Failed to add ticket.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred while publishing the ticket.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Add New Ticket
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          Publish a new intercity bus or transport ticket for users to book.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 md:p-8 shadow-xl shadow-black/20">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ticket Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
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
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Transport Type
              </label>
              <select
                name="transportType"
                required
                className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Transport Type</option>
                <option value="AC Bus">AC Bus</option>
                <option value="Non-AC Bus">Non-AC Bus</option>
                <option value="Sleeper Coach">Sleeper Coach</option>
                <option value="Microbus">Microbus</option>
              </select>
            </div>

            {/* Departure Location */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
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

            {/* Arrival Location */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
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
              <label className="block text-sm font-medium text-gray-300 mb-2">
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

            {/* Ticket Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
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

            {/* Departure Date & Time */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Departure Date & Time
              </label>
              <input
                name="departureDateTime"
                type="datetime-local"
                required
                className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Perks Checkboxes */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Perks & Amenities
              </label>
              <div className="flex flex-wrap gap-4">
                {["AC", "Breakfast", "WiFi", "Water Bottle", "Blanket", "TV"].map(
                  (perk) => (
                    <label
                      key={perk}
                      className="inline-flex items-center gap-2 cursor-pointer text-sm text-gray-300 bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 hover:border-gray-700"
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

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Ticket / Bus Image Upload
              </label>
              <input
                name="image"
                type="file"
                accept="image/*"
                required
                className="w-full text-sm text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer bg-gray-900 rounded-xl border border-gray-800"
              />
            </div>

            {/* Readonly Vendor Details */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Vendor Name (Readonly)
              </label>
              <input
                type="text"
                value={vendorName}
                readOnly
                className="w-full rounded-xl border border-gray-800 bg-gray-900/50 px-4 py-2.5 text-sm text-gray-400 cursor-not-allowed focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Vendor Email (Readonly)
              </label>
              <input
                type="text"
                value={vendorEmail}
                readOnly
                className="w-full rounded-xl border border-gray-800 bg-gray-900/50 px-4 py-2.5 text-sm text-gray-400 cursor-not-allowed focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-500 disabled:opacity-50"
            >
              <Plus width={18} height={18} />
              <span>{loading ? "Publishing Ticket..." : "Add Ticket"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}