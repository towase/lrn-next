import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getTaskById } from "@/features/task/repository";
import { TASK_STATUS_LABEL } from "@/features/task/types";
import { formatDate } from "@/utils/format-date";

type TaskDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: TaskDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const task = await getTaskById(id);

  if (!task) {
    return {
      title: "タスクが見つかりません | Task Manager",
      description: "指定されたタスクは存在しません。",
    };
  }

  return {
    title: `${task.title} | Task Manager`,
    description: task.description ?? "タスク詳細ページ",
  };
}

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
  const { id } = await params;
  const task = await getTaskById(id);

  if (!task) {
    notFound();
  }

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900">タスク詳細</h1>
        <Button asChild variant="outline" size="sm">
          <Link href="/tasks">一覧へ戻る</Link>
        </Button>
      </div>

      <Card>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <p className="text-xs font-medium text-zinc-500">タイトル</p>
            <p className="text-base font-semibold text-zinc-900">
              {task.title}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium text-zinc-500">説明</p>
            <p className="text-sm text-zinc-700">
              {task.description ?? "説明は未入力です。"}
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
              <p className="text-xs font-medium text-zinc-500">ステータス</p>
              <p className="text-sm font-medium text-zinc-900">
                {TASK_STATUS_LABEL[task.status]}
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
              <p className="text-xs font-medium text-zinc-500">作成日時</p>
              <p className="text-sm text-zinc-900">
                {formatDate(task.createdAt)}
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
              <p className="text-xs font-medium text-zinc-500">更新日時</p>
              <p className="text-sm text-zinc-900">
                {formatDate(task.updatedAt)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
