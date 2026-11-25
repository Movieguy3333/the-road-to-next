"use client";

import { Button } from "@/components/ui/button";
import { LucideTrash } from "lucide-react";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { deleteComment } from "../actions/delete-comment";

/* import { LucideTrash } from "lucide-react";
import { useConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { deleteComment } from "../actions/delete-comment";
 */
type CommentDeleteButtonProps = {
  commentId: string;
};

const CommentDeleteButton = ({ commentId }: CommentDeleteButtonProps) => {
  /*   const [deleteButton, deleteDialog] = useConfirmDialog({
            action: deleteComment.bind(null, id),
            trigger: (
            <Button variant="outline" size="icon">
                <LucideTrash className="w-4 h-4" />
            </Button>
            ),
        }); */

  return (
    <ConfirmDialog
      action={deleteComment.bind(null, commentId)}
      trigger={
        <Button variant="outline" size="icon" type="submit">
          <LucideTrash className=" h-4 w-4" />
        </Button>
      }
    />
  );
};

export { CommentDeleteButton };
