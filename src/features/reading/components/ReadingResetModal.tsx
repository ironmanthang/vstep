import React from 'react';
import { ConfirmModal } from '../../../components/common/ConfirmModal';

interface ReadingResetModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ReadingResetModal: React.FC<ReadingResetModalProps> = ({
  isOpen,
  isLoading,
  onClose,
  onConfirm,
}) => {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={() => {
        if (!isLoading) onClose();
      }}
      onConfirm={onConfirm}
      isLoading={isLoading}
      title="Làm lại bài thi Reading này?"
      description={
        <>
          Hành động này sẽ{' '}
          <strong>xóa toàn bộ câu trả lời, ghi chú và kết quả làm bài</strong> của bài thi
          này trên thiết bị và tài khoản đám mây để bạn bắt đầu lại từ đầu.
        </>
      }
      warningText="Kết quả đã nộp trước đó sẽ bị xóa vĩnh viễn khỏi lịch sử làm bài."
      confirmLabel="Xác nhận làm lại"
      cancelLabel="Giữ kết quả hiện tại"
    />
  );
};
