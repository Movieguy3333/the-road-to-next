import type { Prisma } from "@prisma/client";

export type CommentClient = Prisma.CommentGetPayload<{
  include: { user: { select: { username: true } } };
}> & { isOwner: boolean };
