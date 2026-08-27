import Heading from "@/components/heading";
import { ticketsPath } from "@/paths";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className=" flex-1 flex flex-col gap-y-8">
      <Heading description="Your home place to start" title="Home" />

      <div className="flex-1 flex flex-col items-center">
        <Link href={ticketsPath()} className="underline">
          View Tickets
        </Link>
      </div>
    </div>
  );
}
