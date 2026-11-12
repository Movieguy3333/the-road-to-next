"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { LucideLoaderCircle } from "lucide-react";
import { cloneElement } from "react";

type SubmitButtonProps = {
  label?: string;
  icon?: React.ReactElement;
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
};
export default function SubmitButton({
  label,
  icon,
  variant,
  size,
}: SubmitButtonProps) {
  // Note: this works because this component is within the form, so it knows about the form status. This is a great way to keep track of the state of the form and show the appropriate loading indicators. much more declarative than using the useTransition hook.
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} variant={variant} size={size}>
      {pending && (
        <LucideLoaderCircle
          className={`animate-spin h-4 w-4 ${!label && "mr-2"}`}
        />
      )}
      {label}
      {pending ? null : icon ? (
        <span className={!label ? "ml-2" : ""}>
          {cloneElement(icon, {
            // @ts-expect-error: Note: You may encounter a type error: No overload matches this call for cloneElement. This is related to React changing the React.ReactElement type from any to unknown.
            className: "h-4 w-4",
          })}
        </span>
      ) : null}
    </Button>
  );
}
