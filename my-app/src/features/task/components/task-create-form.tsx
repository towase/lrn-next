import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createTaskAction } from "@/features/task/actions";

export function TaskCreateForm() {
  return (
    <Card>
      <CardContent>
        <form action={createTaskAction} className="grid gap-3">
          <div className="grid gap-2">
            <label
              htmlFor="title"
              className="text-sm font-medium text-zinc-800"
            >
              タイトル
            </label>
            <Input
              id="title"
              name="title"
              required
              maxLength={120}
              placeholder="例: Prismaの接続確認"
              className="bg-white text-zinc-900 placeholder:text-zinc-500"
            />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-zinc-800"
            >
              メモ
            </label>
            <Textarea
              id="description"
              name="description"
              rows={3}
              maxLength={500}
              placeholder="任意: タスクの補足"
              className="bg-white text-zinc-900 placeholder:text-zinc-500"
            />
          </div>
          <Button type="submit" className="w-fit">
            タスクを追加
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
