/* Note: we are replacing this implementation and going with nuq instead.


// Note: both search and sort can be undefined or an array of strings because they come from the URL search parameters. an array of strings occurs when the same query parameter appears multiple times in the URL, think searching for multiple filters at once like the ygoprodeck website.
export type SearchParams = {
  search: string | string[] | undefined;
  sort: string | string[] | undefined;
};
 */

import {
  createSearchParamsCache,
  parseAsString,
  parseAsInteger,
} from "nuqs/server";

export const searchParser = parseAsString.withDefault("").withOptions({
  shallow: false,
  clearOnDefault: true, // Note: Basically search will be cleared from the URL if it matches the default value. sort will behave identically. If sort is "newest", sort string will be cleared as well.
});
/* export const sortParser = parseAsString.withDefault("newest").withOptions({
  shallow: false, // Note: this ensures the re-render of our server components on the app router when the sort parameter changes.
  clearOnDefault: true,
}); */

export const paginationParser = {
  page: parseAsInteger.withDefault(0),
  size: parseAsInteger.withDefault(5),
};
export const sortParser = {
  sortKey: parseAsString.withDefault("createdAt"),
  sortValue: parseAsString.withDefault("desc"),
};

export const sortOptions = {
  shallow: false,
  clearOnDefault: true,
};

export const paginationOptions = {
  shallow: false,
  clearOnDefault: true,
};
/* Note:
parseAsString: a nuqs parser that reads a query param as a plain string. With ?search=dragon you get "dragon".
.withDefault(""): if the param isn't in the URL (no ?search= at all), you get "" instead of null. That makes the type string rather than string | null, so you don't need null checks later.

*/

export const searchParamsCache = createSearchParamsCache({
  /* Note:
  It doesn't return a value. It returns a parser object from nuqs: a configuration that tells nuqs how to read and write one URL search param. You pass it to something like useQueryState, useQueryStates, or createSearchParamsCache, and those give you the actual value.
  
   */
  search: searchParser,
  ...sortParser,
  ...paginationParser,
});

/* Note: 

ParsedSearchParams is this: type ParsedSearchParams = Promise<{
 search: string;
 sort: string;
}>

lets dive deep in what searchParamsCache object structure is.

So searchParamsCache looks like this:
{
  parse: (searchParams) => { search: string; sort: string } | Promise<...>,
  get:   (key: "search" | "sort") => string,
  all:   () => { search: string; sort: string },
}

important to know that parse is overloaded: it can either return the parsed object directly or a Promise that resolves to the parsed object.
parse: {
  // Signature 1: pass a plain object, get a plain object back
  (searchParams: SearchParams): { search: string; sort: string };

  // Signature 2: pass a Promise, get a Promise back
  (searchParams: Promise<any>): Promise<{ search: string; sort: string }>;
};

interesting that ParseSearchParams is actually a promise, here is why:
It's a Promise because of how ReturnType handles overloaded functions. It's not something your code does on purpose.

Step by step
typeof searchParamsCache.parse gets the type of parse, which has two signatures:


(searchParams: SearchParams)  => { search: string; sort: string }           // #1
(searchParams: Promise<any>)  => Promise<{ search: string; sort: string }>  // #2
ReturnType<...> has to pick one return type, but you're not calling the function, so there are no arguments to say which signature you mean.

In that situation, TypeScript's rule is to use the last signature. That's #2, so you get:


type ParsedSearchParams = Promise<{ search: string; sort: string }>;
The author of the tutorial or code probably wanted the plain object, and this is a known gotcha with ReturnType on overloaded functions.


*/

export type ParsedSearchParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
