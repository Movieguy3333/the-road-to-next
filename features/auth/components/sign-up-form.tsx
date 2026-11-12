"use client";

import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/features/auth/actions/sign-up";
import { useActionState } from "react";

function SignUpForm() {
  const [actionState, action] = useActionState(signUp, EMPTY_ACTION_STATE);

  /* Note: I asked AI why signUp is allowed to be used in useActionState when the signUp function doesn't return an actionState. This is the anwser it gave me:
  In sign-up.ts:72, the happy path calls redirect(ticketsPath()) instead of returning an ActionState. That's allowed because redirect() is typed to return never.

Here's the mechanism:

redirect has return type never (declared in next/navigation). It works by throwing a special internal exception (NEXT_REDIRECT) that Next's framework catches higher up to perform the actual redirect. TypeScript takes never literally: it means "this call never returns control to the caller," so the code path after it is unreachable.

TypeScript infers a function's return type from every code path that can actually complete. The try block ends with redirect(...) — a never path, so it contributes nothing to the return type. The catch block explicitly returns fromErrorToActionState(error, formData), which is typed as ActionState. Since that's the only path that actually returns a value, the whole function is inferred as Promise<ActionState> (async function wraps it in a Promise) — not Promise<ActionState | undefined> or similar.

useActionState's expected action signature is (state: S, payload: P) => S | Promise<S>. Since signUp's inferred type is exactly (state: ActionState, formData: FormData) => Promise<ActionState>, it matches cleanly — no error.

If you swapped redirect(...) for something with a normal return type (or removed the never typing), TypeScript would correctly flag that the function can fall through without returning a value, causing a mismatch.
  */
  return (
    <Form action={action} actionState={actionState}>
      <Label htmlFor="username">Username</Label>
      <Input
        defaultValue={actionState.payload?.get("username") as string}
        name="username"
        placeholder="Username"
      />
      <FieldError actionState={actionState} name="username" />
      <Label htmlFor="email">Email</Label>
      <Input
        defaultValue={actionState.payload?.get("email") as string}
        name="email"
        placeholder="Email"
      />
      <FieldError actionState={actionState} name="email" />
      <Label htmlFor="password">Password</Label>
      <Input
        defaultValue={actionState.payload?.get("password") as string}
        name="password"
        type="password"
        placeholder="Password"
      />
      <FieldError actionState={actionState} name="password" />
      <Label htmlFor="confirmPassword">Confirm Password</Label>
      <Input
        defaultValue={actionState.payload?.get("confirmPassword") as string}
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
      />
      <FieldError actionState={actionState} name="confirmPassword" />
      <SubmitButton label="Sign Up" />
    </Form>
  );
}

export default SignUpForm;
