import React from "react";
import { Modal } from "antd";

export default function NotSameModal({ title, notSame, onClose }) {
  return (
    <Modal
      title={title}
      visible={Boolean(notSame)}
      onOk={() => onClose("")}
      onCancel={() => onClose("")}
      okButtonProps={{
        style: {
          backgroundColor: "red",
          borderColor: "white",
          color: "white",
          transition: "none",
        },
      }}
    >
      <p>{notSame && notSame}</p>
    </Modal>
  );
}
