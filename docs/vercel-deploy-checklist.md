# Vercel デプロイ手順

このドキュメントは `lrn-next` を Vercel にデプロイする手順を、実際に完走した内容に基づいてまとめたものです。

## 1. 事前に準備するもの

- GitHub にリポジトリが push 済みであること
- [neon.tech](https://neon.tech) のアカウント（無料プランで OK）
- [vercel.com](https://vercel.com) のアカウント

## 2. Neon × Vercel Integration でデータベースを接続する

Vercel と Neon の Integration を使うと `DATABASE_URL` の手動設定が不要になります。

1. Vercel ダッシュボード → **New Project** → GitHub リポジトリをインポート
2. デプロイ設定画面の **Storage** → **Add Database** → **Neon** を選択
3. 既存の Neon プロジェクトに接続する
4. `DATABASE_URL`（および `DATABASE_URL_UNPOOLED`）が自動で Environment Variables に注入される

既存プロジェクトに後から追加する場合は、プロジェクトの **Storage** タブ → **Connect Store** → **Neon** から同様に操作できます。

## 3. ビルド設定

`package.json` に以下の script が設定済みです。Vercel はビルド時に `vercel-build` を自動で使用します。

```json
"postinstall": "prisma generate",
"vercel-build": "pnpm build"
```

**実行順序（Vercel の場合）:**

1. `pnpm install` → `postinstall` → `prisma generate`（クライアント生成）
2. `vercel-build` → `pnpm build`（Next.js ビルド）

Vercel ダッシュボードの Build Command は **空欄のまま**でよいです（自動検出されます）。

## 4. Prisma マイグレーション

本リポジトリには以下の migration が存在します。

- `prisma/migrations/20260306063629_init/migration.sql`

**デプロイ時の migration はビルド後に手動で実行します。**

Vercel の **Settings → Functions** などから実行するか、ローカルから本番 DATABASE_URL を使って実行します。

```bash
DATABASE_URL="<本番の接続文字列>" pnpm db:migrate:deploy
```

初回デプロイ時は必ず実行してください。

## 5. デプロイ前ローカル検証

```bash
pnpm lint
pnpm build
```

両方成功してから Vercel へ push します。

## 6. デプロイ後のスモークテスト

1. `/auth` が表示できる
2. 未認証で `/tasks` に直接アクセスすると `/auth?next=...` へ遷移する
3. ログイン後に `/tasks` と `/tasks/[id]` が閲覧できる
4. タスクの作成・ステータス変更・削除が動作する
5. ログアウト後に `/tasks` へ直接入れない

## 7. トラブルシュート

- `DATABASE_URL is not set`（ビルドエラー）
  - Vercel の Environment Variables に `DATABASE_URL` があるか確認
  - Neon Integration が正しく接続されているか確認
- `P1001` など DB 接続失敗
  - Neon の接続文字列に `?sslmode=require` が含まれているか確認
- migration 失敗
  - 失敗した migration の内容を確認し、ローカルで `pnpm db:migrate` が再現するか検証
