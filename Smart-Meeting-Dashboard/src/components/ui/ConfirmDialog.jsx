// components/ui/ConfirmDialog.jsx
import React from 'react'
import Modal from './Modal'
import Button from './Button'

const ConfirmDialog = ({ isOpen, message, confirmLabel = 'Confirm', onConfirm, onCancel }) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <p>{message}</p>
      <div className="confirm-dialog-actions">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}

export default ConfirmDialog