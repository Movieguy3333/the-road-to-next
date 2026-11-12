"use client";

import { SortSelect, SortSelectOption } from "@/components/sort-select";
import { sortOptions, sortParser } from "../search-params";
import { useQueryStates } from "nuqs";

type TicketSortSelectProps = {
  options: SortSelectOption[];
};

function TicketSortSelect({ options }: TicketSortSelectProps) {
  /* Note: we changed sort from a string to an object with sortKey and sortValue 
   const [sort, setSort] = useQueryState("sort", sortParser);
    */

  const [sort, setSort] = useQueryStates(sortParser, sortOptions); // Note: useQueryStates takes in a parser and an optional arguement of options.

  return <SortSelect options={options} value={sort} handleSetSort={setSort} />;
}

export { TicketSortSelect };
