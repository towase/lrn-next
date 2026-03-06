"use client";

type TasksErrorProps = {
  error: Error;
  reset: () => void;
};

export default function TasksError({ error, reset }: TasksErrorProps) {
  return (
    <div className="grid gap-3 rounded-2xl border border-red-200 bg-red-50 p-6">
      <p className="text-sm font-semibold text-red-800">
        タスクの読み込みに失敗しました。
      </p>
      <p className="text-xs text-red-700">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="w-fit rounded-md bg-red-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-600"
      >
        再試行
      </button>
    </div>
  );
}
