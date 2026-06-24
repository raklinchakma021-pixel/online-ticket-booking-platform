import Link from "next/link";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Chip,
  CardContent,
} from "@heroui/react";

const LatestTicketsSection = ({
  tickets,
}) => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold">
              Latest Tickets
            </h2>

            <p className="text-default-500 mt-2">
              Recently added travel tickets
              from verified vendors.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {tickets?.slice(0, 8).map(
            (ticket) => (
              <Card
                key={ticket._id}
                className="overflow-hidden hover:scale-[1.02] transition"
              >
                <img
                  src={ticket.image}
                  alt={ticket.ticketTitle}
                  className="h-52 w-full object-cover"
                />

                <CardContent className="space-y-3">

                  <div>
                    <h3 className="font-bold text-lg line-clamp-1">
                      {
                        ticket.ticketTitle
                      }
                    </h3>

                    <p className="text-sm text-default-500">
                      {
                        ticket.transportType
                      }
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold">
                      ৳{ticket.price}
                    </span>

                    <span className="text-sm text-default-500">
                      Qty:
                      {" "}
                      {
                        ticket.quantity
                      }
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {ticket.perks?.map(
                      (perk) => (
                        <Chip
                          key={perk}
                          size="sm"
                          color="primary"
                          variant="flat"
                        >
                          {perk}
                        </Chip>
                      )
                    )}
                  </div>

                </CardContent>

                <CardFooter>
                  <Link
                   
                    href={`/tickets/${ticket._id}`}
                    color="primary"
                    
                  >
                    See Details
                  </Link>
                </CardFooter>
              </Card>
            )
          )}

        </div>
      </div>
    </section>
  );
};

export default LatestTicketsSection;