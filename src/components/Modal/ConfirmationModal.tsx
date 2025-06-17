import React from 'react';
import { Modal, Button, Space } from 'antd';
import { GenericConfirmationModalProps } from '@/types/common';

const ConfirmationModal: React.FC<GenericConfirmationModalProps> = ({ visible, onConfirm, onCancel, title, message, disable }) => {
  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      title={title || ""}
      open={visible}
      onOk={handleConfirm}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel} disabled={disable}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleConfirm} disabled={disable}>
          Confirm
        </Button>,
      ]}
    >
      <Space size="middle">
        <p>{message || "Are you sure you want to proceed?"}</p>
      </Space>
    </Modal>
  );
};

export default ConfirmationModal;
