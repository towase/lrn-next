import type { ReactNode } from "react";

export default function NestedSectionLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-green-300 bg-green-50 px-4 py-3">
        <h2 className="text-lg font-semibold text-green-900">
          子レイアウト（`/nested/section/layout.tsx`）
        </h2>
        <p className="mt-1 text-sm text-green-800">
          ここは /nested/section 以下のページ専用のレイアウトです（緑系）。
        </p>
      </section>
      <div className="rounded-lg border border-green-200 bg-white px-4 py-4">
        {children}
      </div>
    </div>
  );
}

