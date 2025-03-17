import React, { useEffect, useRef } from 'react';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const modalStyle: React.CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  zIndex: 10001,
  minWidth: '300px',
  minHeight: '200px',
  maxWidth: '90vw',
  maxHeight: '90vh',
  overflow: 'auto',
  cursor: 'move',
  margin: 'auto',
  pointerEvents: 'auto',
};

export const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let isDragging = false;

    const dragMouseDown = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest('button')) return;
      e.preventDefault();
      isDragging = true;
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    };

    const elementDrag = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      const newTop = modal.offsetTop - pos2;
      const newLeft = modal.offsetLeft - pos1;
      
      // 画面内に収まるように制限
      const rect = modal.getBoundingClientRect();
      const maxTop = window.innerHeight - rect.height;
      const maxLeft = window.innerWidth - rect.width;
      
      modal.style.top = `${Math.min(Math.max(0, newTop), maxTop)}px`;
      modal.style.left = `${Math.min(Math.max(0, newLeft), maxLeft)}px`;
    };

    const closeDragElement = () => {
      isDragging = false;
      document.onmouseup = null;
      document.onmousemove = null;
    };

    modal.onmousedown = dragMouseDown;

    return () => {
      modal.onmousedown = null;
      document.onmouseup = null;
      document.onmousemove = null;
    };
  }, []);

  return (
    <div ref={modalRef} style={modalStyle}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '10px',
        cursor: 'move',
        userSelect: 'none'
      }}>
        <h3>モーダル</h3>
        <button 
          onClick={onClose} 
          style={{ 
            cursor: 'pointer',
            padding: '4px 8px',
            border: 'none',
            background: 'none',
            fontSize: '20px'
          }}
        >
          ×
        </button>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}; 