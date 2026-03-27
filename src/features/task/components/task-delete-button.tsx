"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import {
  deleteTaskAction,
  type TaskActionResult,
} from "@/features/task/actions";

type TaskDeleteButtonProps = {
  id: string;
};

const INITIAL_STATE: TaskActionResult = { ok: true };

export function TaskDeleteButton({ id }: TaskDeleteButtonProps) {
  const [state, formAction] = useActionState(
    async (_prevState: TaskActionResult, formData: FormData) =>
      deleteTaskAction(formData),
    INITIAL_STATE,
  );

  return (
    <div className="grid gap-1">
      <form action={formAction}>
        <input type="hidden" name="id" value={id} />
        <DeleteSubmitButton />
      </form>
      {!state.ok && state.message ? (
        <p className="text-xs text-red-700">{state.message}</p>
      ) : null}
    </div>
  );
}

function DeleteSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="destructive" size="xs" disabled={pending}>
      {pending ? "削除中..." : "削除"}
    </Button>
  );
}
