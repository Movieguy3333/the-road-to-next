// Note: this Ticket
import type { Ticket } from "@prisma/client";
import { prisma } from "@/lib/prisma";
export default async function getTicket(
  ticketId: string,
): Promise<Ticket | null> {
  return await prisma.ticket.findUnique({
    /* Note:

    Here's the classic scenario of request memoization: a layout and a page both need the same piece of data during one request.

Example: fetch (auto-deduped by Next.js)

typescript
// lib/data.ts
export async function getUser(id: string) {
  console.log('fetching user', id) // this only logs ONCE per request
  const res = await fetch(`https://api.example.com/users/${id}`)
  return res.json()
}
typescript
// app/dashboard/layout.tsx
import { getUser } from '@/lib/data'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser('123') // call #1
  return (
    <div>
      <Sidebar name={user.name} />
      {children}
    </div>
  )
}
typescript
// app/dashboard/page.tsx
import { getUser } from '@/lib/data'

export default async function DashboardPage() {
  const user = await getUser('123') // call #2 — same URL, same request lifecycle
  return <h1>Welcome back, {user.name}</h1>
}

Both the layout and the page call getUser('123') while rendering the same request. Even though fetch is called twice from two separate components, only one actual network request goes out — Next.js patches fetch so the second call just reuses the in-flight/resolved result from the first. No config needed; this is automatic for fetch in Server Components.

Example: a DB/ORM call (needs manual cache())

Request memoization only auto-applies to fetch. For anything else — Prisma, Drizzle, an SDK that doesn't use fetch under the hood — you have to opt in with React's cache:

typescript
// lib/data.ts
import { cache } from 'react'
import { db } from '@/lib/db'

export const getUser = cache(async (id: string) => {
  console.log('querying db for user', id) // only logs once per request
  return db.user.findUnique({ where: { id } })
})

Same layout/page setup as above, just importing this version instead — now the duplicate DB query gets deduped too.

A couple of things worth keeping in mind:

Scope is one render pass. It doesn't survive across separate requests — that persistence is the Data Cache's job (revalidate/force-*), not this.
Cache key is argument equality. getUser('123') twice hits the memo; getUser({ id: '123' }) twice with a new object literal each time won't, since it's a different reference. Stick to primitives or a stable reference.
    */
    where: {
      id: ticketId,
    },
  });
}
