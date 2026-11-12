import Heading from "@/components/heading";
import { ticketsPath } from "@/paths";
import { SearchParams } from "nuqs/server";

import Link from "next/link";
import { Suspense } from "react";
import TicketList from "@/features/ticket/components/ticket-list";
import Spinner from "@/components/spinner";
import { searchParamsCache } from "@/features/ticket/search-params";

type HomePageProps = {
  /* Note: searchParams usually has a typing of searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  we are retyping it in this file and TicketList to fit our needs.

   */
  searchParams: Promise<SearchParams>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  return (
    <div className=" flex-1 flex flex-col gap-y-8">
      <Heading
        title="All Tickets"
        description="Tickets by everyone at one place"
      />
      <Suspense fallback={<Spinner />}>
        {/*   Note: Even if we are retyping searchParams, we still must await it since it is a Promise as per Next.js documentation. */}
        <TicketList
          searchParams={await searchParamsCache.parse(searchParams)}
        />
      </Suspense>
    </div>
  );
}
