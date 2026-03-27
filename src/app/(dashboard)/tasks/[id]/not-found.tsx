import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TaskNotFound() {
  return (
    <div className="grid gap-3 rounded-2xl border border-zinc-200 bg-white p-6">
      <p className="text-sm font-semibold text-zinc-900">
        指定したタスクは見つかりませんでした。
      </p>
      <Button asChild variant="outline" size="sm" className="w-fit">
        <Link href="/tasks">タスク一覧に戻る</Link>
      </Button>
    </div>
  );
}
