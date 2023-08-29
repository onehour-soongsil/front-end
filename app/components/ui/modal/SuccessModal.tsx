import React from "react";
import { Modal } from "antd";

export default function SuccessModal({ title, success, onSignOut }) {
  return (
    <Modal
      title={title}
      visible={Boolean(success)}
      onOk={onSignOut}
      onCancel={onSignOut}
      okButtonProps={{
        style: {
          backgroundColor: "red",
          borderColor: "white",
          color: "white",
          transition: "none",
        },
      }}
    >
      <p>{success && success}</p>
    </Modal>
  );
}
