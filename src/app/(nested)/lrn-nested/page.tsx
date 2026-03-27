import Link from "next/link";

export default function LrnNestedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-8 bg-white px-10 py-16 dark:bg-black sm:items-start">
        <div className="space-y-2 text-center sm:text-left">
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Next.js ネストされた layout.tsx の例
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            青いエリアが親レイアウト、緑のエリアが子レイアウトとして動作します。
          </p>
        </div>

        <div className="space-y-4 rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
          <p className="font-medium">試してみるルート</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <code className="rounded bg-zinc-200 px-1 py-0.5 text-xs dark:bg-zinc-800">
                /nested
              </code>{" "}
              ：親レイアウト（青）だけが適用されたページ
            </li>
            <li>
              <code className="rounded bg-zinc-200 px-1 py-0.5 text-xs dark:bg-zinc-800">
                /nested/section
              </code>{" "}
              ：親レイアウト（青）＋子レイアウト（緑）が両方適用されたページ
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/nested"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            /nested を開く
          </Link>
          <Link
            href="/nested/section"
            className="inline-flex items-center justify-center rounded-md border border-blue-600 px-5 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-50"
          >
            いきなり /nested/section へ
          </Link>
        </div>

        <div>
          <Link
            href="/"
            className="text-sm text-zinc-600 hover:underline dark:text-zinc-400"
          >
            トップへ戻る
          </Link>
        </div>
      </main>
    </div>
  );
}
