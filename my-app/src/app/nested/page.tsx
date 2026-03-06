import Link from "next/link";

export default function NestedHomePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-blue-900">/nested のページ</h1>
      <p className="text-blue-800">
        このページは <code>src/app/nested/layout.tsx</code>{" "}
        のレイアウト（青系）で囲まれています。
      </p>
      <div>
        <Link
          href="/nested/section"
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          /nested/section へ（子レイアウト付き）
        </Link>
      </div>
    </div>
  );
}
