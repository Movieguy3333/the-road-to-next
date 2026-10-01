// Note: file not needed because of upsert form and actions, but for posterity sake, I am leaving it here.
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { Ticket } from "@prisma/client";
import updateTicket from "../actions/update-ticket";
type TicketUpdateFormProps = {
  ticket: Ticket;
};

export default function TicketUpdateForm({ ticket }: TicketUpdateFormProps) {
  return (
    // Note: you cound also use the bind method and pass ticked.id just like deleteTicket.bind(null, ticket.id). But I like this invisible id approach better.
    <form action={updateTicket} className="flex flex-col gap-y-2">
      <Input type="hidden" name="id" defaultValue={ticket.id} />
      <Label htmlFor="title">Title</Label>
      <Input type="text" id="title" name="title" defaultValue={ticket.title} />
      <Label htmlFor="content">Content</Label>
      <Textarea id="content" name="content" defaultValue={ticket.content} />
      <Button type="submit">Update</Button>
    </form>
  );
}
