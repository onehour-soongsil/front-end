import React from "react";
import { Modal, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

export default function NewPasswordModal({
  title,
  visible: modalVisible,
  onOk,
  onCancel,
  setPassword,
  setConfirm,
}) {
  return (
    <Modal
      title={title}
      visible={modalVisible}
      onOk={onOk}
      onCancel={onCancel}
      okButtonProps={{
        style: {
          backgroundColor: "red",
          borderColor: "white",
          color: "white",
          transition: "none",
        },
      }}
    >
      <p>새로운 비밀번호를 입력하세요</p>
      <div className="flex flex-col gap-2">
        <Input.Password
          placeholder="input password"
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
        <Input.Password
          placeholder="다시한번 입력해주세요"
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          onChange={e => {
            setConfirm(e.target.value);
          }}
        />
      </div>
    </Modal>
  );
}
