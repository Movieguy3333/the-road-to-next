"use server";

import { prisma } from "@/lib/prisma";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";

export async function getComments(ticketId: string) {
  const { user } = await getAuth();
  const comments = await prisma.comment.findMany({
    where: {
      ticketId: ticketId,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return comments.map((comment) => ({
    ...comment,
    isOwner: isOwner(user, comment),
  }));
}
