export default function NestedSectionPage() {
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-bold text-green-900">
        /nested/section のページ
      </h1>
      <p className="text-green-800">
        このページは、親レイアウト（青）と子レイアウト（緑）の両方が効いています。
      </p>
      <ul className="list-disc space-y-1 pl-5 text-sm text-green-900">
        <li>画面全体の背景：青系（親レイアウト）</li>
        <li>説明ボックス背景：緑系（子レイアウト）</li>
        <li>この白い枠：子レイアウト内の children 用コンテナ</li>
      </ul>
    </div>
  );
}
