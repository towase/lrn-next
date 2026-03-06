import { createTaskAction } from "@/features/task-crud/model/actions";

export function TaskCreateForm() {
  return (
    <form
      action={createTaskAction}
      className="grid gap-3 rounded-2xl border border-zinc-200 bg-white p-5"
    >
      <div className="grid gap-2">
        <label htmlFor="title" className="text-sm font-medium text-zinc-800">
          タイトル
        </label>
        <input
          id="title"
          name="title"
          required
          maxLength={120}
          placeholder="例: Prismaの接続確認"
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900"
        />
      </div>
      <div className="grid gap-2">
        <label
          htmlFor="description"
          className="text-sm font-medium text-zinc-800"
        >
          メモ
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          maxLength={500}
          placeholder="任意: タスクの補足"
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900"
        />
      </div>
      <button
        type="submit"
        className="inline-flex w-fit rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
      >
        タスクを追加
      </button>
    </form>
  );
}
