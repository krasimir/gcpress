import React, { useState } from 'React';
import { Modal } from 'antd';

function AreYouSure({ text, isModalOpen, handleOk, handleCancel }) {
  return (
    <Modal
      title="Are you sure?"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelText='No'
      okText='Yes'>
      <p>{ text }</p>
    </Modal>
  )
}

export function useAreYouSure() {
  const [ modalProps, setModalProps ] = useState({
    text: 'Are you sure',
    isModalOpen: false,
    ok: () => {}
  });
  
  return {
    AreYouSureUI: (
      <AreYouSure
        text={modalProps.text}
        isModalOpen={modalProps.isModalOpen}
        handleOk={() => {
          modalProps.ok();
          setModalProps({ ...modalProps, isModalOpen: false });
        }}
        handleCancel={() => {
          setModalProps({ ...modalProps, isModalOpen: false });
        }} />
    ),
    areYouSure: (onOK, text) => {
      setModalProps({
        isModalOpen: true,
        ok: onOK,
        text: text || 'Are you sure?'
      });
    }
  }
}