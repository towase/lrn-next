# ExecPlan: `my-app` を廃止して Next.js アプリをリポジトリルートへ移設する

## Purpose / Intended Outcome

ユーザーは `my-app` ディレクトリを意識せず、リポジトリルート `/Users/whytebox/src/github.com/towase/lrn-next` をそのまま Next.js アプリの作業ディレクトリとして使えるようになります。`pnpm dev`、`pnpm build`、`pnpm lint`、`pnpm typecheck` をルートで実行でき、フックやドキュメントも新しい配置を前提にそろいます。

## Progress

- [x] 2026-03-27 16:37 JST: ルートと `/Users/whytebox/src/github.com/towase/lrn-next/my-app` の構成、衝突ファイル、`my-app` 参照箇所を確認した。
- [x] 2026-03-27 16:38 JST: アプリ本体、`.agents`、`.claude`、`src`、`prisma`、`package.json` などをルートへ移動し、空になった `my-app` ディレクトリを削除した。
- [x] 2026-03-27 16:39 JST: `.gitignore`、`lefthook.yml`、`scripts/install-hooks.mjs`、README、Vercel 手順、`package.json`、`docker-compose.yml` をルート前提へ更新した。
- [x] 2026-03-27 16:39 JST: `pnpm hooks:install`、`pnpm lint`、`pnpm typecheck` をルートで実行し、すべて成功した。

## Surprises & Discoveries

- Observation: ルートには既に `/Users/whytebox/src/github.com/towase/lrn-next/lefthook.yml` と短い `.gitignore` があり、内容は `my-app` サブディレクトリ前提だった。
  Evidence: `lefthook.yml` に `cd my-app` と `root: my-app/` がある。
- Observation: `scripts/install-hooks.mjs` は `my-app` の一つ上に `lefthook.yml` がある前提で設定ファイルパスを組み立てている。
  Evidence: `repoRoot = path.resolve(appDir, "..")` と `configPath = path.join(repoRoot, "lefthook.yml")`。
- Observation: 既存の Git hook 本体にも `my-app` パスが埋め込まれていたため、設定ファイル更新だけでは不十分だった。
  Evidence: `pnpm hooks:install` の再実行後に `.git/hooks/pre-commit` が再同期され、旧パス前提の hook を置き換えた。

## Decision Log

- Decision: 生成物を除くアプリ関連ファイルをルートへ移動し、ルート既存設定は新配置に合わせて更新する。
  Rationale: ユーザーの意図は「`my-app` をやめる」ことであり、ラッパー構成を残すよりルートを単一のアプリルートにする方が明確。
  Date/Author: 2026-03-27 / Codex
- Decision: `node_modules` と `.next` もルートへ移して、移設直後にルートで検証できる状態を優先する。
  Rationale: 再インストールを挟まずにルートで `pnpm` コマンドを実行できる可能性が高く、確認が速い。
  Date/Author: 2026-03-27 / Codex
- Decision: 表示名として残る `my-app` も減らすため、`package.json` のパッケージ名と Docker のコンテナ名を `lrn-next` ベースへ更新する。
  Rationale: フォルダ構成だけ直しても開発コマンド出力や Docker 上に `my-app` が残ると、移設後の状態が分かりにくい。
  Date/Author: 2026-03-27 / Codex

## Outcomes & Retrospective

`my-app` サブディレクトリを廃止し、アプリ全体を `/Users/whytebox/src/github.com/towase/lrn-next` 直下へ移した。ルートの Git フック設定も再同期済みで、`pnpm lint` と `pnpm typecheck` はルートで成功した。残課題としては、今後コミット時に Git 上では「削除 + 追加」に見えるため、必要なら `git add -A` 後に rename として整理されることを確認する。

## Context and Orientation

現状の Next.js アプリ本体は `/Users/whytebox/src/github.com/towase/lrn-next/my-app` にある。主要ファイルは以下。

