import { Card, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

const EXTERNAL_API_URL = "https://httpbin.org/uuid";

type FetchMode = "force-cache" | "no-store" | "revalidate-30s";

type FetchComparisonResult = {
  mode: FetchMode;
  ok: boolean;
  status?: number;
  fetchedAt: string;
  cacheHeader?: string | null;
  data?: unknown;
  errorMessage?: string;
};

export default async function FetchComparePage() {
  const results = await Promise.all([
    fetchByMode("force-cache"),
    fetchByMode("no-store"),
    fetchByMode("revalidate-30s"),
  ]);

  return (
    <div className="grid gap-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-zinc-900">
          外部 API fetch 比較
        </h1>
        <p className="text-sm text-zinc-600">
          毎回値が変わる外部 API を cache
          設定別に取得し、リロード時の差分を確認します。
        </p>
        <p className="text-xs text-zinc-500">
          期待値: force-cache は固定、no-store は毎回変化、revalidate-30s
          は30秒以内なら固定
        </p>
      </div>

      <div className="grid gap-3">
        {results.map((result) => (
          <Card key={result.mode}>
            <CardContent className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-zinc-900">
                  {result.mode}
                </p>
                <p className="text-xs text-zinc-500">
                  取得時刻: {result.fetchedAt}
                </p>
              </div>

              {result.ok ? (
                <>
                  <p className="text-xs text-zinc-600">
                    status: {result.status} / cache-control:{" "}
                    {result.cacheHeader ?? "(なし)"}
                  </p>
                  <pre className="overflow-x-auto rounded-md bg-zinc-950 p-3 text-xs text-zinc-100">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </>
              ) : (
                <p className="rounded-md bg-red-50 p-3 text-xs text-red-700">
                  取得失敗: {result.errorMessage}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

async function fetchByMode(mode: FetchMode): Promise<FetchComparisonResult> {
  const fetchedAt = new Date().toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
  });

  try {
    const response = await fetch(
      EXTERNAL_API_URL,
      mode === "revalidate-30s"
        ? { next: { revalidate: 30 } }
        : { cache: mode },
    );

    if (!response.ok) {
      return {
        mode,
        ok: false,
        fetchedAt,
        status: response.status,
        errorMessage: `HTTP ${response.status}`,
      };
    }

    const data = await response.json();

    return {
      mode,
      ok: true,
      status: response.status,
      fetchedAt,
      cacheHeader: response.headers.get("cache-control"),
      data,
    };
  } catch (error) {
    return {
      mode,
      ok: false,
      fetchedAt,
      errorMessage: error instanceof Error ? error.message : "unknown error",
    };
  }
}
