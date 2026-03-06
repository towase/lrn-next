"use client";

import type { TaskStatus } from "@prisma/client";
import { useState, useTransition } from "react";
import { updateTaskStatusAction } from "@/features/task/actions";
import { TASK_STATUS_OPTIONS } from "@/features/task/types";

type TaskStatusFormProps = {
  id: string;
  status: TaskStatus;
};

export function TaskStatusForm({ id, status }: TaskStatusFormProps) {
  const [isPending, startTransition] = useTransition();
  const [currentStatus, setCurrentStatus] = useState(status);
  const [selectedStatus, setSelectedStatus] = useState(status);

  const onStatusChange = (nextStatus: TaskStatus) => {
    const previousStatus = currentStatus;
    setCurrentStatus(nextStatus);
    setSelectedStatus(nextStatus);

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.set("id", id);
        formData.set("status", nextStatus);
        await updateTaskStatusAction(formData);
      } catch {
        setCurrentStatus(previousStatus);
        setSelectedStatus(previousStatus);
      }
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
        value={selectedStatus}
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
