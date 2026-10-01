import { ZodError } from "zod";

export type ActionState = {
  status?: "SUCCESS" | "ERROR";
  message: string;
  payload?: FormData;
  // Note: first key is the field name, second key is the error message which can be an array of error messages. can also be undefined if there are no errors.
  fieldErrors: Record<string, string[]> | undefined;
  timestamp: number;
};

export const EMPTY_ACTION_STATE: ActionState = {
  message: "",
  fieldErrors: {},
  timestamp: Date.now(),
};

function fromErrorToActionState(
  error: unknown,
  formData?: FormData,
): ActionState {
  if (error instanceof ZodError) {
    // Note: if the error is a ZodError, it means that the form data is invalid. In this case, we are returning the ZodError message and the form data.
    return {
      status: "ERROR",
      message: "",
      fieldErrors: error.flatten().fieldErrors,
      payload: formData,
      timestamp: Date.now(),
    };
  }
  // Note: if another error instance is thrown, return an error message. eg. Database error
  else if (error instanceof Error) {
    return {
      status: "ERROR",
      message: error.message,
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now(),
    };
  }
  // Note: If not a ZodError or Error, return a generic error message.
  else {
    return {
      status: "ERROR",
      message: "An unexpected error occurred",
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now(),
    };
  }
}

// Note: toActionState is the happy path

export function toActionState(
  status: ActionState["status"],
  message: string,
): ActionState {
  return {
    status: status,
    message: message,
    fieldErrors: {},
    timestamp: Date.now(),
  };
}

export default fromErrorToActionState;
