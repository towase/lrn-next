import { TaskBoard } from "@/widgets/task-board/ui/task-board";

export const dynamic = "force-dynamic";

export default function TasksPage() {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-zinc-900">タスク管理</h1>
        <p className="text-sm text-zinc-600">
          App Router + Server Actions + Prisma(Postgres) の最小実装です。
        </p>
      </div>
      <TaskBoard />
    </div>
  );
}
