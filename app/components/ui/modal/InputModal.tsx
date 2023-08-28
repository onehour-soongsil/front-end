// eslint-disable-next-line
import React, { useState } from "react";
import { Modal, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "axios";
import { signOut } from "next-auth/react";
import NotSameModal from "./NotSameModal"; // Use default export
import SuccessModal from "./SuccessModal"; // Use default export
import NewPasswordModal from "./NewPasswordModal"; // Use default export

export default function InputModal({ title, open, onCancel }) {
  const [password, setPassword] = useState("");
  const [notSame, setNotSame] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);
  const [success, setSuccess] = useState("");

  const checkPassword = () => {
    axios
      .post("/api/auth/checkPassword", {
        password,
      })
      .then(() => {
        setShowNewPasswordModal(true);
        onCancel();
      })
      .catch(err => {
        setNotSame(err.response.data);
      });
  };

  const changePassword = () => {
    axios
      .post("/api/auth/changePassword", {
        password,
        confirm,
      })
      .then(res => {
        setSuccess(res.data);
        setShowNewPasswordModal(false);
      })
      .catch(err => {
        setNotSame(err.response.data);
      });
  };

  return (
    <>
      <NotSameModal title={title} notSame={notSame} onClose={setNotSame} />
      <SuccessModal
        title={title}
        success={success}
        onSignOut={() => signOut({ callbackUrl: "/login" })}
      />
      <NewPasswordModal
        title={title}
        visible={showNewPasswordModal}
        onOk={changePassword}
        onCancel={() => setShowNewPasswordModal(false)}
        setPassword={setPassword}
        setConfirm={setConfirm}
      />
      <Modal
        title={title}
        visible={open}
        onOk={checkPassword}
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
        {open && <p>{open}</p>}
        <Input.Password
          placeholder="input password"
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
      </Modal>
    </>
  );
}
