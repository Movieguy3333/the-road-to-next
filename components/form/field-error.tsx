import { ActionState } from "./utils/to-action-state";

type FieldErrorProps = {
  actionState: ActionState;
  name: string;
};

export default function FieldError({ actionState, name }: FieldErrorProps) {
  //   Note: remember how in to-to-action-state.ts fieldErrors could be undefined?  That is why is an optional chaining
  const message = actionState.fieldErrors?.[name]?.[0];
  if (!message) {
    return null;
  }

  return <span className="text-red-500 text-xs">{message}</span>;
}
