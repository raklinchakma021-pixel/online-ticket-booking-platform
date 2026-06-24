import Link from "next/link";
import { Card, CardBody, Button, Chip, CardContent } from "@heroui/react";

const routes = [
  { from: "Dhaka", to: "Chattogram", price: 1200, transport: "Bus" },
  { from: "Dhaka", to: "Cox's Bazar", price: 1800, transport: "Bus" },
  { from: "Dhaka", to: "Sylhet", price: 900, transport: "Train" },
  { from: "Dhaka", to: "Barishal", price: 1500, transport: "Launch" },
];

const PopularRoutesSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Popular Routes</h2>
          <p className="text-default-500 mt-3">
            Explore the most booked destinations on TicketBari.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {routes.map((route, index) => (
            <Card key={index} className="p-2">
              
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">
                    {route.from} → {route.to}
                  </h3>

                  <Chip size="sm" color="primary" variant="flat">
                    {route.transport}
                  </Chip>
                </div>

                <p className="font-bold text-2xl">
                  ৳{route.price}
                </p>

                <Link
            
                  href="/tickets"
                  color="primary"
                  
                >
                  View Tickets
                </Link>
              </CardContent>

            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PopularRoutesSection;