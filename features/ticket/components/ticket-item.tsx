// Note: this TicketItem component can be both a client and server component depending on the parent component. TicketItem is used in two files, /Users/meedo/Desktop/Road-To-Next/the-road-to-next/app/tickets/[ticketId]/page.tsx and /Users/meedo/Desktop/Road-To-Next/the-road-to-next/app/tickets/page.tsx. on the first one, it is a client component and on the second one, it is a server component.

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import clsx from "clsx";
import Link from "next/link";
import { ticketPath } from "@/paths";
import { Ticket } from "../types";

type TicketItemProps = {
  ticket: Ticket;
  isDetail: boolean;
};
import { TICKET_ICONS } from "@/features/ticket/constants";
import { LucideSquareArrowOutUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function TicketItem({ ticket, isDetail }: TicketItemProps) {
  /*   const detailButton = (
    // Note: asChild basically means "ignore me as a wrapper and just render my child". This is useful when you want to use a component that expects a certain type of child (like a button) but you want to use a different component (like a Link) instead. In this case, we are using the Button component as a wrapper for the Link component, but we want the Button to be ignored and just render the Link.
    <Button variant="outline" size="icon" className="h-10 w-10 p-0">
      <Link href={ticketPath(ticket.id)}>
        <LucideSquareArrowOutUpRight className="h-5 w-5" />
      </Link>
    </Button>
  ); */
  const detailButton = (
    <Button
      variant="outline"
      size="icon"
      className="h-10 w-10 p-0"
      // Note: Pass the Link to the render prop instead of using asChild
      render={<Link href={ticketPath(ticket.id)} />}
      nativeButton={false}
    >
      <LucideSquareArrowOutUpRight className="h-5 w-5" />
    </Button>
  );
  return (
    <div
      // Note: Another way to conditional styling
      className={clsx("w-full flex gap-x-1 ", {
        "max-w-[580px]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-x-2">
            <span>{TICKET_ICONS[ticket.status]}</span>
            {/* Note:
              The "truncate" class is used to truncate the text if it overflows the container. This is useful for displaying long titles or content without breaking the layout.
              */}
            <span className="truncate ">{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Note:
              The "clamp-3" class is used to limit the number of lines of text to 3. This is useful for displaying long content without breaking the layout. It uses the CSS property "line-clamp" which is a part of the CSS Overflow Module Level 4 specification. It is not supported in all browsers, but it is supported in most modern browsers.
              */}
          <span
            className={clsx("line whitespace-break-spaces", {
              "line-clamp-3": !isDetail,
            })}
          >
            {ticket.content}
          </span>
        </CardContent>
      </Card>
      {isDetail ? null : (
        <div className="flex flex-col gap-y-1">{detailButton}</div>
      )}
    </div>
  );
}

export default TicketItem;
