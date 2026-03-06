import type { TaskStatus } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { updateTaskStatusAction } from "@/features/task/actions";
import { TASK_STATUS_OPTIONS } from "@/features/task/types";

type TaskStatusFormProps = {
  id: string;
  status: TaskStatus;
};

export function TaskStatusForm({ id, status }: TaskStatusFormProps) {
  return (
    <form action={updateTaskStatusAction} className="flex items-center gap-2">
      <input type="hidden" name="id" value={id} />
      <label htmlFor={`status-${id}`} className="sr-only">
        ステータス
      </label>
      <select
        id={`status-${id}`}
        name="status"
        defaultValue={status}
        className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs"
      >
        {TASK_STATUS_OPTIONS.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <Button type="submit" variant="secondary">
        更新
      </Button>
    </form>
  );
}
