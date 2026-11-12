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
export function signUpPath() {
  return "/sign-up";
}
export function signInPath() {
  return "/sign-in";
}

export function passwordForgotPath() {
  return "/password-forgot";
}

export function accountProfilePath() {
  // Note: hey moron, don't forget the "/" if you do, it will default to relative path and not absolute path.
  return "/account/profile";
}
export function accountPasswordPath() {
  return "/account/password";
}
