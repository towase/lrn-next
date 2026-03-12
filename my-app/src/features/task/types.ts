export const TASK_STATUS_VALUES = ["TODO", "IN_PROGRESS", "DONE"] as const;

export type TaskStatus = (typeof TASK_STATUS_VALUES)[number];

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

export const TASK_STATUS_OPTIONS: { value: TaskStatus; label: string }[] =
  TASK_STATUS_VALUES.map((value) => ({
    value,
    label: TASK_STATUS_LABEL[value],
  }));
