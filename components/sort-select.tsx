import { sortParser, sortOptions } from "@/features/ticket/search-params";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { useQueryState, useQueryStates } from "nuqs";
import { on } from "events";

export type SortSelectOption = {
  label: string;
  sortKey: string;
  sortValue: string;
};

export type SortObject = {
  sortKey: string;
  sortValue: string;
};

type SortSelectProps = {
  /*   defaultValue: string; */
  options: SortSelectOption[];
  value: SortObject;
  handleSetSort: (sort: SortObject) => void;
};

export function SortSelect({
  /*  defaultValue, */ options,
  value,
  handleSetSort,
}: SortSelectProps) {
  /* Note: we changed sort from a string to an object with sortKey and sortValue 
   const [sort, setSort] = useQueryState("sort", sortParser);
    */

  /*   Note: commented out code we don't need anymore because we are using nuqs for query state management.
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter(); */
  // Note: useDebouncedCallback is so you don't spam the database request every keystroke.
  const handleSort = (compositeKey: string | null) => {
    /* Note: this is the old way of handling sort with URLSearchParams, now replaced by nuqs 
    const params = new URLSearchParams(searchParams);
    console.log("Sort value:", value);
    console.log("defaultValue:", defaultValue);

    if (value === defaultValue) {
      params.delete("sort");
    } else if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false }); */

    /* Note: searchParams — a snapshot of the URL's query string right now, handed to you by Next.js. You can only read it (.get(), .has(), .toString()). Think of it like a photo of the current query string — you can look at it, but you can't draw on it.

params — your own copy of that photo, made with new URLSearchParams(searchParams). Because it's a plain URLSearchParams object (not Next's special read-only one), you can edit it — add a key (.set()), remove one (.delete()). Think of it like photocopying that photo so you can scribble on the copy without touching the original.

So the flow is: read the current state (searchParams) → copy it into something editable (params) → edit the copy → turn the copy into a string and hand it to replace() to actually change the URL.
*/

    /*   const sortValue = options.find(
      (option) => option.sortKey === sortKey,
    )?.sortValue; */

    const [sortKey, sortValue] = compositeKey?.split("_") ?? ["", ""];

    handleSetSort({
      sortKey: sortKey,
      sortValue: sortValue,
    });
  };

  return (
    <Select
      items={options.map((option) => ({
        label: option.label,
        value: option.sortKey + "_" + option.sortValue, // Note: think of value here as the key prop (unique identifier) when mapping over an array, except this corresponds with the keys in the <SelectItem> components. if there is a match, that option item's label will be displayed.
      }))}
      onValueChange={handleSort}
      /* Note: defaultValue is controlled by useQueryState, so we don't the need the defaultValue prop so we commented it all out */
      defaultValue={value.sortKey + "_" + value.sortValue}
    >
      <SelectTrigger className="w-full max-w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sorting</SelectLabel>
          {options.map((option) => (
            <SelectItem
              /* Note: Never heard of composite key before. We use it to create more individuality for each option by combining sortKey and sortValue into a single string. This helps us uniquely identify each option even if sortKey happens to be shared between multiple options. for example:
     {
              label: "Newest",
              sortKey: "createdAt",
              sortValue: "desc",
            },

            {
              label: "Oldest",
              sortKey: "createdAt",
              sortValue: "asc",
            },

            these two options have the same sortKey "createdAt" but different sortValues "desc" and "asc", so their composite keys "createdAt_desc" and "createdAt_asc" are unique.
              */

              key={option.sortKey + option.sortValue}
              value={option.sortKey + "_" + option.sortValue}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
