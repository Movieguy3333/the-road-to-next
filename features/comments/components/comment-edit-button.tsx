"use client";
import { EditDialog } from "@/components/edit-dialog";
import { Button } from "@/components/ui/button";
import { LucidePencil } from "lucide-react";
import type { CommentClient } from "../types";
import { CommentEditForm } from "./comment-edit-form";

type CommentEditButtonProps = {
  comment: CommentClient;
};

function CommentEditButton({ comment }: CommentEditButtonProps) {
  /*  const editButton = (
    <EditDialog
      trigger={
        <Button variant="outline" size="icon" type="button">
          <LucidePencil className=" h-4 w-4" />
        </Button>
      }
      comment={comment}
    />
  ); */
  return (
    <EditDialog
      trigger={
        <Button variant="outline" size="icon" type="button">
          <LucidePencil className=" h-4 w-4" />
        </Button>
      }
      title="Edit Comment"
      description="Make changes to your comment here. Click save when you're done."
      form={<CommentEditForm comment={comment} />}
    />
  );
}

export { CommentEditButton };
