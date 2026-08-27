import { initialTickets } from "@/data";

async function getTickets() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return new Promise((resolve) => {
    resolve(initialTickets);
  });
}

export default getTickets;
