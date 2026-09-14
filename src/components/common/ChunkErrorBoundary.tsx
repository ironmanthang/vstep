import React, { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ChunkErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('[ChunkErrorBoundary] Caught error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          className="card-surface"
          style={{
            padding: 'var(--space-8)',
            textAlign: 'center',
            maxWidth: 540,
            margin: 'var(--space-8) auto',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <div style={{ fontSize: 'var(--fs-xl)', fontWeight: 800, color: 'var(--text-primary)' }}>
            {this.props.fallbackTitle || 'Không thể tải mô-đun'}
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)', marginTop: 'var(--space-2)' }}>
            Hệ thống có thể vừa được cập nhật phiên bản mới. Vui lòng tải lại trang để tiếp tục.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-3)',
              justifyContent: 'center',
              marginTop: 'var(--space-5)',
            }}
          >
            <button
              type="button"
              onClick={this.handleReload}
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-contrast)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-2) var(--space-4)',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Làm mới trang
            </button>
            {this.props.onReset && (
              <button
                type="button"
                onClick={() => {
                  this.setState({ hasError: false });
                  this.props.onReset?.();
                }}
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-2) var(--space-4)',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Quay lại
              </button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
