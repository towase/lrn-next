"use server";

import { TaskStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  createTask,
  deleteTaskById,
  updateTaskStatusById,
} from "@/entities/task/api/task-repository";

const createTaskSchema = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().max(500).optional(),
});

const updateTaskStatusSchema = z.object({
  id: z.string().min(1),
  status: z.nativeEnum(TaskStatus),
});

const deleteTaskSchema = z.object({
  id: z.string().min(1),
});

export async function createTaskAction(formData: FormData) {
  const parsed = createTaskSchema.safeParse({
    title: toStringValue(formData.get("title")),
    description: toOptionalStringValue(formData.get("description")),
  });

  if (!parsed.success) {
    return;
  }

  await createTask(parsed.data);
  revalidatePath("/tasks");
}

export async function updateTaskStatusAction(formData: FormData) {
  const parsed = updateTaskStatusSchema.safeParse({
    id: toStringValue(formData.get("id")),
    status: toStringValue(formData.get("status")),
  });

  if (!parsed.success) {
    return;
  }

  await updateTaskStatusById(parsed.data.id, parsed.data.status);
  revalidatePath("/tasks");
}

export async function deleteTaskAction(formData: FormData) {
  const parsed = deleteTaskSchema.safeParse({
    id: toStringValue(formData.get("id")),
  });

  if (!parsed.success) {
    return;
  }

  await deleteTaskById(parsed.data.id);
  revalidatePath("/tasks");
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
