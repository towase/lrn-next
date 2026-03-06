# lrn-next / my-app

Next.js App Router + Server Actions + Prisma(Postgres) で作るタスク管理アプリです。

## 技術スタック

- Next.js 16 (App Router)
- React 19
- Prisma 7
- PostgreSQL 16 (Docker Compose)
- Biome

## 前提

- Node.js
- pnpm
- Docker (または OrbStack)

## 初期セットアップ

```bash
pnpm install
cp .env.example .env
pnpm db:up
pnpm db:migrate --name init
pnpm dev
```

- アプリ: [http://localhost:3000](http://localhost:3000)
- タスク画面: [http://localhost:3000/tasks](http://localhost:3000/tasks)

## DB関連コマンド

```bash
pnpm db:up        # Postgres起動
pnpm db:down      # Postgres停止
pnpm db:logs      # Postgresログ表示
pnpm db:generate  # Prisma Client生成
pnpm db:migrate   # マイグレーション作成 + 適用
pnpm db:push      # スキーマをDBへ反映
pnpm db:studio    # Prisma Studio起動
```

## ディレクトリ構成

```txt
src/
  app/
  components/
    layouts/
    ui/
  features/
    task/
  hooks/
  lib/
  utils/
e2e/
testing/
```

- `src/app`: Next.jsのApp Router
- `src/components/layouts`: レイアウトコンポーネント
- `src/components/ui`: 汎用UI
- `src/features`: 機能単位のコード
- `src/hooks`: 汎用Hook
- `src/lib`: ライブラリラッパー
- `src/utils`: 汎用ユーティリティ
- `e2e`: E2Eテスト
- `testing`: テスト用セットアップ/ユーティリティ

## 現在の実装範囲

- タスクの作成
- タスクのステータス更新
- タスクの削除
- Server Actions + `revalidatePath("/tasks")`
