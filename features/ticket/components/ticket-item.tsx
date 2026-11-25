// Note: We did a lot of work to turn this component into a client component for demonstration purposes.

// Note: Console logs appear on the server terminal and the browser console. This is because client components are server-side rendered but they also get re-rendered on the client side as part of the hydration step so that javascript get attached to our client components for interactivity and stateful values.
import type { CommentClient } from "@/features/comments/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import clsx from "clsx";
import Link from "next/link";
import { ticketEditPath } from "@/paths";

// Note: very interesting import. Ticket is imported from the @prisma/client package. This means that the Ticket type is defined in the Prisma Client library and can be used in the application. This is a great way to share types between the client and server.
import { ticketPath } from "@/paths";
import { Prisma } from "@prisma/client";

import { Comments } from "@/features/comments/components/comments";
import { TICKET_ICONS } from "@/features/ticket/constants";
import {
  LucideSquareArrowOutUpRight,
  LucidePencil,
  LucideMoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toCurrencyFromCents } from "@/utils/currency";
import TicketMoreMenu from "./ticket-more-menu";

type TicketItemProps = {
  /* Note: It's a type that says: "a Ticket, plus its related User attached."

Normally a Ticket from Prisma only has its own columns (id, title, etc.) — no user field, because relations aren't loaded unless you ask. Since this component uses ticket.user somewhere, the prop type needs to reflect that the query fetched the user too.

So instead of writing user: User by hand, you tell Prisma "give me the type for a Ticket query that includes user" — and it computes the correct shape for you. If the query ever changes, this type updates automatically to match.
*/
  ticket: Prisma.TicketGetPayload<{
    include: {
      user: {
        select: {
          username: true;
        };
      };
    };
  }> & { isOwner: boolean };
  isDetail: boolean;
  comments?: React.ReactNode;
};

function TicketItem({ ticket, isDetail, comments }: TicketItemProps) {
  // Note: you may be wondering if we introduced a performance issue by checking the user in the TicketItem component. The answer is no, because getAuth() is cached. So when all these ticketItems are rendered, only one ticket item will perform getAuth() and the rest will use the cached value. This is a great way to keep your application performant. using cache dedupes all the requests made within one render pass.
  /*   const { user } = await getAuth();
  const isTicketOwner = isOwner(user, ticket); */
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

  const editButton = ticket.isOwner ? (
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
  ) : null;

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

  const moreMenu = ticket.isOwner ? (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical className="h-5 w-5" />
        </Button>
      }
    />
  ) : null;
  return (
    <div // Note: Another way to conditional styling
      className={clsx("w-full flex flex-col gap-y-8 ", {
        "max-w-[580px]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
      <div className="flex gap-x-2">
        <Card className="w-full flex gap-x-4">
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
              Deadline: {ticket.deadline} by {ticket.user.username}
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
      {/*   Note: don't need to conditionally render comments based on isDetail here because
      we are passing the comments as optional. Just depends on how we use TicketItem. */}
      {comments}
    </div>
  );
}

export default TicketItem;
