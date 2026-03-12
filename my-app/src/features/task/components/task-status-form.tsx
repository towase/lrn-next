"use client";

import { useOptimistic, useState, useTransition } from "react";
import { updateTaskStatusAction } from "@/features/task/actions";
import type { TaskStatus } from "@/features/task/types";
import { TASK_STATUS_OPTIONS } from "@/features/task/types";

type TaskStatusFormProps = {
  id: string;
  status: TaskStatus;
};

export function TaskStatusForm({ id, status }: TaskStatusFormProps) {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastCommittedStatus, setLastCommittedStatus] = useState(status);
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(
    status,
    (_currentState, nextStatus: TaskStatus) => nextStatus,
  );

  const onStatusChange = (nextStatus: TaskStatus) => {
    startTransition(async () => {
      setErrorMessage(null);
      setOptimisticStatus(nextStatus);

      const formData = new FormData();
      formData.set("id", id);
      formData.set("status", nextStatus);

      const result = await updateTaskStatusAction(formData);

      if (result.ok) {
        setLastCommittedStatus(nextStatus);
        return;
      }

      setOptimisticStatus(lastCommittedStatus);
      setErrorMessage(result.message ?? "ステータス更新に失敗しました。");
    });
  };

  return (
    <div className="grid gap-1">
      <div className="flex items-center gap-2">
        <label htmlFor={`status-${id}`} className="sr-only">
          ステータス
        </label>
        <select
          id={`status-${id}`}
          name="status"
          value={optimisticStatus}
          onChange={(event) => onStatusChange(event.target.value as TaskStatus)}
          className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs text-zinc-900"
          disabled={isPending}
        >
          {TASK_STATUS_OPTIONS.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      {errorMessage ? (
        <p className="text-xs text-red-700">{errorMessage}</p>
      ) : null}
    </div>
  );
}
