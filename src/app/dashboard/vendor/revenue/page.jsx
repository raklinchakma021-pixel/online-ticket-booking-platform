import { getLoggedInVendorProfile } from "@/lib/api/vendors";

const RevenuePage = async () => {
  const vendor =
    await getLoggedInVendorProfile();
console.log(vendor)
const res = await fetch(
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/vendor/revenue/${vendor._id}`,
  {
    cache: "no-store",
  }
);

  const stats = await res.json();
console.log(stats)
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Revenue Overview
        </h1>

        <p className="text-default-500 mt-2">
          Monitor your ticket sales and
          earnings.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="rounded-3xl border p-6">
          <p className="text-default-500">
            Tickets Added
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {stats.totalTicketsAdded}
          </h2>
        </div>

        <div className="rounded-3xl border p-6">
          <p className="text-default-500">
            Tickets Sold
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {stats.totalTicketsSold}
          </h2>
        </div>

        <div className="rounded-3xl border p-6">
          <p className="text-default-500">
            Total Revenue
          </p>

          <h2 className="text-4xl font-bold text-green-500 mt-2">
            ৳
            {stats.totalRevenue.toLocaleString()}
          </h2>
        </div>
      </div>

      <div className="rounded-3xl border p-6">
        <h3 className="text-xl font-semibold mb-6">
          Sales Performance
        </h3>

        <div className="max-w-xl">
          
        </div>
      </div>
    </div>
  );
};

export default RevenuePage;