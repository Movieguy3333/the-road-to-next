/* 
Note: 
This is how you handle paths in a Next.js project. You can create a file called paths.ts and export functions that return the paths you want to use in your application. This way, you can avoid hardcoding paths throughout your codebase and make it easier to update them in the future. 
*/

export function homePath() {
  return "/";
}

export function ticketsPath() {
  return "/tickets";
}

export function ticketPath(ticketId: string) {
  return `/tickets/${ticketId}`;
}
export function ticketEditPath(ticketId: string) {
  return `/tickets/${ticketId}/edit`;
}
