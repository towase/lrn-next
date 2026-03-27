# Next.js 学習ロードマップ完走（Day2-Day10）

この ExecPlan は生きた文書です。`Progress`、`Surprises & Discoveries`、`Decision Log`、`Outcomes & Retrospective` は作業の進行に合わせて常に更新します。

この文書は `my-app/.agents/PLANS.md` の指示に従って維持します。

## Purpose / Big Picture

この計画は、現在進行中のタスク管理アプリを題材に Day2 から Day10 の学習項目を完走するための単一の実行計画です。利用者は最終的に、データ取得戦略、動的ルーティング、Server Actions の失敗処理、Middleware による保護、デプロイ前提、パフォーマンス確認までを一連の実装として確認できます。

動作確認は `pnpm lint` と `pnpm build` に加えて、ブラウザでの `/tasks` 保護挙動、`/tasks/[id]` 詳細、`/fetch-compare` のキャッシュ挙動差分、バンドル分析の出力確認で行います。

## Progress

- [x] (2026-03-12 12:25 JST) 親 ExecPlan を新規作成し、今後の進捗管理を一本化。
- [x] (2026-03-12 12:25 JST) Day2 外部 API fetch 比較ページを追加済み（`/fetch-compare`）。
- [x] (2026-03-12 12:25 JST) Day3 `tasks/[id]` と `generateMetadata`、一覧→詳細導線を追加済み。
- [x] (2026-03-12 12:25 JST) Server Actions のエラーハンドリング（create/update/delete の戻り値統一、UI表示）を追加済み。
- [x] (2026-03-12 15:10 JST) Day8 Middleware で `/tasks` と配下ルートの保護を実装。
- [x] (2026-03-12 15:10 JST) Day8 擬似ログイン/ログアウト導線を追加し、cookie ベース制御を確認。
- [x] (2026-03-12 15:49 JST) Day9 Vercel デプロイ前提の設定確認（環境変数・DB接続・ビルド確認手順）を文書化。
- [x] (2026-03-12 16:26 JST) Day10 bundle 分析を実施し、主要ボトルネック候補（Prisma runtime混入）を解消。
- [x] (2026-03-12 16:26 JST) 最終の総合検証（`pnpm lint`、`pnpm build`、主要画面HTTP確認）を実施。

## Surprises & Discoveries

- Observation: 固定値 API では fetch 比較の差が見えにくかった。
  Evidence: `jsonplaceholder/todos/1` はレスポンスが固定で、リロードしても見た目差分が小さい。

- Observation: `httpbin.org/uuid` へ切り替えると `force-cache` と `no-store` の差が視認しやすくなった。
  Evidence: `/fetch-compare` で `no-store` の UUID がリロードごとに変化し、`force-cache` は同値を維持。

- Observation: Proxy を `/tasks/:path*` に限定することで、学習用ページ（`/fetch-compare` など）は認証不要のまま維持できた。
  Evidence: `matcher` を限定した `proxy.ts` 追加後も `next build` で通常ルートが維持され、`/tasks` 系のみ保護対象になった。

- Observation: このアプリのデプロイ前提は `DATABASE_URL` 1 つに集約されており、Prisma 接続条件が明確だった。
  Evidence: `src/lib/prisma.ts` と `prisma.config.ts` の参照変数が `DATABASE_URL` のみだった。

- Observation: `/tasks` のクライアント chunk に Prisma runtime が混入し、追加 JS を押し上げていた。
  Evidence: `types.ts` で `@prisma/client` を runtime import しており、改善前 `/tasks` 追加 JS は 90.2KB だった。

- Observation: `TaskStatus` をローカル const union へ置換すると `/tasks` 追加 JS が 47.0KB まで減少した。
  Evidence: 同一計測手順で改善前 90.2KB → 改善後 47.0KB（-43.2KB）を確認。

## Decision Log

