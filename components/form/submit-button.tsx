import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { LucideLoaderCircle } from "lucide-react";

type SubmitButtonProps = {
  label: string;
};
export default function SubmitButton({ label }: SubmitButtonProps) {
  // Note: this works because this component is within the form, so it knows about the form status. This is a great way to keep track of the state of the form and show the appropriate loading indicators. much more declarative than using the useTransition hook.
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <LucideLoaderCircle className="animate-spin mr-2 h-4 w-4" />}
      {label}
    </Button>
  );
}
