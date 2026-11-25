"use client";
import Form from "@/components/form/form";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";

import FieldError from "@/components/form/field-error";

import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";

import { createComment } from "../actions/create-comment";

type CommentCreateFormProps = {
  ticketId: string;
};

export default function CommentCreateForm({
  ticketId,
}: CommentCreateFormProps) {
  /*   const [isPending, startTransition] = useTransition(); */

  /*   function upsertTicketAction(formData: FormData) {
    startTransition(async () => {
      // Note: formData is the second arguement.
      await upsertTicket.bind(null, ticket?.id)(formData);
    });
  } */

  // Note: Whatever the function (upsertTicket in this case) returns, will be assigned to actionState.message. This is a convenient way to pass data back to the component. In this case, we are passing a string to the actionState.message.
  const [actionState, action] = useActionState(
    createComment.bind(null, ticketId),
    EMPTY_ACTION_STATE,
  );

  return (
    // Note: you cound also use the bind method and pass ticked.id just like deleteTicket.bind(null, ticket.id). But I like this invisible id approach better.
    <Form action={action} actionState={actionState}>
      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        placeholder="Write your comment here..."
      />

      <FieldError actionState={actionState} name="content" />

      <SubmitButton label={"Comment"} />
    </Form>
  );
}
