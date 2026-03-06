import { Button } from "@/components/ui/button";
import { deleteTaskAction } from "@/features/task/actions";

type TaskDeleteButtonProps = {
  id: string;
};

export function TaskDeleteButton({ id }: TaskDeleteButtonProps) {
  return (
    <form action={deleteTaskAction}>
      <input type="hidden" name="id" value={id} />
      <Button type="submit" variant="destructive" size="xs">
        削除
      </Button>
    </form>
  );
}
