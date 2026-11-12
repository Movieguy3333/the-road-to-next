"use client";

import { SearchInput } from "@/components/search-input";
import { searchParser } from "../search-params";
import { useQueryState } from "nuqs";

type TicketSearchInputProps = {
  placeholder: string;
};
function TicketSearchInput({ placeholder }: TicketSearchInputProps) {
  const [search, setSearch] = useQueryState("search", searchParser);
  /*  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter(); */

  // Note: useDebouncedCallback is so you don't spam the database request every keystroke. what it does is debounce the function and only call it after a short delay.

  /* 
Note: This is the naive implementation of handling search with pagination. It resets the page to 0 whenever a new search is performed.
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions,
  );
 
 function handleHandleSearch(value: string) {
    setPagination({ ...pagination, page: 0 });
    setSearch(value);
  }

    <SearchInput
      placeholder={placeholder}
      value={search}
      handleSetSearch={handleHandleSearch}
    />
  */
  return (
    <SearchInput
      placeholder={placeholder}
      value={search}
      handleSetSearch={setSearch}
    />
  );
}

export { TicketSearchInput };
