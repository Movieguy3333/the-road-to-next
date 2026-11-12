"use client";
import { Pagination } from "@/components/pagination";
import {
  paginationOptions,
  paginationParser,
  searchParser,
} from "../search-params";
import { useQueryStates, useQueryState } from "nuqs";
import { useEffect, useRef } from "react";

type TicketPaginationProps = {
  paginatedTicketMetadata: {
    count: number;
    hasNextPage: boolean;
  };
};

function TicketPagination({ paginatedTicketMetadata }: TicketPaginationProps) {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions,
  );

  /* Note: 
  This code resets the page to the first page (page: 0) whenever the search term changes.

Say you're on page 3 of the tickets and you type a search that only matches 2 tickets. Without a reset, the URL still says ?page=3, so the server skips 3 * size rows and you get an empty list. Going back to page 0 on each new search shows the first page of the new results.

Basically, once you type in a search, the array of results change and pages that used to have items no longer have them, reseting page means you start at the beginning of the new results.

  */
  const [search] = useQueryState("search", searchParser);

  const prevSearch = useRef(search);

  useEffect(() => {
    if (prevSearch.current === search) return;
    setPagination({ ...pagination, page: 0 });
    prevSearch.current = search;
  }, [search, setPagination, pagination]);

  return (
    <Pagination
      pagination={pagination}
      handleSetPagination={setPagination}
      paginatedMetadata={paginatedTicketMetadata}
    />
  );
}

export { TicketPagination };
