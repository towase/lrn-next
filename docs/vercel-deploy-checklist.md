# Vercel デプロイ前チェックリスト（Day9）

このドキュメントは `lrn-next` を Vercel にデプロイする前提を、現状の実装に合わせて再実行可能な形でまとめたものです。

## 1. 事前に準備するもの

- GitHub などにリポジトリが push 済みであること
- Vercel プロジェクトを作成済みであること（Root Directory はリポジトリルート）
- 本番用 PostgreSQL が用意されていること（Neon / Supabase / RDS など）

## 2. 必須環境変数

`DATABASE_URL` を Vercel の Environment Variables（Preview / Production）へ設定します。

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DBNAME?schema=public"
```

- アプリ側は `src/lib/prisma.ts` で `DATABASE_URL` を必須参照しています
- 未設定時は起動時に `DATABASE_URL is not set` で失敗します

## 3. Prisma マイグレーション前提

本リポジトリには以下の migration が存在します。

- `prisma/migrations/20260306063629_init/migration.sql`

デプロイ時は `migrate deploy` を使います。`package.json` に以下 script を追加済みです。

```bash
pnpm db:migrate:deploy
```

## 4. Vercel の Build 設定（推奨）

- Install Command: `pnpm install --frozen-lockfile`
- Build Command: `pnpm db:migrate:deploy && pnpm build`
- Output: Next.js デフォルト

`build` の前に migration を実行して、スキーマ差分未適用の事故を防ぎます。

## 5. デプロイ前ローカル検証

リポジトリルートで次を実行します。

```bash
pnpm lint
pnpm build
```

両方成功してから Vercel へ反映します。

## 6. デプロイ後のスモークテスト

1. `/auth` が表示できる
2. 未認証で `/tasks` に直接アクセスすると `/auth?next=...` へ遷移する
3. ログイン後に `/tasks` と `/tasks/[id]` が閲覧できる
4. ログアウト後に `/tasks` へ直接入れない

## 7. トラブルシュート

- `DATABASE_URL is not set`
  - Vercel の対象環境（Preview / Production）に変数が入っているか確認
- `P1001` など DB 接続失敗
  - DB 側の接続許可（IP 制限、SSL 必須設定、ユーザー権限）を確認
- migration 失敗
  - 失敗した migration の内容を確認し、ローカルで `pnpm db:migrate` が再現するか検証
