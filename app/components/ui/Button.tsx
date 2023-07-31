import { Button as AntButton } from "antd";

interface ButtonProps {
  type?: "primary" | "ghost" | "dashed" | "link" | "text" | "default";
  text: string;
  onClick?: () => void;
}

function Button({ type = "default", text, onClick }: ButtonProps = { text: "" }) {
  return (
    <AntButton type={type} size="large" onClick={onClick} className="bg-button-color font-black">
      {text}
    </AntButton>
  );
}

export default Button;
