"use client";

import { Button as AntButton } from "antd";

interface ButtonProps {
  danger?: boolean;
  type?: "primary" | "ghost" | "dashed" | "link" | "text" | "default";
  text: string;
  onClick?: () => void;
}

function Button({ danger, type, text, onClick }: ButtonProps) {
  return (
    <AntButton type={type} size="large" onClick={onClick} danger={danger}>
      {text}
    </AntButton>
  );
}

Button.defaultProps = {
  danger: false,
  type: "default",
  onClick: () => {},
};

export default Button;
