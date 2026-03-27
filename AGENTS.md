# Repository Guidelines

## Project Structure & Module Organization

このリポジトリは、タスク管理機能を中心にした Next.js App Router プロジェクトです。

- `src/app`: ルーティング、レイアウト、ページエントリ。
- `src/features/task`: タスク機能のドメインロジック（`actions.ts`, `repository.ts`, `types.ts`）。
- `src/components/ui`: 再利用可能な UI コンポーネント。
- `src/components/layouts`: レイアウト系コンポーネント。
- `src/lib` / `src/utils`: 共通ヘルパーやラッパー（例: `prisma.ts`, 日付整形）。
- `prisma`: スキーマとマイグレーション関連。
- `public`: 静的アセット。
- `e2e` / `testing`: E2E テストとテスト用ユーティリティ。

新しい業務ロジックは feature 単位で配置し、横断的な共通処理は feature 外に置いてください。

## Build, Test, and Development Commands

- `pnpm dev`: ローカル開発サーバーを起動（`http://localhost:3000`）。
- `pnpm build`: 本番ビルドを作成。
- `pnpm start`: ビルド済みアプリを起動。
- `pnpm lint`: Biome による静的チェックを実行。
- `pnpm format`: Biome でコード整形を適用。
- `pnpm db:up` / `pnpm db:down`: Docker Compose で PostgreSQL を起動・停止。
- `pnpm db:migrate`: Prisma マイグレーションを作成・適用。

## Coding Style & Naming Conventions

- 言語: TypeScript（`strict` 有効）。
- 整形: Biome（スペース 2 つインデント、import 整理）。
- ファイル名: kebab-case（例: `dashboard-layout.tsx`, `format-date.ts`）。
- React コンポーネント: エクスポート名は PascalCase、Hooks は `use` で開始。
- `src` 配下の import は `@/*` エイリアスを優先。

プルリクエスト前に `pnpm lint && pnpm format` を実行してください。

## Testing Guidelines

テスト関連ディレクトリは `e2e/` と `testing/` です。対象機能が分かる命名（例: `task-create.e2e.ts`）を使い、検証対象に近い場所に配置してください。

現時点では `package.json` に専用テストスクリプトがありません。テストを追加する場合は、実行コマンドを scripts に追加し、`README.md` に使い方を追記してください。

## Commit & Pull Request Guidelines

コミットメッセージは既存履歴に合わせ、短い命令形で記述してください（例: `add suspense`, `style: update input styles`）。1コミット1目的を基本とします。

PR には次を含めてください。

- 変更概要と背景
- 関連 Issue（あれば）
- UI 変更時のスクリーンショットまたは短い動画
- スキーマ変更や環境変数変更の注意点

## Agent-Specific Instructions

複雑な機能追加や大きなリファクタリングでは、`.agents/PLANS.md` に従って ExecPlan を作成し、設計から実装完了まで更新し続けてください。
