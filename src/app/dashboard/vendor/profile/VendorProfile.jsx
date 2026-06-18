
'use client';

import React, { useState } from 'react';
import {
  Form,
  Fieldset,
  TextField,
  TextArea,
  Label,
  Input,
  FieldError,
  Button,
  toast
} from '@heroui/react';

import {
  ArrowUpToLine,
  ArrowRight,
  Pencil,
  Person,
} from '@gravity-ui/icons';

import { createVendor } from '@/lib/actions/vendors';

const textInputClass =
  "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition";

const textAreaClass =
  "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg p-3 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition resize-none";

export default function VendorProfile({ user, vendorProfile }) {
  const [vendor, setVendor] = useState(vendorProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const [logoUrl, setLogoUrl] = useState(
    vendorProfile?.logo || ''
  );

  const [isUploading, setIsUploading] = useState(false);
  console.log("vendorProfile", vendorProfile);
console.log("vendor", vendor);
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const apiKey =
        process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        setLogoUrl(data.data.url);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const vendorName = formData.get('vendorName');
    const businessName = formData.get('businessName');
    const phone = formData.get('phone');
    const address = formData.get('address');
    const description = formData.get('description');

    const validationErrors = {};

    if (!vendorName)
      validationErrors.vendorName =
        'Vendor name is required';

    if (!businessName)
      validationErrors.businessName =
        'Business name is required';

    if (!phone)
      validationErrors.phone =
        'Phone number is required';

    if (!address)
      validationErrors.address =
        'Address is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const vendorData = {
      vendorId: user?.id,
      vendorName,
      businessName,
      email: user?.email,
      phone,
      address,
      description,
      logo: logoUrl,
      status: vendor?.status || 'Pending',
    };

    const result = await createVendor(vendorData);

    if (result?.insertedId) {
      toast.success(
        'Vendor profile saved successfully!'
      );

      setVendor(vendorData);
      setIsEditing(false);
    }
  };

  const startRegistration = () => {
    setIsEditing(true);
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  if (!vendor?._id && !isEditing) {
    return (
      <div className="max-w-2xl mx-auto my-12 bg-zinc-950 border border-zinc-900 rounded-xl p-8 text-center space-y-6">

        <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto">
          <Person size={24} />
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            No Vendor Profile Found
          </h2>

          <p className="text-sm text-zinc-500 mt-2">
            Create your TicketBari vendor profile
            to start publishing tickets.
          </p>
        </div>

        <Button
          onPress={startRegistration}
          className="bg-white text-black"
        >
          Create Profile
          <ArrowRight size={16} />
        </Button>
      </div>
    );
  }

  if (vendor && !isEditing) {
    return (
      <div className="max-w-4xl mx-auto my-8 bg-zinc-950 border border-zinc-900 rounded-xl p-8 space-y-8">

        <div className="flex justify-between items-center border-b border-zinc-900 pb-6">

          <div className="flex gap-4 items-center">

            {vendor.logo ? (
              <img
                src={vendor.logo}
                alt={vendor.businessName}
                className="w-16 h-16 rounded-xl object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-zinc-900 flex items-center justify-center">
                <Person />
              </div>
            )}

            <div>
              <h1 className="text-2xl font-bold">
                {vendor.businessName}
              </h1>

              <p className="text-zinc-500">
                {vendor.vendorName}
              </p>

              <span className="text-xs bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full">
                {vendor.status}
              </span>
            </div>
          </div>

          <Button
            variant="bordered"
            onPress={startEditing}
          >
            <Pencil size={16} />
            Edit Profile
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="border border-zinc-900 rounded-lg p-4">
            <span className="text-xs text-zinc-500">
              Vendor Name
            </span>

            <p className="mt-1">
              {vendor.vendorName}
            </p>
          </div>

          <div className="border border-zinc-900 rounded-lg p-4">
            <span className="text-xs text-zinc-500">
              Phone
            </span>

            <p className="mt-1">
              {vendor.phone}
            </p>
          </div>

          <div className="border border-zinc-900 rounded-lg p-4">
            <span className="text-xs text-zinc-500">
              Address
            </span>

            <p className="mt-1">
              {vendor.address}
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">
            About Vendor
          </h3>

          <p className="text-zinc-400 leading-relaxed">
            {vendor.description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-8 bg-zinc-950 border border-zinc-900 rounded-xl p-8">

      <Form
        onSubmit={handleSubmit}
        validationErrors={errors}
      >
        <Fieldset className="space-y-6">

          <legend className="text-xl font-semibold mb-4">
            Vendor Profile
          </legend>

          <div className="grid md:grid-cols-2 gap-6">

            <TextField name="vendorName">
              <Label>Vendor Name</Label>
              <Input
                defaultValue={vendor?.vendorName}
                className={textInputClass}
              />
            </TextField>

            <TextField name="businessName">
              <Label>Business Name</Label>
              <Input
                defaultValue={vendor?.businessName}
                className={textInputClass}
              />
            </TextField>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <TextField>
              <Label>Email</Label>
              <Input
                value={user?.email}
                isReadOnly
                className={textInputClass}
              />
            </TextField>

            <TextField name="phone">
              <Label>Phone Number</Label>
              <Input
                defaultValue={vendor?.phone}
                className={textInputClass}
              />
            </TextField>

          </div>

          <TextField name="address">
            <Label>Address</Label>
            <Input
              defaultValue={vendor?.address}
              className={textInputClass}
            />
          </TextField>

          <div>
            <Label>Vendor Logo</Label>

            <div className="flex items-center gap-4 mt-2">

              <label className="w-16 h-16 border border-dashed border-zinc-700 rounded-xl flex items-center justify-center cursor-pointer">

                <input
                  type="file"
                  className="hidden"
                  onChange={handleLogoUpload}
                />

                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt=""
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <ArrowUpToLine />
                )}
              </label>

              <div>
                <p>
                  {isUploading
                    ? 'Uploading...'
                    : 'Upload Logo'}
                </p>

                <p className="text-xs text-zinc-500">
                  PNG / JPG (Max 5MB)
                </p>
              </div>
            </div>
          </div>

          <TextField name="description">
            <Label>About Vendor</Label>

            <TextArea
              rows={4}
              defaultValue={vendor?.description}
              className={textAreaClass}
            />
          </TextField>

          <div className="flex justify-end pt-6">

            <Button
              type="submit"
              className="bg-white text-black"
            >
              {vendor
                ? 'Save Changes'
                : 'Create Profile'}
            </Button>

          </div>

        </Fieldset>
      </Form>
    </div>
  );
}

