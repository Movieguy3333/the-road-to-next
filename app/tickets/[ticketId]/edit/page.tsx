import CardCompact from "@/components/card-compact";

import { notFound } from "next/navigation";
import TicketUpsertForm from "@/features/ticket/components/ticket-upsert-form";

import getTicket from "@/features/ticket/queries/get-ticket";
type TicketEditPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

async function TicketEditPage({ params }: TicketEditPageProps) {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col justify-center items-center ">
      <CardCompact
        className="w-full max-w-[420px] animate-fade-from-top "
        title="Edit ticket"
        description="Update the details of the ticket"
        content={<TicketUpsertForm ticket={ticket} />}
      />
    </div>
  );
}

export default TicketEditPage;
