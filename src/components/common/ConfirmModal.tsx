import React, { useEffect, useRef } from 'react';
import './ConfirmModal.css';

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  title: string;
  description: React.ReactNode;
  warningText?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  loadingLabel?: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  title,
  description,
  warningText,
  confirmLabel = 'Xác nhận xóa & Đặt lại',
  cancelLabel = 'Hủy bỏ',
  loadingLabel = 'Đang xóa...',
}) => {
  const cancelBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Default focus on Cancel button to prevent accidental confirmation
    const timer = setTimeout(() => {
      cancelBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="reset-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <div className="reset-modal-card">
        {/* Warning Icon Badge */}
        <div className="reset-modal-icon-wrap" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        {/* Content */}
        <h2 id="confirm-modal-title" className="reset-modal-title">
          {title}
        </h2>

        <div className="reset-modal-desc">
          {description}
        </div>

        {warningText && (
          <div className="reset-modal-alert">
            <span className="reset-modal-alert-tag">Cảnh báo</span>
            <span>{warningText}</span>
          </div>
        )}

        {/* Two-step Buttons: Cancel is default / high emphasis */}
        <div className="reset-modal-actions">
          <button
            ref={cancelBtnRef}
            type="button"
            className="reset-modal-btn reset-modal-btn-cancel"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className="reset-modal-btn reset-modal-btn-danger"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? loadingLabel : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
