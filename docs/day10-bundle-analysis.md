# Day10 Bundle 分析レポート

更新日: 2026-03-12 (JST)

## 目的

- `/tasks` 系で配信されるクライアント JS の重い要因を特定する
- 改善を 1 件入れて差分を確認する

## 実施コマンド

```bash
pnpm build
```

加えて `.next` の manifest と chunk サイズを Node.js スクリプトで集計。

## 計測結果

- グローバル baseline（`rootMainFiles + polyfillFiles`）: **510.6 KB**
- `/tasks` の route 追加 JS
  - 改善前: **90.2 KB**
  - 改善後: **47.0 KB**
  - 差分: **-43.2 KB（約 -47.9%）**

改善後の主要 static chunk:

- `2f6a520da4620d11.js`: 219 KB
- `045c88d49bd4e061.js`: 120 KB
- `a6dad97d9634a72d.js`: 110 KB（polyfill）
- `e1aec06538024b68.js`: 38 KB（`/tasks` 関連）

## 原因

`src/features/task/types.ts` が `@prisma/client` の `TaskStatus` を runtime import しており、Client Component 側へ Prisma runtime が混入していた。

## 実施した改善

- `TaskStatus` を Prisma enum 依存から切り離し、ローカル定数へ変更
  - `TASK_STATUS_VALUES = ["TODO", "IN_PROGRESS", "DONE"] as const`
  - `TaskStatus` は上記 const 由来の union type
- `actions.ts` のバリデーションは `z.enum(TASK_STATUS_VALUES)` へ変更
- `task-status-form.tsx` の型参照を `@/features/task/types` に統一

## 追加候補（未実施）

- `/tasks` のフォーム群（作成・状態更新・削除）を UI 境界ごとに分割し、必要時にのみ hydration する
- アイコンや UI ユーティリティの利用箇所を限定して、共有 chunk の増加を抑える
