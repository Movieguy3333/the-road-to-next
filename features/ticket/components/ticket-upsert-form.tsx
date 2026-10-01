"use client";
import Form from "@/components/form/form";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useRef } from "react";
import useActionFeedback from "@/components/form/hooks/use-action-feedback";
import FieldError from "@/components/form/field-error";

import { Ticket } from "@prisma/client";
import upsertTicket from "../actions/upsert-ticket";
import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { fromCent } from "@/utils/currency";
import {
  DatePicker,
  ImperativeHandleFromDatePicker,
} from "@/components/date-picker";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

export default function TicketUpsertForm({ ticket }: TicketUpsertFormProps) {
  /*   const [isPending, startTransition] = useTransition(); */

  /*   function upsertTicketAction(formData: FormData) {
    startTransition(async () => {
      // Note: formData is the second arguement.
      await upsertTicket.bind(null, ticket?.id)(formData);
    });
  } */

  // Note: Whatever the function (upsertTicket in this case) returns, will be assigned to actionState.message. This is a convenient way to pass data back to the component. In this case, we are passing a string to the actionState.message.
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE,
  );

  const datePickerImperativeRef = useRef<ImperativeHandleFromDatePicker>(null);

  function handleSuccess() {
    // Note: this function is to reset the date picker when the form is submitted.
    datePickerImperativeRef.current?.reset();
  }

  return (
    // Note: you cound also use the bind method and pass ticked.id just like deleteTicket.bind(null, ticket.id). But I like this invisible id approach better.
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
      {/* Note: this hidden input is not needed because we are not bundling ticket.id to the formData, instead we are using the bind method. But for posterity sake, I am leaving it here.
      <Input type="hidden" name="id" defaultValue={ticket?.id} /> 
      */}
      <Label htmlFor="title">Title</Label>
      <Input
        type="text"
        id="title"
        name="title"
        defaultValue={
          (actionState.payload?.get("title") as string) ?? ticket?.title
        }
      />
      {/* Note: remember how in to-to-action-state.ts fieldErrors could be undefined?  That is why is an optional chaining */}
      <FieldError actionState={actionState} name="title" />
      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={
          (actionState.payload?.get("content") as string) ?? ticket?.content
        }
      />{" "}
      <div className="flex gap-x-2 mb-1">
        <div className="w-1/2">
          <Label htmlFor="deadline">Deadline</Label>
          {/*    <Input
            type="date"
            id="deadline"
            name="deadline"
            defaultValue={
              (actionState.payload?.get("deadline") as string) ??
              ticket?.deadline
            }
          /> */}

          <DatePicker
            /*  Note: 
         We want to reset the date picker without lifting the date state. key={actionState.timestamp} is a neat little trick that resets, beacuse when the key changes, the component (DatePicker) will mount and unmount
            key={actionState.timestamp}
            However, there is a better way.
            */
            id="deadline"
            name="deadline"
            defaultValue={
              (actionState.payload?.get("deadline") as string) ??
              ticket?.deadline
            }
            imperativeHandleRef={datePickerImperativeRef}
          />

          <FieldError actionState={actionState} name="deadline" />
        </div>
        <div className="w-1/2">
          <Label htmlFor="bounty">Bounty ($)</Label>
          <Input
            type="number"
            id="bounty"
            name="bounty"
            step=".01"
            defaultValue={
              (actionState.payload?.get("bounty") as string) ??
              (ticket?.bounty ? fromCent(ticket?.bounty) : "")

              /* Note: the paranthesis between  (ticket?.bounty ? fromCent(ticket?.bounty) : "") is extremely important to prevent an error. It very advanced so here is an AI explanation
               Without the extra parens, ?? grabs tighter than ?:, so this:


A ?? ticket?.bounty ? fromCent(ticket?.bounty) : ""
actually means:


(A ?? ticket?.bounty) ? fromCent(ticket?.bounty) : ""
The ? is now testing A ?? ticket?.bounty, not ticket?.bounty alone. TypeScript only narrows ticket?.bounty from number | undefined to number when it's the thing directly being tested. Since it's buried inside a bigger ?? expression here, it stays number | undefined — and fromCent wants a plain number, so it errors.

Wrapping it:


A ?? (ticket?.bounty ? fromCent(ticket?.bounty) : "")
makes ticket?.bounty the condition by itself again, so TypeScript narrows it to number inside the fromCent(...) branch, and the error goes away.

In short: the parens don't change the value passed — they change what TypeScript is looking at when deciding whether ticket?.bounty is "definitely a number" at that point.
              
              
              */
            }
          />
          <FieldError actionState={actionState} name="bounty" />
        </div>
      </div>
      <SubmitButton label={ticket ? "Edit" : "Create"} />
    </Form>
  );
}
