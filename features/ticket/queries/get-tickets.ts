import { prisma } from "@/lib/prisma";

async function getTickets() {
  return await prisma.ticket.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default getTickets;
