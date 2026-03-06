import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { TaskEntity } from "@/features/task/types";
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
    <li>
      <Card className="gap-3 py-4">
        <CardContent className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-zinc-900">
                {task.title}
              </p>
              {task.description ? (
                <p className="text-sm text-zinc-600">{task.description}</p>
              ) : null}
              <p className="text-xs text-zinc-500">
                作成: {formatDate(task.createdAt)}
              </p>
            </div>
            <div className="flex items-center gap-2">{deleteControl}</div>
          </div>
          <div>{statusControl}</div>
        </CardContent>
      </Card>
    </li>
  );
}
