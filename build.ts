import { $ } from 'bun';
import fs from 'node:fs';
import path from 'node:path';

async function main() {
    try {
        // ビルドディレクトリのクリーンアップ
        console.log('🧹 ビルドディレクトリをクリーンアップしています...');
        await $`rm -rf dist`;

        // TypeScriptのコンパイルとViteビルドの実行
        console.log('🔨 プロジェクトをビルドしています...');
        await $`bun run build`;

        // content scriptのビルド
        console.log('🔨 Content Scriptをビルドしています...');
        await $`bun build src/content/content.tsx --outfile=dist/content.js`;

        // background scriptのビルド
        console.log('🔨 Background Scriptをビルドしています...');
        await $`bun build src/background/background.ts --outfile=dist/background.js`;

        // 静的ファイルのコピー
        console.log('📁 静的ファイルをコピーしています...');
        if (!fs.existsSync('dist')) {
            fs.mkdirSync('dist');
        }

        // マニフェストのコピー
        fs.copyFileSync('public/manifest.json', 'dist/manifest.json');

        // アイコンファイルのコピー
        ['icon16.svg', 'icon48.svg', 'icon128.svg'].forEach(icon => {
            fs.copyFileSync(
                path.join('public', icon),
                path.join('dist', icon)
            );
        });

        // ZIPファイルの作成
        console.log('📦 拡張機能をパッケージングしています...');
        const version = JSON.parse(fs.readFileSync('package.json', 'utf-8')).version;
        await $`cd dist && zip -r ../chrome-extension-v${version}.zip ./*`;

        console.log('✨ ビルドが完了しました！');
        console.log(`📦 拡張機能のパッケージが作成されました: chrome-extension-v${version}.zip`);
    } catch (error) {
        console.error('❌ ビルド中にエラーが発生しました:', error);
        process.exit(1);
    }
}

main(); 