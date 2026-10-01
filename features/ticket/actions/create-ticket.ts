// Note: file not needed because of upsert form and actions, but for posterity sake, I am leaving it here.

/* "use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ticketsPath } from "@/paths";
export default async function createTicket(formData: FormData) {
  const data = {
    title: formData.get("title"),
    content: formData.get("content"),
  };
  await prisma.ticket.create({
    data: {
      title: data.title as string,
      content: data.content as string,
    },
  });

  // Note: Once again, just like in delete-ticket.ts, we need to revalidate the path of the tickets page, so that the new ticket will be displayed on the tickets page in real-time.
  revalidatePath(ticketsPath());
}
 */
