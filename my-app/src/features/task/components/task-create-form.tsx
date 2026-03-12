"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  createTaskAction,
  type TaskActionResult,
} from "@/features/task/actions";

const INITIAL_STATE: TaskActionResult = { ok: true };

export function TaskCreateForm() {
  const [state, formAction] = useActionState(
    async (_prevState: TaskActionResult, formData: FormData) =>
      createTaskAction(formData),
    INITIAL_STATE,
  );

  return (
    <Card>
      <CardContent>
        <form action={formAction} className="grid gap-3">
          <div className="grid gap-2">
            <label
              htmlFor="title"
              className="text-sm font-medium text-zinc-800"
            >
              タイトル
            </label>
            <Input
              id="title"
              name="title"
              required
              maxLength={120}
              placeholder="例: Prismaの接続確認"
              className="bg-white text-zinc-900 placeholder:text-zinc-500"
            />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-zinc-800"
            >
              メモ
            </label>
            <Textarea
              id="description"
              name="description"
              rows={3}
              maxLength={500}
              placeholder="任意: タスクの補足"
              className="bg-white text-zinc-900 placeholder:text-zinc-500"
            />
          </div>
          {!state.ok && state.message ? (
            <p className="text-xs text-red-700">{state.message}</p>
          ) : null}
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-fit" disabled={pending}>
      {pending ? "追加中..." : "タスクを追加"}
    </Button>
  );
}
