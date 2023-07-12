"use client";

import { Button as AntButton } from "antd";

export default function Button({ text, onClick }) {
  return (
    <AntButton type="primary" size="large" onClick={onClick}>
      {text}
    </AntButton>
  );
}
