"use client";

import React, { useState } from "react";
import {
  Form,
  Fieldset,
  TextField,
  Label,
  Input,
  Select,
  ListBox,
  Button,
  toast,
} from "@heroui/react";

import { createTicket } from "@/lib/actions/tickets";
import { useRouter } from "next/navigation";

export default function AddTicketForm({vendor}) {
  const router = useRouter();

  // const [mockVendor] = useState({
  //   name: "Vendor Corp",
  //   email: "vendor@demo.com",
  //   id: "vendor_123",
  //   isApproved: true,
  // });

  const [isRefundable, setIsRefundable] = useState(false);
  const [selectedPerks, setSelectedPerks] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});

  const perksList = [
    "AC",
    "Breakfast",
    "WiFi",
    "Charging Port",
    "Blanket",
  ];

  const handlePerkToggle = (perk) => {
    setSelectedPerks((prev) =>
      prev.includes(perk)
        ? prev.filter((p) => p !== perk)
        : [...prev, perk]
    );
  };

const uploadToImgBB = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${API_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  console.log("IMGBB RESPONSE:", data);

  if (!data?.success) {
    throw new Error(data?.error?.message || "Image upload failed");
  }

  return data.data.url;
};
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("SUBMIT CLICKED");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log("Form Data:", data);

    const newErrors = {};

    if (!data.ticketTitle) newErrors.ticketTitle = "Required";
    if (!data.from) newErrors.from = "Required";
    if (!data.to) newErrors.to = "Required";
    if (!data.transportType) newErrors.transportType = "Required";
    if (!data.price) newErrors.price = "Required";
    if (!data.quantity) newErrors.quantity = "Required";
    if (!data.departureDate) newErrors.departureDate = "Required";
    if (!data.departureTime) newErrors.departureTime = "Required";
    if (!imageFile) newErrors.image = "Image required";

    if (Object.keys(newErrors).length) {
      console.log("Validation Errors:", newErrors);
      setErrors(newErrors);
      return;
    }

    try {
      let imageUrl = "";

      if (imageFile) {
        console.log("Uploading image...");
        imageUrl = await uploadToImgBB(imageFile);
        console.log("Image URL:", imageUrl);
      }

      const payload = {
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity),

        availableSeats: Number(data.quantity),

        perks: selectedPerks,
        image: imageUrl,
        vendorLogo: vendor.logo,

        vendorId: vendor._id,
        vendorName: vendor.name,
        vendorEmail: vendor.email,

        isRefundable,
        status: "active",
      };

      console.log("Payload:", payload);

      const res = await createTicket(payload);

      console.log("Create Ticket Response:", res);

      if (res?.acknowledged || res?.insertedId) {
        toast.success("Ticket added successfully!");

        e.target.reset();
        setSelectedPerks([]);
        setImageFile(null);
        setErrors({});

        router.push("/dashboard/vendor/tickets");
      } else {
        toast.error("Failed to create ticket");
      }
    } catch (error) {
      console.error("Ticket Create Error:", error);
      toast.error(error.message || "Failed to create ticket");
    }
  };

  const inputClass =
    "w-full bg-[#1c1c1e] border border-zinc-800 text-white h-12 px-3 rounded-lg text-sm";

  return (
    <div className="min-h-screen bg-[#0d0d0e] text-white py-10 px-4">
      <div className="max-w-3xl mx-auto bg-[#121214] border border-zinc-900 rounded-xl p-8">
        <div className="border-b border-zinc-800 pb-6 mb-8">
          <h1 className="text-2xl font-semibold">Add Ticket</h1>

          <p className="text-zinc-400 text-sm">
            Create transport ticket with full details
          </p>

          <div className="mt-4 text-xs text-zinc-400">
            Vendor:{" "}
            <span className="text-white">{vendor.name}</span> (
            {vendor.email})
          </div>
        </div>

        <Form
          onSubmit={handleSubmit}
          validationErrors={errors}
          className="space-y-8"
        >
          <Fieldset className="space-y-5">
            <legend className="text-lg text-zinc-300">
              Ticket Info
            </legend>

            <TextField name="ticketTitle">
              <Label>Ticket Title</Label>
              <Input className={inputClass} />
            </TextField>

            <div className="grid grid-cols-2 gap-4">
              <TextField name="from">
                <Label>From (Location)</Label>
                <Input className={inputClass} />
              </TextField>

              <TextField name="to">
                <Label>To (Location)</Label>
                <Input className={inputClass} />
              </TextField>
            </div>

            <Select name="transportType">
              <Label>Transport Type</Label>

              <Select.Trigger className={inputClass}>
                <Select.Value />
              </Select.Trigger>

              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="bus">Bus</ListBox.Item>
                  <ListBox.Item id="train">Train</ListBox.Item>
                  <ListBox.Item id="flight">Flight</ListBox.Item>
                  <ListBox.Item id="launch">Ship</ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>

            <div className="grid grid-cols-2 gap-4">
              <TextField name="price">
                <Label>Price</Label>
                <Input type="number" className={inputClass} />
              </TextField>

              <TextField name="quantity">
                <Label>Quantity</Label>
                <Input type="number" className={inputClass} />
              </TextField>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TextField name="departureDate">
                <Label>Date</Label>
                <Input type="date" className={inputClass} />
              </TextField>

              <TextField name="departureTime">
                <Label>Time</Label>
                <Input type="time" className={inputClass} />
              </TextField>
            </div>
          </Fieldset>

          <Fieldset>
            <legend className="text-lg text-zinc-300">Perks</legend>

            <div className="grid grid-cols-2 gap-2 mt-2">
              {perksList.map((perk) => (
                <label
                  key={perk}
                  className="flex items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={selectedPerks.includes(perk)}
                    onChange={() => handlePerkToggle(perk)}
                  />
                  {perk}
                </label>
              ))}
            </div>
          </Fieldset>

          <Fieldset>
            <legend className="text-lg text-zinc-300">Image</legend>

            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImageFile(e.target.files?.[0] || null)
              }
            />
          </Fieldset>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-white text-black font-semibold px-6"
            >
              Add Ticket
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}