FROM oven/bun:1

WORKDIR /app

# システムパッケージのインストール
RUN apt-get update && apt-get install -y zip git

# パッケージファイルのコピーとインストール
COPY package*.json ./
RUN bun install

# TypeScriptの型定義をインストール
RUN bun add -d @types/chrome

# ソースコードのコピー
COPY . .

# 開発用ポートの公開
EXPOSE 5173

# 開発サーバーの起動
CMD ["bun", "run", "dev"] 