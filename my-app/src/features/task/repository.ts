import type { TaskStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type CreateTaskInput = {
  title: string;
  description?: string;
};

export async function getTasks() {
  return prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createTask(input: CreateTaskInput) {
  return prisma.task.create({
    data: {
      title: input.title,
      description: input.description,
    },
  });
}

export async function updateTaskStatusById(id: string, status: TaskStatus) {
  return prisma.task.update({
    where: { id },
    data: { status },
  });
}

export async function deleteTaskById(id: string) {
  return prisma.task.delete({
    where: { id },
  });
}
