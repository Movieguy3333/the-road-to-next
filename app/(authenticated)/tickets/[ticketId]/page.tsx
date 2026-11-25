import { notFound } from "next/navigation";

import TicketItem from "@/features/ticket/components/ticket-item";

import getTicket from "@/features/ticket/queries/get-ticket";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { homePath } from "@/paths";
import { Separator } from "@/components/ui/separator";
import { getComments } from "@/features/comments/queries/get-comments";
import { Comments } from "@/features/comments/components/comments";

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
  /*   const comments = await getComments(ticketId);

  const ticket = await getTicket(ticketId); */

  // Note: We are fetching the ticket and comments concurrently using Promise.all for better performance.
  const ticketPromise = getTicket(ticketId);
  const commentsPromise = getComments(ticketId);

  const [ticket, comments] = await Promise.all([
    ticketPromise,
    commentsPromise,
  ]);

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
        <TicketItem
          ticket={ticket}
          isDetail
          //  comments={comments}

          // Note: VERT IMPORTANT. By using this Client-Server composition pattern, we can turn children of client components into server components. This was a neat trick we did to comments. Basically we want the comments to be a server components instead of a client component. Previously, <Comments/> was a client components since it was a child to TicketItem which is a client component itself. Therefore, we bubbled it up to a server components (this page component) to render it as a server component.
          comments={<Comments ticketId={ticketId} comments={comments} />}
        />
      </div>
    </div>
  );
}
