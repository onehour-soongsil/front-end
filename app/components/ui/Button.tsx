import { Button as AntButton } from "antd";

interface ButtonProps {
  type?: "primary" | "ghost" | "dashed" | "link" | "text" | "default";
  text: string;
  onClick?: () => void;
  htmlType?: "button" | "submit";
}

function Button({ type = "default", text = "", onClick, htmlType = "button" }: ButtonProps) {
  return (
    <AntButton
      type={type}
      size="large"
      shape="round"
      onClick={onClick}
      className="bg-button-color font-black"
      htmlType={htmlType}
    >
      {text}
    </AntButton>
  );
}

export default Button;
