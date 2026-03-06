import { Suspense } from "react";
import { TaskCard } from "@/features/task/components/task-card";
import { TaskCreateForm } from "@/features/task/components/task-create-form";
import { TaskDeleteButton } from "@/features/task/components/task-delete-button";
import { TaskStatusForm } from "@/features/task/components/task-status-form";
import { getTasks } from "@/features/task/repository";

export function TaskBoard() {
  return (
    <section className="grid gap-6">
      <TaskCreateForm />
      <Suspense fallback={<TaskListSkeleton />}>
        <TaskList />
      </Suspense>
    </section>
  );
}

async function TaskList() {
  const tasks = await getTasks();

  return (
    <div className="grid gap-3">
      <h2 className="text-lg font-semibold text-zinc-900">タスク一覧</h2>
      {tasks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-6 text-sm text-zinc-600">
          まだタスクはありません。上のフォームから追加してください。
        </div>
      ) : (
        <ul className="grid gap-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              statusControl={
                <TaskStatusForm id={task.id} status={task.status} />
              }
              deleteControl={<TaskDeleteButton id={task.id} />}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function TaskListSkeleton() {
  return (
    <div className="grid gap-3">
      <h2 className="text-lg font-semibold text-zinc-900">タスク一覧</h2>
      <div className="grid gap-3">
        <div className="h-28 animate-pulse rounded-xl border border-zinc-200 bg-zinc-100" />
        <div className="h-28 animate-pulse rounded-xl border border-zinc-200 bg-zinc-100" />
      </div>
    </div>
  );
}
