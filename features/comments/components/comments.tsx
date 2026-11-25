"use client";

import type { CommentClient } from "@/features/comments/types";

import CommentCreateForm from "./comment-create-form";
import { CommentItem } from "./comment-item";
import CardCompact from "@/components/card-compact";
import { CommentDeleteButton } from "./comment-delete-button";
import { CommentEditButton } from "./comment-edit-button";
import { Button } from "@/components/ui/button";
import { getComments } from "../queries/get-comments";

type CommentsProps = {
  ticketId: string;
  comments?: CommentClient[];
};

export function Comments({ ticketId, comments = [] }: CommentsProps) {
  async function handleMore() {
    const result = await getComments(ticketId);
  }

  return (
    <>
      <CardCompact
        className=""
        title="Add a Comment"
        description="Add a new comment to this ticket"
        content={<CommentCreateForm ticketId={ticketId} />}
      />
      <div className="flex flex-col gap-y-4 ml-8 mt-4">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={
              comment.isOwner
                ? [
                    <CommentDeleteButton key="0" commentId={comment.id} />,
                    <CommentEditButton key="1" comment={comment} />,
                  ]
                : []
            }
          />
        ))}
      </div>

      <div className="flex flex-col justify-center ml-8">
        <Button onClick={handleMore} variant="ghost">
          More
        </Button>
      </div>
    </>
  );
}
