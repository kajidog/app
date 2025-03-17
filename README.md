# Chrome Extension DDD

Chrome拡張機能のボイラープレートプロジェクトです。Vite + React + TypeScriptを使用して開発されています。

## 技術スタック

- Vite
- React
- TypeScript
- Zustand (状態管理)
- Docker
- Bun (パッケージマネージャー/ランタイム)

## 必要要件

- Node.js 18以上
- Bun
- Docker (オプション)
- Chrome ブラウザ

## セットアップ

### ローカル環境での開発

```bash
# 依存関係のインストール
bun install

# 開発サーバーの起動
bun run dev

# ビルド
bun run build

# 拡張機能のビルド
bun run build:extension

# テスト実行
bun run test

# コードフォーマット
bun run format

# リント
bun run lint
```

### Dockerを使用した開発

```bash
# コンテナのビルドと起動
docker-compose up --build

# バックグラウンドで実行する場合
docker-compose up -d
```

## Chrome拡張機能のインストール方法

1. Chrome ブラウザで `chrome://extensions` を開く
2. 「デベロッパーモード」を有効にする
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. ビルドされた `dist` ディレクトリを選択

## 機能

- ストレージ機能の利用
- アクティブタブの操作

## ライセンス

このプロジェクトはプライベートです。

## 開発者向け情報

- `src/background`: バックグラウンドスクリプト
- `public/manifest.json`: 拡張機能の設定ファイル 