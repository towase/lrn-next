import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/features/auth/actions";
import { AUTH_COOKIE_NAME } from "@/features/auth/constants";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export async function DashboardLayout({ children }: DashboardLayoutProps) {
  const cookieStore = await cookies();
  const isLoggedIn = Boolean(cookieStore.get(AUTH_COOKIE_NAME));

  return (
    <div className="min-h-screen bg-zinc-100">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
          <p className="text-base font-semibold text-zinc-900">Task Manager</p>
          <nav className="flex items-center gap-2 text-sm text-zinc-700">
            <Link
              href="/tasks"
              className="rounded-md px-2 py-1 hover:bg-zinc-100"
            >
              タスク
            </Link>
            <Link
              href="/fetch-compare"
              className="rounded-md px-2 py-1 hover:bg-zinc-100"
            >
              fetch比較
            </Link>
            <Link href="/" className="rounded-md px-2 py-1 hover:bg-zinc-100">
              ホーム
            </Link>
            {isLoggedIn ? (
              <form action={logoutAction}>
                <Button type="submit" variant="outline" size="xs">
                  ログアウト
                </Button>
              </form>
            ) : (
              <Link
                href="/auth"
                className="rounded-md px-2 py-1 text-blue-700 hover:bg-zinc-100"
              >
                ログイン
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6">
        {children}
      </main>
    </div>
  );
}