- Decision: 進捗管理は Day 単位の分割ファイルではなく、ロードマップ全体を 1 ファイルに集約する。
  Rationale: 完了までの残作業と依存関係を一画面で追えるため。
  Date/Author: 2026-03-12 / Codex

- Decision: Day8 の認証は本番用途ではなく cookie の有無だけで判定する擬似認証に限定する。
  Rationale: 学習目的は Middleware 制御の理解であり、外部認証基盤の導入はスコープ外のため。
  Date/Author: 2026-03-12 / Codex

- Decision: ログイン入口は `/auth` に分離し、未認証時は `?next=` を付与して遷移先を保持する。
  Rationale: `/tasks` 保護の挙動を単純に保ちつつ、ログイン後に元のページへ戻す導線を学習しやすくするため。
  Date/Author: 2026-03-12 / Codex

- Decision: Day9 ではデプロイ手順を README 分離ではなく `docs/vercel-deploy-checklist.md` に独立させる。
  Rationale: 実行手順をチェックリスト化して、Vercel 設定とスモークテストを再利用しやすくするため。
  Date/Author: 2026-03-12 / Codex

- Decision: shared 型定義から Prisma enum の runtime import を排除し、`TASK_STATUS_VALUES` を唯一のクライアント参照にする。
  Rationale: Client Component 側への Prisma runtime 混入を防ぎ、`/tasks` の配信 JS を削減するため。
  Date/Author: 2026-03-12 / Codex

## Outcomes & Retrospective

Day2-10 は完了しました。`/tasks` 系の保護、Vercel デプロイ前提、bundle 分析と改善、`lint/build` と保護挙動の HTTP 検証まで完了しています。

## Context and Orientation

このリポジトリは Next.js App Router 構成です。主要な既存コードは次の場所にあります。

- `my-app/src/app/(dashboard)/tasks/page.tsx`: タスク一覧画面
- `my-app/src/app/(dashboard)/tasks/[id]/page.tsx`: タスク詳細画面
- `my-app/src/app/(dashboard)/fetch-compare/page.tsx`: Day2 fetch 比較ページ
- `my-app/src/features/task/actions.ts`: Server Actions
- `my-app/src/features/task/components/*`: タスク UI
- `my-app/src/features/task/repository.ts`: Prisma 経由の DB 操作

未実装項目はありません。以降は必要に応じて改善サイクルを回します。

## Plan of Work

まず Day8 として `my-app/src/proxy.ts` を追加し、`/tasks` 系ルートへのアクセス時に cookie を確認して未認証アクセスを遮断します。次にログイン・ログアウトの最小導線を既存 UI へ追加し、保護動作をブラウザで検証します。

続いて Day9 として、Vercel デプロイに必要な前提をこのリポジトリの現状に合わせて整理します。具体的には環境変数、Prisma/Postgres 接続、ビルド観点をチェックし、再現可能な手順に落とし込みます。

最後に Day10 として bundle 分析を実行し、サイズ増加要因を確認します。必要なら動的 import や依存分離など、小さな改善を 1 つ入れて効果を確認します。

## Concrete Steps

作業ディレクトリは `my-app` です。

1. Day8: Middleware と擬似認証導線を実装。
2. Day8: ブラウザで未認証/認証/ログアウト後の遷移を検証。
3. Day9: デプロイ前提を確認し、必要な設定とチェック手順をまとめる。
4. Day10: bundle 分析を実施し、結果を記録。
5. 最終: `pnpm lint` と `pnpm build` を実行。

期待ログ（要点）は次の通りです。

    > pnpm lint
    Checked ... files ... No fixes applied.

    > pnpm build
    ✓ Compiled successfully

    > (bundle分析コマンド)
    生成された分析レポートまたはサイズ情報が確認できる。

## Validation and Acceptance

受け入れ条件は次の通りです。

1. 未認証で `/tasks` にアクセスすると保護先へ遷移する。
2. 認証 cookie 発行後は `/tasks` と `/tasks/[id]` を閲覧できる。
3. ログアウト後は再び `/tasks` に直接入れない。
4. Day9 のデプロイ前提が、第三者が再実行できる粒度で整理される。
5. Day10 の bundle 分析結果が確認でき、改善候補が少なくとも1件示される。
6. `pnpm lint` と `pnpm build` が成功する。

