"use client";

import { Modal } from "antd";

export default function ModalComponent({ title, open, onOk, onCancel }) {
  return (
    <Modal
      title={title}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okButtonProps={{
        style: {
          backgroundColor: "red",
          borderColor: "white",
          color: "white",
          transition: "none",
        },
        onMouseOver: e => {
          e.currentTarget.style.backgroundColor = "red";
          e.currentTarget.style.borderColor = "red";
        },
        onMouseOut: e => {
          e.currentTarget.style.backgroundColor = "red";
          e.currentTarget.style.borderColor = "red";
        },
      }}
    >
      {open && <p>{open}</p>}
    </Modal>
  );
}
