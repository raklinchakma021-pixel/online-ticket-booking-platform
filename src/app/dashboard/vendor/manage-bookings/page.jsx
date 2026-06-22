import VendorBookingsTable from "@/components/dashboard/VendorBookingsTable";

const VendorBookingsPage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookings`,
    {
      cache: "no-store",
    }
  );

  const bookings = await res.json();

  return (
    <div className="min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Requested Bookings
        </h1>

        <p className="text-default-500 mt-2">
          Review and manage ticket booking requests.
        </p>
      </div>

      <VendorBookingsTable bookings={bookings} />
    </div>
  );
};

export default VendorBookingsPage;