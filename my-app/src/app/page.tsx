import Link from "next/link";

export default function Home() {
  const links = [
    {
      title: "タスク管理アプリ",
      description:
        "Postgres(Docker) + Prisma + Server Actions の実装ページです。",
      href: "/tasks",
    },
    {
      title: "外部 API fetch 比較",
      description:
        "force-cache / no-store / revalidate の違いを確認する学習ページです。",
      href: "/fetch-compare",
    },
    {
      title: "ネストされた layout.tsx の例",
      description: "親/子レイアウトの適用範囲を確認できます。",
      href: "/lrn-nested",
    },
  ] as const;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-8 bg-white px-10 py-16 sm:items-start">
        <div className="space-y-2 text-center sm:text-left">
          <h1 className="text-3xl font-semibold tracking-tight text-black">
            lrn-next
          </h1>
          <p className="text-sm text-zinc-600">
            学習用のページ一覧です。ここから各サンプルへ移動できます（今後追加予定）。
          </p>
        </div>

        <ul className="w-full space-y-3">
          {links.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-xl border border-zinc-200 bg-zinc-50 p-5 hover:bg-zinc-100"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-black">
                      {item.title}
                    </p>
                    <p className="text-sm text-zinc-600">{item.description}</p>
                  </div>
                  <span className="shrink-0 rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white">
                    開く
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
