import Placeholder from "@/components/placeholder";
import { Button } from "@/components/ui/button";

import { notFound } from "next/navigation";
import Link from "next/link";
import { ticketsPath } from "@/paths";
import TicketItem from "@/features/ticket/components/ticket-item";

import getTicket from "@/features/ticket/queries/get-ticket";
type TicketPageProps = {
  params: {
    ticketId: string;
  };
};

export default async function TicketsPage({ params }: TicketPageProps) {
  /* 
    Note: 
      In previous versions of Next.js, params and searchParams were synchronous objects. As of Next.js 15, they are now Promises to improve performance and enable easier caching, which means you must "unwrap" them before you can access their properties.
    */
  const { ticketId } = await params;

  const ticket = await getTicket(ticketId);

  if (!ticket) {
    // Note: This will redirect the user to the nearest not-found.tsx file.
    notFound();
  }

  return (
    // --animate-fade-from-top needs to be referred to as animate-fade-from-top. In other words, we need to remove the two dashes (--)
    <div className="flex justify-center animate-fade-from-top">
      {/* Note: same thing as isDetail = {true} */}
      <TicketItem ticket={ticket} isDetail />
    </div>
  );
}
