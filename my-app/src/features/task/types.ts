import { TaskStatus } from "@prisma/client";

export type TaskEntity = {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
};

export const TASK_STATUS_LABEL: Record<TaskStatus, string> = {
  TODO: "未着手",
  IN_PROGRESS: "進行中",
  DONE: "完了",
};

export const TASK_STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: TaskStatus.TODO, label: TASK_STATUS_LABEL.TODO },
  { value: TaskStatus.IN_PROGRESS, label: TASK_STATUS_LABEL.IN_PROGRESS },
  { value: TaskStatus.DONE, label: TASK_STATUS_LABEL.DONE },
];
