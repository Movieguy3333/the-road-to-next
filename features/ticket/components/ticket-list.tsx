import TicketItem from "@/features/ticket/components/ticket-item";
import getTickets from "@/features/ticket/queries/get-tickets";

import { ParsedSearchParams } from "@/features/ticket/search-params";

import { TicketSortSelect } from "@/features/ticket/components/ticket-sort-select";
import Placeholder from "@/components/placeholder";
import { TicketSearchInput } from "@/features/ticket/components/ticket-search-input";
import { TicketPagination } from "@/features/ticket/components/ticket-pagination";
type TicketListProps = {
  userId?: string;
  searchParams: ParsedSearchParams;
};

export default async function TicketList({
  userId,
  searchParams,
}: TicketListProps) {
  const { list: tickets, metadata: ticketMetadata } = await getTickets(
    userId,
    searchParams,
  );
  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
      <div className="w-full max-w-[420px] flex gap-x-2">
        <TicketSearchInput placeholder="Search tickets..." />
        <TicketSortSelect
          /*   defaultValue="newest" */
          options={[
            {
              label: "Newest",
              sortKey: "createdAt",
              sortValue: "desc",
            },

            {
              label: "Oldest",
              sortKey: "createdAt",
              sortValue: "asc",
            },
            {
              label: "Bounty",
              sortKey: "bounty",
              sortValue: "desc",
            },
            /*    
            Note: we could technically do the following:
        {
              label: "Title",
              sortKey: "title",
              sortValue: "asc"
            } 
              VERY IMPORTANT:You have to realize that sortKey is a database column, and the sorting will be applied based on the values in that column. So you can't just put any arbitrary string as sortKey; it has to correspond to an actual column in your database.
              after all this is what the code looks like in getTickets():
              
                  orderBy: {
                          [searchParams.sortKey]: searchParams.sortValue,
                          },

               Make sense?
            */
          ]}
        />
      </div>

      {/* Note: this error comes from the missing prop isDetail. However, the page compiles just fine. If the prop is missing, the default value of isDetail will be undefined which will be a falsy value, even though it is not a default value in the TicketItem arguement (function TicketItem({ ticket, isDetail }: TicketItemProps)). As you can see, you don't even need "isDetail = false" */}
      {tickets.length ? (
        tickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} isDetail={false} />
        ))
      ) : (
        <Placeholder label="No tickets found." />
      )}

      <div className="w-full max-w-[420px]">
        <TicketPagination paginatedTicketMetadata={ticketMetadata} />
      </div>
    </div>
  );
}
