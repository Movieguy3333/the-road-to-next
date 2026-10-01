import { useEffect, useRef } from "react";
import { ActionState } from "../utils/to-action-state";

type OnArgs = {
  actionState: ActionState;
};

type UseActionFeedbackOptions = {
  onSuccess?: (onArgs: OnArgs) => void;
  onError?: (onArgs: OnArgs) => void;
};

function useActionFeedback(
  actionState: ActionState,
  options: UseActionFeedbackOptions,
) {
  const prevTimestamp = useRef(actionState.timestamp);
  const isUpdate = prevTimestamp.current !== actionState.timestamp;
  useEffect(() => {
    if (!isUpdate) {
      return;
    }
    if (actionState.status === "SUCCESS") {
      if (options.onSuccess) {
        options.onSuccess({ actionState });
      }
      /* Note: This is a neat way to handle the above, I like the traditional way though : if (options.onSuccess) { options.onSuccess();}
      options.onSuccess?.();
      */
    }
    if (actionState.status === "ERROR") {
      if (options.onError) {
        options.onError({ actionState });
      }
    }

    prevTimestamp.current = actionState.timestamp;
  }, [actionState, options, isUpdate]);
}
export default useActionFeedback;
