import { Suspense } from "react";
import Heading from "@/components/heading";

import Spinner from "@/components/spinner";

import TicketList from "@/features/ticket/components/ticket-list";
import { ErrorBoundary } from "react-error-boundary";
import Placeholder from "@/components/placeholder";

import CardCompact from "@/components/card-compact";
import TicketUpsertForm from "@/features/ticket/components/ticket-upsert-form";

/* Note: this is a dynamic route. It means that the page will be rendered on the server and then sent to the client. This is useful for data that is not static, like a list of tickets. The page will be rendered on the server, and the data will be sent to the client. The client will then render the page with the data. This is different from a static route, where the page is rendered on the server and sent to the client, but the data is already available on the client. This issue only shows up in build mode, not in development mode. This is not a great solution, so we will comment it out.

export const dynamic = "force-dynamic";
*/
// Note: this is async function component. "use client" is equivalent to html script tag. It is used to load the component on the client side. The server side is not affected by this.
/* Note: this is a time-based solution. the page is rendered every 5 seconds. This won't give you the latest data, but it will give you a fresh data every 5 seconds. Good for news pages, blog listings, etc. This is not a great solution, so we will comment it out.
export const revalidate = 5;
*/

export default function TicketsPage() {
  // Note: server-side rendering is not the same as a server component.
  /*   useEffect(() => {
    async function fetchTickets() {
      const result: Ticket[] = await getTickets();
      setTickets(result);
    }

    fetchTickets();
  }, []); */
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading description="All your tickets in one place." title="Tickets" />

      <CardCompact
        className="w-full max-w-[420px] self-center"
        title="Create a new ticket"
        description="Add a new ticket to your list"
        content={<TicketUpsertForm />}
      />
      {/*   Note: Suspense lets you suspend rendering that is asynchronous to later time. Before, the entire page gets held up while the data is fetched. Now, the page is rendered, but the data is fetched after the rest of the page loads. setTimeout is used to simulate a delay in fetching the data. */}
      <ErrorBoundary fallback={<Placeholder label="Something went wrong" />}>
        {/* Note: ErrorBoundary is an additional error boundary, on top of error.tsx. If something goes wrong in the Suspense component that houses TicketList, it will bubble up to the ErrorBoundary component, befor relying on error.tsx */}
        <Suspense fallback={<Spinner />}>
          <TicketList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
