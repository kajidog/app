# Chrome Extension

## 機能

- コンテキストメニュー機能
- モーダルウィンドウ
- アクティブタブとの連携
- クロスオリジン通信

## 技術スタック

- **フレームワーク**: React 18
- **言語**: TypeScript
- **ビルドツール**: Vite
- **パッケージマネージャー**: Bun
- **状態管理**: Zustand
- **バリデーション**: class-validator
- **日付処理**: date-fns

## 開発環境のセットアップ

### 必要条件

- Node.js 18以上
- Bun 1.0以上
- Chrome ブラウザ

### インストール

```bash
# 依存関係のインストール
bun install

# 開発サーバーの起動
bun run dev

# 拡張機能のビルド
bun run build:extension
```

### 開発用コマンド

- `bun run dev`: 開発サーバーを起動
- `bun run build`: プロジェクトをビルド
- `bun run preview`: ビルドしたプロジェクトをプレビュー
- `bun run lint`: ESLintによるコード品質チェック
- `bun run test`: テストの実行
- `bun run format`: Prettierによるコードフォーマット
- `bun run clean`: ビルド成果物の削除
- `bun run build:extension`: 拡張機能のビルド

## Chrome拡張機能のインストール方法

1. Chrome ブラウザで `chrome://extensions` を開く
2. 右上の「デベロッパーモード」を有効化
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. `dist` ディレクトリを選択

## Docker サポート

Dockerを使用して開発環境を構築することもできます：

```bash
# Dockerイメージのビルド
docker-compose build

# コンテナの起動
docker-compose up
```

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。
