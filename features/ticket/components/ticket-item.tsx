// Note: If this file doesn't have "use client", this TicketItem component can be both a client and server component depending on the parent component. TicketItem is used in two files, /Users/meedo/Desktop/Road-To-Next/the-road-to-next/app/tickets/[ticketId]/page.tsx and /Users/meedo/Desktop/Road-To-Next/the-road-to-next/app/tickets/page.tsx. on the first one, it is a client component and on the second one, it is a server component.

// Note: this needs to be a client component because of the onClick event on the delete button. The delete button is only rendered when isDetail is true, which is only the case when the parent component is /Users/meedo/Desktop/Road-To-Next/the-road-to-next/app/tickets/[ticketId]/page.tsx. This means that the delete button will only be rendered on the ticket detail page, which is a client component. Therefore, this component needs to be a client component as well. Just kidding, we don't need to make it a client component, we can just use the form action attribute to make a POST request to the server. This is a server action and will be executed on the server.

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import deleteTicket from "@/features/ticket/actions/delete-ticket";
import clsx from "clsx";
import Link from "next/link";
import { ticketEditPath } from "@/paths";

import { Ticket } from "@prisma/client";
// Note: very interesting import. Ticket is imported from the @prisma/client package. This means that the Ticket type is defined in the Prisma Client library and can be used in the application. This is a great way to share types between the client and server.
import { ticketPath } from "@/paths";

type TicketItemProps = {
  ticket: Ticket;
  isDetail: boolean;
};
import { TICKET_ICONS } from "@/features/ticket/constants";
import {
  LucideSquareArrowOutUpRight,
  LucideTrash,
  LucidePencil,
  LucideMoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toCurrencyFromCents } from "@/utils/currency";
import TicketMoreMenu from "./ticket-more-menu";
import { ConfirmDialog } from "@/components/confirm-dialog";

async function TicketItem({ ticket, isDetail }: TicketItemProps) {
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
      // Note: Pass the Link to the render prop instead of using asChild
      render={<Link prefetch={true} href={ticketPath(ticket.id)} />}
      // Note: prefetch is a prop that tells the browser to prefetch the page that the link redirects to before rendering it.
      nativeButton={false}
    >
      <LucideSquareArrowOutUpRight className="h-4 w-4" />
    </Button>
  );

  const editButton = (
    <Button
      variant="outline"
      size="icon"
      // Note: Pass the Link to the render prop instead of using asChild
      render={<Link prefetch={true} href={ticketEditPath(ticket.id)} />}
      // Note: prefetch is a prop that tells the browser to prefetch the page that the link redirects to before rendering it.
      nativeButton={false}
    >
      <LucidePencil className="h-4 w-4" />
    </Button>
  );

  /* 
  Note: Old way of doing it. make the component a client component in order to use the onClick event. This is not the best way to do it because it makes the component a client component, which means it will be rendered on the client and not on the server. This is not ideal because we want to keep the component as a server component as much as possible for performance reasons. Instead, we can use the form action attribute to make a POST request to the server. This is a server action and will be executed on the server.
   const handleDeleteTicket = async () => {
    await deleteTicket(ticket.id);
  };
  
  const deleteButton = (
    <Button variant="outline" size="icon" onClick={handleDeleteTicket}>
      <LucideTrash className="h-5 w-5" />
    </Button>
  ); */

  /*   const deleteButton = (
    // Note: New way of doing it. Instead making the component a client component in order to use the onClick event, we are using the form action attribute to make a POST request to the server. This is a server action and will be executed on the server.
    <form action={deleteTicket.bind(null, ticket.id)}>
        Note: need type="submit" to make the new way work. The button defaults to
      type="button" which is not a submit button. so the form will not be
      submitted. 
      <Button variant="outline" size="icon" type="submit">
        <LucideTrash className="h-5 w-5" />
      </Button>
    </form>
  ); */

  const moreMenu = (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical className="h-5 w-5" />
        </Button>
      }
    />
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
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            Deadline: {ticket.deadline}
          </p>
          <p className="text-sm text-muted-foreground">
            Bounty: {toCurrencyFromCents(ticket.bounty)}
          </p>
        </CardFooter>
      </Card>

      <div className="flex flex-col gap-y-1">
        {isDetail ? (
          <>
            {editButton}

            {moreMenu}
          </>
        ) : (
          <>
            {" "}
            {detailButton}
            {editButton}{" "}
          </>
        )}
      </div>
    </div>
  );
}

export default TicketItem;
