import type { ReactNode } from "react";
import type { TaskEntity } from "@/features/task/types";
import { TASK_STATUS_LABEL } from "@/features/task/types";
import { formatDate } from "@/utils/format-date";

type TaskCardProps = {
  task: TaskEntity;
  statusControl: ReactNode;
  deleteControl: ReactNode;
};

export function TaskCard({
  task,
  statusControl,
  deleteControl,
}: TaskCardProps) {
  return (
    <li className="rounded-2xl border border-zinc-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-zinc-900">{task.title}</p>
          {task.description ? (
            <p className="text-sm text-zinc-600">{task.description}</p>
          ) : null}
          <p className="text-xs text-zinc-500">
            作成: {formatDate(task.createdAt)}
          </p>
          <p className="text-xs text-zinc-500">
            現在: {TASK_STATUS_LABEL[task.status]}
          </p>
        </div>
        <div className="flex items-center gap-2">{deleteControl}</div>
      </div>
      <div className="mt-3">{statusControl}</div>
    </li>
  );
}
