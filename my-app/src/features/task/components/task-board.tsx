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
        <div className="animate-in fade-in-0 slide-in-from-bottom-1 duration-300 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
          <div className="space-y-3">
            <div className="h-4 w-40 animate-pulse rounded bg-zinc-200" />
            <div className="h-3 w-64 animate-pulse rounded bg-zinc-100" />
            <div className="h-3 w-32 animate-pulse rounded bg-zinc-100" />
            <div className="h-8 w-28 animate-pulse rounded-md bg-zinc-100" />
          </div>
        </div>
        <div className="animate-in fade-in-0 slide-in-from-bottom-1 duration-500 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
          <div className="space-y-3">
            <div className="h-4 w-36 animate-pulse rounded bg-zinc-200" />
            <div className="h-3 w-56 animate-pulse rounded bg-zinc-100" />
            <div className="h-3 w-28 animate-pulse rounded bg-zinc-100" />
            <div className="h-8 w-28 animate-pulse rounded-md bg-zinc-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
