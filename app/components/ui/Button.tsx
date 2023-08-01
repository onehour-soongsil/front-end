import { Button as AntButton } from "antd";

interface ButtonProps {
  type?: "primary" | "ghost" | "dashed" | "link" | "text" | "default";
  text: string;
  onClick?: () => void;
  htmlType?: "button" | "submit";
  className: string;
}

function Button({
  type = "default",
  text = "",
  onClick,
  htmlType = "button",
  className,
}: ButtonProps) {
  const combinedClassName = `bg-button-color font-white ${className}`;
  const buttonStyle = type === "ghost" ? { color: "white" } : {};

  return (
    <AntButton
      type={type}
      shape="round"
      onClick={onClick}
      className={combinedClassName}
      htmlType={htmlType}
      style={buttonStyle}
    >
      {text}
    </AntButton>
  );
}

export default Button;
