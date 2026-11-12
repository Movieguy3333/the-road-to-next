"use client";
import Placeholder from "@/components/placeholder";

export default function Error({ error }: { error: Error }) {
  return (
    // Note: This error also applies to children components. The error will bubble up to the nearest error.tsx file.
    <div>
      {" "}
      <Placeholder label={error.message || "something went wrong"} />
    </div>
  );
}
