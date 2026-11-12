"use client";

import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useActionState } from "react";
import { changeUsername } from "@/features/auth/actions/change-username";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { User as AuthUser } from "lucia";
type ChangeUsernameFormProps = {
  user: AuthUser;
};

function ChangeUsernameForm({ user }: ChangeUsernameFormProps) {
  const [actionState, action] = useActionState(
    changeUsername,
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <Label htmlFor="username">Username</Label>
      <Input
        defaultValue={
          (actionState.payload?.get("username") as string) ?? user.username
        }
        name="username"
        placeholder="Username"
      />
      <FieldError actionState={actionState} name="username" />
      <SubmitButton label="Change Username" />
    </Form>
  );
}

export default ChangeUsernameForm;
