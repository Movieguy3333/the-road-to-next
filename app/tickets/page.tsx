import { Suspense } from "react";
import Heading from "@/components/heading";

import Spinner from "@/components/spinner";

import TicketList from "@/features/ticket/components/ticket-list";
import { ErrorBoundary } from "react-error-boundary";
import Placeholder from "@/components/placeholder";

// Note: this is async function component. "use client" is equivalent to html script tag. It is used to load the component on the client side. The server side is not affected by this.
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