## Idempotence and Recovery

この計画の作業は繰り返し実行できます。cookie 状態が不整合の場合はブラウザ cookie を削除して再検証します。設定変更で不具合が出た場合は、該当コミット差分を単位に巻き戻して再適用します。

## Artifacts and Notes

実装後にこのセクションへ以下を追記します。

- 主要差分ファイル一覧
- `lint/build` 成功ログ要点
- bundle 分析の要点（どのファイルが重いか）

Day8 実装時点の記録:

- 主要差分ファイル:
  - `my-app/src/proxy.ts`
  - `my-app/src/app/auth/page.tsx`
  - `my-app/src/features/auth/actions.ts`
  - `my-app/src/features/auth/constants.ts`
  - `my-app/src/components/layouts/dashboard-layout.tsx`
  - `my-app/src/app/page.tsx`
- 検証ログ要点:
  - `pnpm lint`: `Checked 46 files ... No fixes applied.`
  - `pnpm build`: `✓ Compiled successfully`、`ƒ /auth` と `ƒ Proxy (Middleware)` を確認。

Day9 実装時点の記録:

- 主要差分ファイル:
  - `my-app/docs/vercel-deploy-checklist.md`
  - `my-app/package.json`
  - `my-app/README.md`
- 実装要点:
  - Vercel 前提（環境変数・Build Command・スモークテスト）を文書化。
  - `pnpm db:migrate:deploy` を script 化し、Build Command へ組み込みやすくした。

Day10 実装時点の記録:

- 主要差分ファイル:
  - `my-app/docs/day10-bundle-analysis.md`
  - `my-app/src/features/task/types.ts`
  - `my-app/src/features/task/actions.ts`
  - `my-app/src/features/task/repository.ts`
  - `my-app/src/features/task/components/task-status-form.tsx`
- 検証ログ要点:
  - `/tasks` route 追加 JS: `90.2KB -> 47.0KB`（-43.2KB）
  - `pnpm lint`: `Checked 46 files ... No fixes applied.`
  - `pnpm build`: `✓ Compiled successfully`
  - `curl -I /tasks`: `307 /auth?next=%2Ftasks`
  - `curl -I /tasks/abc`: `307 /auth?next=%2Ftasks%2Fabc`
  - `curl -I /fetch-compare`: `200 OK`
  - `curl -I (Cookie: auth-token=demo-user) /tasks`: `200 OK`

## Interfaces and Dependencies

この計画で主要に扱うインターフェースは次の通りです。

- `my-app/src/proxy.ts`
  - `export function proxy(request: NextRequest): NextResponse`
  - `export const config = { matcher: ["/tasks/:path*"] }`
- `next/headers` の `cookies()` API
  - ログイン時 `set`
  - ログアウト時 `delete`
- `my-app/src/features/task/actions.ts`
  - `createTaskAction`, `updateTaskStatusAction`, `deleteTaskAction`
- Day10 の分析用コマンド: `pnpm build` + `.next` manifest/chunk サイズ集計

## Change Notes

- 2026-03-12: 新規作成。理由は「学習ロードマップ完走までを 1 つの ExecPlan で追跡するため」。
- 2026-03-12: Day8 完了を反映。理由は「`/tasks` 保護と擬似認証導線の実装・検証が完了したため」。
- 2026-03-12: Day9 完了を反映。理由は「Vercel デプロイ前提をチェックリスト化し、migration deploy の実行経路を追加したため」。
- 2026-03-12: Day10 完了を反映。理由は「Prisma runtime 混入の解消で `/tasks` の追加 JS を削減したため」。
- 2026-03-12: 最終検証完了を反映。理由は「`lint/build` 成功と `/tasks` 保護挙動のHTTP確認が完了したため」。
