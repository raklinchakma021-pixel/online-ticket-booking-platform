import AdvertisementSection from "@/components/home/AdvertisementSection";
import Image from "next/image";
import HeroBanner from "../components/home/HeroSection";
import LatestTicketsSection from "@/components/home/LatestTicketsSection";
import { getTickets } from "@/lib/api/tickets";
import PopularRoutesSection from "@/components/home/PopularRoutesSection";
import WhyChooseUsSection from "@/components/home/WhyChooseSection";

export default async function Home() {
   const tickets = await getTickets();
   console.log(tickets)
  return (
   <>
   <HeroBanner/>
   <AdvertisementSection/>
   <LatestTicketsSection tickets={tickets}/>
   <PopularRoutesSection/>
   <WhyChooseUsSection/>
   </>
  );
}
