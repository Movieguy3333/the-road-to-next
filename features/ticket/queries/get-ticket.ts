import { initialTickets } from "@/data";
import type { Ticket } from "@/features/ticket/types";
export default async function getTicket(
  ticketId: string,
): Promise<Ticket | null> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const ticket = initialTickets.find((ticket) => ticket.id === ticketId);
  return new Promise((resolve) => {
    resolve(ticket || null);
  });
}
