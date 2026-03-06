import { TaskCard } from "@/features/task/components/task-card";
import { TaskCreateForm } from "@/features/task/components/task-create-form";
import { TaskDeleteButton } from "@/features/task/components/task-delete-button";
import { TaskStatusForm } from "@/features/task/components/task-status-form";
import { getTasks } from "@/features/task/repository";

export async function TaskBoard() {
  const tasks = await getTasks();

  return (
    <section className="grid gap-6">
      <TaskCreateForm />

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
    </section>
  );
}
