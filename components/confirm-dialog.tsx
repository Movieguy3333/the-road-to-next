import { ActionState } from "./form/utils/to-action-state";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import SubmitButton from "./form/submit-button";
import Form from "./form/form";
import { useActionState } from "react";
import { EMPTY_ACTION_STATE } from "./form/utils/to-action-state";

type ConfirmDialogProps = {
  title?: string;
  description?: string;
  action: () => Promise<ActionState>;
  trigger: React.ReactElement;
};

function ConfirmDialog({
  action,
  trigger,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. Make sure you understand the consequences",
}: ConfirmDialogProps) {
  const [actionState, formAction] = useActionState(action, EMPTY_ACTION_STATE);

  function handleSuccess() {}
  return (
    <AlertDialog>
      <AlertDialogTrigger render={trigger}></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            nativeButton={false}
            render={
              <Form
                action={formAction}
                actionState={actionState}
                onSuccess={handleSuccess}
              >
                <SubmitButton label="Confirm" />
              </Form>
            }
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export { ConfirmDialog };
