import useActionFeedback from "./hooks/use-action-feedback";
import { toast } from "sonner";
import { ActionState } from "./utils/to-action-state";

type FormProps = {
  action: (payload: FormData) => void;
  actionState: ActionState;
  children: React.ReactNode;
  onSuccess?: (actionState: ActionState) => void;
  onError?: (actionState: ActionState) => void;
};

function Form({
  action,
  actionState,
  children,
  onSuccess,
  onError,
}: FormProps) {
  // Note: useActionFeedback is a custom hook that will display a toast message when the actionState.status is "SUCCESS" or "ERROR".
  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.success(actionState.message);
      }
      if (onSuccess) {
        onSuccess(actionState);
      }
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        toast.error(actionState.message);
      }
      if (onError) {
        onError(actionState);
      }
    },
  });
  return (
    <form action={action} className="flex flex-col gap-y-2">
      {children}
    </form>
  );
}

export default Form;
