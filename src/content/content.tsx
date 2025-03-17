/// <reference types="chrome"/>

import { createRoot } from 'react-dom/client';
import { Modal } from '../presentation/components/Modal';

console.log('Content Script loaded');

// DOMの変更を監視する
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
                if (node instanceof HTMLElement) {
                    // 要素に対する処理を実装
                }
            });
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// メッセージリスナー
chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
  if (message.action === 'showModal') {
    // 既存のモーダルを削除
    const existingModal = document.getElementById('extension-modal-root');
    if (existingModal) {
      existingModal.remove();
    }

    // モーダル用のコンテナを作成
    const modalContainer = document.createElement('div');
    modalContainer.id = 'extension-modal-root';
    modalContainer.style.position = 'fixed';
    modalContainer.style.top = '0';
    modalContainer.style.left = '0';
    modalContainer.style.width = '100%';
    modalContainer.style.height = '100%';
    modalContainer.style.zIndex = '10000';
    modalContainer.style.pointerEvents = 'none';
    document.body.appendChild(modalContainer);

    // Reactルートを作成
    const root = createRoot(modalContainer);
    root.render(
      <Modal onClose={() => {
        modalContainer.remove();
      }}>
        ここにモーダルの内容を表示します
      </Modal>
    );
  }
}); 