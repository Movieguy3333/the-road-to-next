import { prisma } from "@/lib/prisma";
import { ParsedSearchParams } from "@/features/ticket/search-params";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";

// Note: userId is optional because of the home page not passing userId into TicketList
async function getTickets(
  userId: string | undefined,
  searchParams: ParsedSearchParams,
) {
  const { user } = await getAuth();
  const where = {
    // Note: when userId is undefined, this will not filter by userId.
    userId: userId,
    // Note: only add the title filter if searchParams.search is a string, not an array or undefined.

    title: {
      contains: searchParams.search,
      // Note: "as const" ensures that TypeScript treats the string literal as a specific type that is read-onlyrather than a general string. Otherwise, "where" in prisma.findMany gets a type error. "as const is used to infer the most specific type possible for the value."
      mode: "insensitive" as const,
    },
  };

  const skip = searchParams.page * searchParams.size;
  const take = searchParams.size;
  /* const tickets = await prisma.ticket.findMany({
    where,
    take,
    skip,
    orderBy: {
      //    createdAt: "desc", 
      // Note: if the sort property is undefined in the searchParams, that means the default sort order is newest.
      // Spreading an object copies its properties into the object around it:


      // { ...{ createdAt: "desc" } }  // → { createdAt: "desc" }
      // Spreading false (or null/undefined) does nothing and doesn't throw:


      // { ...false }  // → {}


      //    ...(searchParams.sort === "newest" && { createdAt: "desc" }),
      //...(searchParams.sort === "bounty" && { bounty: "desc" }), 

      [searchParams.sortKey]: searchParams.sortValue,
    },
    // Note: these include statements in here and ticket-item.tsx are there to make sure sensitive information like password is not exposed to the client.
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
 */
  /* 
  Note: not needed because we are using a transaction to get both the tickets and the count in one go.
  const count = await prisma.ticket.count({
    where,
  }); */

  // Note: Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
  const [tickets, count] = await prisma.$transaction([
    prisma.ticket.findMany({
      where,
      take,
      skip,
      orderBy: {
        [searchParams.sortKey]: searchParams.sortValue,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    }),
    prisma.ticket.count({
      where,
    }),
  ]);

  return {
    list: tickets.map((ticket) => ({
      ...ticket,
      isOwner: isOwner(user, ticket),
    })),
    metadata: {
      count,
      hasNextPage: skip + take < count,
    },
  };
}

export default getTickets;
