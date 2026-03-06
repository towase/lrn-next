import Link from "next/link";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-100">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
          <p className="text-base font-semibold text-zinc-900">Task Manager</p>
          <nav className="flex items-center gap-3 text-sm text-zinc-700">
            <Link
              href="/tasks"
              className="rounded-md px-2 py-1 hover:bg-zinc-100"
            >
              タスク
            </Link>
            <Link href="/" className="rounded-md px-2 py-1 hover:bg-zinc-100">
              ホーム
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6">
        {children}
      </main>
    </div>
  );
}
