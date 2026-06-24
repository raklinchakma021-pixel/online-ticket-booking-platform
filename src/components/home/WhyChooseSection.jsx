import {
  Shield,
  Ticket,
  CreditCard,
  Rocket
} from "@gravity-ui/icons";

const features = [
  {
    title: "Verified Vendors",
    description:
      "All transport providers are verified by our admin team.",
    icon: Shield,
  },
  {
    title: "Easy Booking",
    description:
      "Book buses, trains, flights, and launches within minutes.",
    icon: Ticket,
  },
  {
    title: "Secure Payments",
    description:
      "Safe and reliable Stripe payment integration.",
    icon: CreditCard,
  },
  {
    title: "Instant Confirmation",
    description:
      "Receive booking confirmation immediately after payment.",
    icon: Rocket,
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-20 bg-content1 rounded-3xl">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            Why Choose TicketBari?
          </h2>

          <p className="text-default-500 mt-3">
            Making travel booking easier, faster, and safer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="border rounded-2xl p-6 text-center"
              >
                <div className="flex justify-center mb-4">
                  <Icon className="w-10 h-10" />
                </div>

                <h3 className="font-semibold text-xl mb-2">
                  {item.title}
                </h3>

                <p className="text-default-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUsSection;