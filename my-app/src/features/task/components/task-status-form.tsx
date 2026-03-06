"use client";

import type { TaskStatus } from "@prisma/client";
import { useOptimistic, useTransition } from "react";
import { updateTaskStatusAction } from "@/features/task/actions";
import { TASK_STATUS_OPTIONS } from "@/features/task/types";

type TaskStatusFormProps = {
  id: string;
  status: TaskStatus;
};

export function TaskStatusForm({ id, status }: TaskStatusFormProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(
    status,
    (_currentState, nextStatus: TaskStatus) => nextStatus,
  );

  const onStatusChange = (nextStatus: TaskStatus) => {
    startTransition(async () => {
      setOptimisticStatus(nextStatus);
      const formData = new FormData();
      formData.set("id", id);
      formData.set("status", nextStatus);
      await updateTaskStatusAction(formData);
    });
  };

  return (
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
  );
}
