import type { CommentClient } from "../types";
import Form from "@/components/form/form";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";

import FieldError from "@/components/form/field-error";

import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { editComment } from "../actions/edit-comment";

type CommentEditFormProps = {
  comment: CommentClient;
};

export function CommentEditForm({ comment }: CommentEditFormProps) {
  const [actionState, action] = useActionState(
    editComment.bind(null, comment),
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
        defaultValue={comment.content}
      />

      <FieldError actionState={actionState} name="content" />

      <SubmitButton label={"Save Changes"} />
    </Form>
  );
}
