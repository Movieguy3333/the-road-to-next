import { format } from "date-fns";

import { Card } from "@/components/ui/card";
import type { CommentClient } from "../types";

/* type CommentItemProps = {
  comment: Prisma.CommentGetPayload<{
    include: {
      user: true;
    };
  }>;
}; */

/* type CommentItemProps = {
  comment: Comment & {
    user: {
      username: string;
    };
  }
}; */
type CommentItemProps = {
  comment: CommentClient;
  buttons?: React.ReactNode[];
};
// comment.user is now { username: string } | null

export function CommentItem({ comment, buttons }: CommentItemProps) {
  return (
    <div className="flex gap-2">
      <Card className="p-4 flex-1 gap-y-1 flex-col flex max-w-[364px]">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {comment.user?.username ?? "Deleted User"}
          </p>
          <p className="text-sm text-muted-foreground">
            {format(comment.createdAt, "yyyy-MM-dd, HH:mm")}
          </p>
        </div>

        <p className="whitespace-pre-line">{comment.content}</p>
        {/* Note: this white-space: normal is the default, but we are using pre-line to preserve line breaks. */}
      </Card>
      <div className="flex flex-col gap-y-2">
        {buttons?.map((button, index) => (
          <div key={index}>{button}</div>
        ))}
      </div>
    </div>
  );
}
