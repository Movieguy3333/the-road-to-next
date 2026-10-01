"use server";

// Note: file not needed because of upsert form and actions, but for posterity sake, I am leaving it here. We also don't use the bind method here.

import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export default async function updateTicket(formData: FormData) {
  const data = {
    id: formData.get("id"),
    title: formData.get("title"),
    content: formData.get("content"),
  };

  await prisma.ticket.update({
    where: {
      id: data.id as string,
    },
    data: {
      title: data.title as string,
      content: data.content as string,
    },
  });

  revalidatePath(ticketsPath());
  redirect(ticketsPath());
}
