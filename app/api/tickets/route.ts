import getTickets from "@/features/ticket/queries/get-tickets";
import { searchParamsCache } from "@/features/ticket/search-params";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  new URLSearchParams();

  console.log(searchParams);

  /* Note:
  Object.fromEntries takes any iterable that yields [key, value] pairs and builds a plain object from them. URLSearchParams is that kind of iterable.
  */
  const untypedSearchParams = Object.fromEntries(searchParams);
  console.log(untypedSearchParams);

  const typedSearchParams = searchParamsCache.parse(untypedSearchParams);
  console.log(typedSearchParams);

  const { list, metadata } = await getTickets(undefined, typedSearchParams);

  /* 
 Note: What a Response object looks like (main properties):

{
  status: 200,              // HTTP status code
  statusText: "",           // e.g. "OK"
  ok: true,                 // true if status is 200–299
  headers: Headers {        // key/value map
    "content-type": "application/json"
  },
  body: ReadableStream,     // the content that is sealed like an envelope until read. you read it with .json() or .text() methods.
  bodyUsed: false,          // true once the body has been read
  redirected: false,
  url: ""
} */
  return Response.json({ list, metadata }); // Note: returns a Response object with JSON content in the body.
}
