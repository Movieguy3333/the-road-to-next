import Placeholder from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { ticketsPath } from "@/paths";

import Link from "next/link";

// Note: Self-explanatory. This is a component will be rendered when the ticketId param is not found.

export default function NotFound() {
  return (
    <Placeholder
      label="Ticket not found"
      button={
        <Button variant="outline">
          <Link href={ticketsPath()}>Back to Tickets</Link>
        </Button>
      }
    />
  );
}