- `/Users/whytebox/src/github.com/towase/lrn-next/my-app/package.json`: 開発・ビルド・Prisma・フックスクリプト。
- `/Users/whytebox/src/github.com/towase/lrn-next/my-app/src`: App Router、UI、機能実装。
- `/Users/whytebox/src/github.com/towase/lrn-next/my-app/prisma`: スキーマとマイグレーション。
- `/Users/whytebox/src/github.com/towase/lrn-next/lefthook.yml`: Git フック定義。現在は `my-app` 配下でコマンドを実行する設定。
- `/Users/whytebox/src/github.com/towase/lrn-next/my-app/scripts/install-hooks.mjs`: `lefthook install` を呼ぶスクリプト。

この作業でいう「移設」は、`my-app` 配下のアプリをリポジトリルートへ持ち上げ、ルートを唯一のアプリルートにすることを指す。

## Plan of Work

まず `my-app` 配下の設定・ソース・ドキュメント・補助ディレクトリをルートへ移動する。次に `/Users/whytebox/src/github.com/towase/lrn-next/.gitignore`、`/Users/whytebox/src/github.com/towase/lrn-next/lefthook.yml`、`/Users/whytebox/src/github.com/towase/lrn-next/scripts/install-hooks.mjs`、`/Users/whytebox/src/github.com/towase/lrn-next/package.json`、README と docs を新しいパス前提へ更新する。最後にルートで lint と typecheck を実行し、コマンドが `my-app` なしで通ることを確認する。

## Concrete Steps

作業ディレクトリは `/Users/whytebox/src/github.com/towase/lrn-next`。

1. `mv` で `my-app` 配下のアプリ関連ファイルとディレクトリをルートへ移す。
2. `apply_patch` でルート設定とドキュメントの `my-app` 前提を削除する。
3. `pnpm lint`
   期待: Biome のエラーが出ず終了コード 0。
4. `pnpm typecheck`
   期待: TypeScript エラーが出ず終了コード 0。

## Validation and Acceptance

受け入れ条件は以下。

- `/Users/whytebox/src/github.com/towase/lrn-next/package.json` が存在し、`pnpm dev` などの scripts を持つ。
- `/Users/whytebox/src/github.com/towase/lrn-next/src/app`、`/Users/whytebox/src/github.com/towase/lrn-next/prisma`、`/Users/whytebox/src/github.com/towase/lrn-next/public` がルート直下にある。
- `/Users/whytebox/src/github.com/towase/lrn-next/lefthook.yml` が `my-app` を参照しない。
- `pnpm lint` と `pnpm typecheck` がルートで成功する。

## Idempotence and Recovery

ファイル移動は同じコマンドをそのまま再実行すると失敗するため、移動後は存在確認をして不足分だけ再移動する。設定更新は再適用可能なテキスト編集にする。問題が出た場合は `git diff` と `git status` で移動済みファイルを確認し、必要なら逆方向の `mv` で戻せる。

## Artifacts and Notes

実際の成功ログ:

    $ pnpm hooks:install
    sync hooks: ✔️ (pre-commit)

    $ pnpm lint
    Checked 48 files in 35ms. No fixes applied.

    $ pnpm typecheck
    <no output>

## Interfaces and Dependencies

- Node.js / pnpm: 既存のパッケージ管理と scripts 実行に必要。
- Next.js 16: ルートへ移した後も `package.json` と `next.config.ts` でそのまま動く想定。
- Prisma 7: `prisma.config.ts` と `prisma/schema.prisma` は相対パス前提のため、ルートへそろえて維持する。

移設後に存在すべき主要パス:

- `/Users/whytebox/src/github.com/towase/lrn-next/package.json`
- `/Users/whytebox/src/github.com/towase/lrn-next/src/app/layout.tsx`
- `/Users/whytebox/src/github.com/towase/lrn-next/prisma/schema.prisma`
- `/Users/whytebox/src/github.com/towase/lrn-next/scripts/install-hooks.mjs`
