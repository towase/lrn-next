import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { loginAction } from "@/features/auth/actions";
import { AUTH_COOKIE_NAME } from "@/features/auth/constants";

type AuthPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const { next } = await searchParams;
  const cookieStore = await cookies();

  if (cookieStore.get(AUTH_COOKIE_NAME)) {
    redirect("/tasks");
  }

  const nextPath = toSafePath(next);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md items-center px-4 py-8">
      <Card className="w-full">
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <h1 className="text-xl font-bold text-zinc-900">擬似ログイン</h1>
            <p className="text-sm text-zinc-600">
              Day8 学習用です。ログインすると `/tasks` を閲覧できます。
            </p>
          </div>
          <form action={loginAction} className="grid gap-3">
            <input type="hidden" name="nextPath" value={nextPath} />
            <Button type="submit" className="w-full">
              ログインして続ける
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
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
