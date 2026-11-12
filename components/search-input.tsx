import { Input } from "@/components/ui/input";

import { useDebouncedCallback } from "use-debounce";

type SearchInputProps = {
  placeholder: string;
  handleSetSearch: (value: string) => void;
  value: string;
};

export function SearchInput({
  placeholder,
  handleSetSearch,
  value,
}: SearchInputProps) {
  /*  Note: the dark ages in how we handled search input before using useQueryState from nuqs. We had to manually manipulate the URL search parameters.
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter(); */

  // Note: useDebouncedCallback is so you don't spam the database request every keystroke. what it does is debounce the function and only call it after a short delay.
  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      /*  Note: We have a much better way of doing this with useQueryState from nuqs. It handles the URL search parameter for us, so we don't need to manually manipulate the URL. For posterity, we will keep the old code commented out. 
       const value = e.target.value;

      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
      replace(`${pathname}?${params.toString()}`, { scroll: false }); 
      */

      /* Note: searchParams — a snapshot of the URL's query string right now, handed to you by Next.js. You can only read it (.get(), .has(), .toString()). Think of it like a photo of the current query string — you can look at it, but you can't draw on it.

params — your own copy of that photo, made with new URLSearchParams(searchParams). Because it's a plain URLSearchParams object (not Next's special read-only one), you can edit it — add a key (.set()), remove one (.delete()). Think of it like photocopying that photo so you can scribble on the copy without touching the original.

So the flow is: read the current state (searchParams) → copy it into something editable (params) → edit the copy → turn the copy into a string and hand it to replace() to actually change the URL.
*/
      handleSetSearch(e.target.value);
    },
    250,
  );
  return (
    <Input
      placeholder={placeholder}
      onChange={handleSearch}
      defaultValue={value}
      /* Note: search input's default value is taken from the URL's search parameter 
      defaultValue={searchParams.get("search") ?? ""} 
      */
    />
  );
}
