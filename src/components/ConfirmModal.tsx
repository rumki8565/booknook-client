"use client";

import type { JSX, MouseEvent } from "react";

interface ConfirmModalProps {
  title: string;
  message: string;
  confirmLabel: string;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  title,
  message,
  confirmLabel,
  loading,
  onConfirm,
  onCancel,
}: ConfirmModalProps): JSX.Element {
  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>): void => {
    if (event.target === event.currentTarget && !loading) {
      onCancel();
    }
  };

  return (
    <div
      className="modal modal-open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      onClick={handleBackdropClick}
    >
      <div className="modal-box">
        <h3 id="confirm-title" className="text-xl font-bold text-primary">
          {title}
        </h3>
        <p className="py-4 text-base-content/80">{message}</p>
        <div className="modal-action">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="btn"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="btn btn-error"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
