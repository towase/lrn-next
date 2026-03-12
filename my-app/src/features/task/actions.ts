"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  createTask,
  deleteTaskById,
  updateTaskStatusById,
} from "@/features/task/repository";
import { TASK_STATUS_VALUES } from "@/features/task/types";

export type TaskActionResult = {
  ok: boolean;
  message?: string;
};

const createTaskSchema = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().max(500).optional(),
});

const updateTaskStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(TASK_STATUS_VALUES),
});

const deleteTaskSchema = z.object({
  id: z.string().min(1),
});

export async function createTaskAction(
  formData: FormData,
): Promise<TaskActionResult> {
  const parsed = createTaskSchema.safeParse({
    title: toStringValue(formData.get("title")),
    description: toOptionalStringValue(formData.get("description")),
  });

  if (!parsed.success) {
    return { ok: false, message: "入力値が不正です。" };
  }

  try {
    await createTask(parsed.data);
    revalidatePath("/tasks");
    return { ok: true };
  } catch {
    return { ok: false, message: "タスク作成に失敗しました。" };
  }
}

export async function updateTaskStatusAction(
  formData: FormData,
): Promise<TaskActionResult> {
  const parsed = updateTaskStatusSchema.safeParse({
    id: toStringValue(formData.get("id")),
    status: toStringValue(formData.get("status")),
  });

  if (!parsed.success) {
    return { ok: false, message: "入力値が不正です。" };
  }

  try {
    await updateTaskStatusById(parsed.data.id, parsed.data.status);
    revalidatePath("/tasks");
    return { ok: true };
  } catch {
    return { ok: false, message: "ステータス更新に失敗しました。" };
  }
}

export async function deleteTaskAction(
  formData: FormData,
): Promise<TaskActionResult> {
  const parsed = deleteTaskSchema.safeParse({
    id: toStringValue(formData.get("id")),
  });

  if (!parsed.success) {
    return { ok: false, message: "入力値が不正です。" };
  }

  try {
    await deleteTaskById(parsed.data.id);
    revalidatePath("/tasks");
    return { ok: true };
  } catch {
    return { ok: false, message: "タスク削除に失敗しました。" };
  }
}

function toStringValue(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value : "";
}

function toOptionalStringValue(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}
