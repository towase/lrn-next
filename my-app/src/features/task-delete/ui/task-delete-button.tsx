import { deleteTaskAction } from "@/features/task-crud/model/actions";

type TaskDeleteButtonProps = {
  id: string;
};

export function TaskDeleteButton({ id }: TaskDeleteButtonProps) {
  return (
    <form action={deleteTaskAction}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded-md border border-red-300 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-50"
      >
        削除
      </button>
    </form>
  );
}
