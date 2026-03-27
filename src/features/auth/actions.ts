"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { AUTH_COOKIE_NAME } from "@/features/auth/constants";

const loginSchema = z.object({
  nextPath: z.string().optional(),
});

export async function loginAction(formData: FormData) {
  const parsed = loginSchema.safeParse({
    nextPath: toStringValue(formData.get("nextPath")),
  });

  const safeNextPath = toSafePath(parsed.data?.nextPath);

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, "demo-user", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect(safeNextPath);
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  redirect("/auth");
}

function toSafePath(path: string | undefined) {
  if (!path) {
    return "/tasks";
  }

  if (!path.startsWith("/") || path.startsWith("//")) {
    return "/tasks";
  }

  return path;
}

function toStringValue(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value : "";
}
