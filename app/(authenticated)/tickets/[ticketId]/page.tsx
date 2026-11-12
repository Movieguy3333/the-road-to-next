import { notFound } from "next/navigation";

import TicketItem from "@/features/ticket/components/ticket-item";

import getTicket from "@/features/ticket/queries/get-ticket";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { homePath } from "@/paths";
import { Separator } from "@/components/ui/separator";

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
    <div className="flex flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tickets", href: homePath() },
          { title: ticket.title },
        ]}
      />
      <Separator />
      <div className="flex justify-center animate-fade-from-top">
        {/* Note:  --animate-fade-from-top needs to be referred to as
      animate-fade-from-top. In other words, we need to remove the two dashes
      (--) */}
        {/* Note: same thing as isDetail = {true} */}
        <TicketItem ticket={ticket} isDetail />
      </div>
    </div>
  );
}
