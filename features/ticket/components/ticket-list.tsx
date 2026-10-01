import TicketItem from "@/features/ticket/components/ticket-item";
import getTickets from "@/features/ticket/queries/get-tickets";

export default async function TicketList() {
  const tickets = await getTickets();
  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} isDetail={false} />
      ))}
      {/* Note: this error comes from the missing prop isDetail. However, the page compiles just fine. If the prop is missing, the default value of isDetail will be undefined which will be a falsy value, even though it is not a default value in the TicketItem arguement (function TicketItem({ ticket, isDetail }: TicketItemProps)). As you can see, you don't even need "isDetail = false" */}
    </div>
  );
}
