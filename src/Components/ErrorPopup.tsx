import { useEffect, useRef } from 'react';

export default function ErrorPopup({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(onClose, 6000);
    return () => clearTimeout(timeout);
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={popupRef}
      style={{
        position: 'fixed',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#f44336',
        color: 'white',
        padding: '12px 24px',
        borderRadius: 8,
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
        zIndex: 9999,
        fontWeight: 'bold',
        maxWidth: '90%',
      }}
    >
      ⚠️ {message}
      <button
        onClick={onClose}
        style={{
          marginLeft: 12,
          background: 'transparent',
          border: 'none',
          color: 'white',
          fontSize: '16px',
          cursor: 'pointer',
          float: 'right',
        }}
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  );
}
