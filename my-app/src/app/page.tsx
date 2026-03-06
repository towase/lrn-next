import Link from "next/link";

export default function Home() {
  const links = [
    {
      title: "ネストされた layout.tsx の例",
      description: "親/子レイアウトの適用範囲を確認できます。",
      href: "/lrn-nested",
    },
  ] as const;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-8 bg-white px-10 py-16 dark:bg-black sm:items-start">
        <div className="space-y-2 text-center sm:text-left">
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
            lrn-next
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            学習用のページ一覧です。ここから各サンプルへ移動できます（今後追加予定）。
          </p>
        </div>

        <ul className="w-full space-y-3">
          {links.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-xl border border-zinc-200 bg-zinc-50 p-5 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-black dark:text-zinc-50">
                      {item.title}
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {item.description}
                    </p>
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

