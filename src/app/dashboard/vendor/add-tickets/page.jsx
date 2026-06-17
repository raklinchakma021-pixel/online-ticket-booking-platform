"use client";

import React, { useState } from "react";
import {
    Form,
    Fieldset,
    TextField,
    Label,
    Input,
    TextArea,
    FieldError,
    Select,
    ListBox,
    Switch,
    Button,
    toast
} from "@heroui/react";

import { Globe, Upload } from "@gravity-ui/icons";
// import { createTicket } from "@/lib/actions/tickets";
import { redirect } from "next/navigation";

export default function AddTicketPage() {
    const [mockVendor] = useState({
        name: "Vendor Corp",
        email: "vendor@demo.com",
        id: "vendor_123",
        isApproved: true,
    });

    const [isRefundable, setIsRefundable] = useState(false);
    const [selectedPerks, setSelectedPerks] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [errors, setErrors] = useState({});

    const perksList = ["AC", "Breakfast", "WiFi", "Charging Port", "Blanket"];

    const handlePerkToggle = (perk) => {
        setSelectedPerks((prev) =>
            prev.includes(perk)
                ? prev.filter((p) => p !== perk)
                : [...prev, perk]
        );
    };

    // Upload to ImgBB
    const uploadToImgBB = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch(
            `https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await res.json();
        return data?.data?.url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

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
            setErrors(newErrors);
            return;
        }

        let imageUrl = "";
        if (imageFile) {
            imageUrl = await uploadToImgBB(imageFile);
        }

        const payload = {
            ...data,
            price: Number(data.price),
            quantity: Number(data.quantity),
            perks: selectedPerks,
            image: imageUrl,
            vendorId: mockVendor.id,
            vendorName: mockVendor.name,
            vendorEmail: mockVendor.email,
            isRefundable,
            status: "active",
        };

        // const res = await createTicket(payload);

        if (res?.insertedId) {
            toast.success("Ticket added successfully!");
            e.target.reset();
            setSelectedPerks([]);
            setImageFile(null);
            redirect("/dashboard/vendor/tickets");
        }
    };

    const inputClass =
        "w-full bg-[#1c1c1e] border border-zinc-800 text-white h-12 px-3 rounded-lg text-sm";

    const textAreaClass =
        "w-full bg-[#1c1c1e] border border-zinc-800 text-white p-3 rounded-lg text-sm";

    return (
        <div className="min-h-screen bg-[#0d0d0e] text-white py-10 px-4">
            <div className="max-w-3xl mx-auto bg-[#121214] border border-zinc-900 rounded-xl p-8">

                {/* Header */}
                <div className="border-b border-zinc-800 pb-6 mb-8">
                    <h1 className="text-2xl font-semibold">Add Ticket</h1>
                    <p className="text-zinc-400 text-sm">
                        Create transport ticket with full details
                    </p>

                    <div className="mt-4 text-xs text-zinc-400">
                        Vendor: <span className="text-white">{mockVendor.name}</span> ({mockVendor.email})
                    </div>
                </div>

                <Form onSubmit={handleSubmit} validationErrors={errors} className="space-y-8">

                    {/* Ticket Info */}
                    <Fieldset className="space-y-5">
                        <legend className="text-lg text-zinc-300">Ticket Info</legend>

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
                                <Label>Price (per unit)</Label>
                                <Input type="number" className={inputClass} />
                            </TextField>

                            <TextField name="quantity">
                                <Label>Ticket Quantity</Label>
                                <Input type="number" className={inputClass} />
                            </TextField>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <TextField name="departureDate">
                                <Label>Departure Date</Label>
                                <Input type="date" className={inputClass} />
                            </TextField>

                            <TextField name="departureTime">
                                <Label>Departure Time</Label>
                                <Input type="time" className={inputClass} />
                            </TextField>
                        </div>
                    </Fieldset>

                    {/* Perks */}
                    <Fieldset>
                        <legend className="text-lg text-zinc-300">Perks</legend>

                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {perksList.map((perk) => (
                                <label key={perk} className="flex items-center gap-2 text-sm">
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

                    {/* Image Upload */}
                    <Fieldset>
                        <legend className="text-lg text-zinc-300">Image</legend>

                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files?.[0])}
                            className={inputClass}
                        />
                    </Fieldset>

                    {/* Vendor (readonly info already shown) */}
                    <Fieldset>
                        <legend className="text-lg text-zinc-300">Vendor Info</legend>

                        <Input value={mockVendor.name} disabled className={inputClass} />
                        <Input value={mockVendor.email} disabled className={inputClass} />
                    </Fieldset>

                    {/* Submit */}
                    <div className="flex justify-end">
                        <Button type="submit" className="bg-white text-black font-semibold px-6">
                            Add Ticket
                        </Button>
                    </div>

                </Form>
            </div>
        </div>
    );
}