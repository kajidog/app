/// <reference types="chrome" />

// Chrome Extension Background Script

// コンテキストメニューの作成とイベントリスナーの設定
const initializeContextMenus = async () => {
  try {
    // サービスワーカーの初期化を待つ
    await chrome.runtime.getPlatformInfo();
    
    // 既存のメニューを削除
    await chrome.contextMenus.removeAll();
    
    // 新しいメニューを作成
    await chrome.contextMenus.create({
      id: 'showModal',
      title: 'モーダルを表示',
      contexts: ['editable']
    });
    
    console.log('Context menu created successfully');

    // コンテキストメニューがクリックされたときのイベントリスナー
    chrome.contextMenus.onClicked.addListener((info, tab) => {
      console.log('Context menu clicked:', info);
      if (info.menuItemId === 'showModal') {
        // アクティブなタブにメッセージを送信
        if (tab?.id) {
          chrome.tabs.sendMessage(tab.id, { action: 'showModal' });
        }
      }
    });

  } catch (error) {
    console.error('Error initializing context menus:', error);
  }
};

// ブラウザ起動時のイベントリスナー
chrome.runtime.onStartup.addListener(async () => {
  console.log('Browser started');
  await initializeContextMenus();
});

// 拡張機能がインストールされたときのイベントリスナー
chrome.runtime.onInstalled.addListener(async (details) => {
  console.log('Extension installed:', details);
  await initializeContextMenus();
});

// メッセージリスナーの設定
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  console.log('Received message:', message);
  sendResponse({ status: 'received' });
});

// サービスワーカーをアクティブに保つ
chrome.runtime.onConnect.addListener((port) => {
  console.log('Port connected:', port);
});

// エクスポートが必要な場合は以下を追加
export {}; 