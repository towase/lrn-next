import type { ReactNode } from "react";

export default function NestedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-blue-50 text-blue-900">
      <div className="mx-auto max-w-4xl space-y-4 px-6 py-10">
        <header className="rounded-lg border border-blue-200 bg-blue-100 px-4 py-3 font-semibold">
          親レイアウト（`/nested/layout.tsx`）
        </header>
        <main className="rounded-lg border border-blue-200 bg-white px-4 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}

