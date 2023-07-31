import { Button as AntButton } from "antd";

interface ButtonProps {
  type: "primary" | "ghost" | "dashed" | "link" | "text" | "default";
  text: string;
  onClick?: () => void;
}

function Button({ type = "default", text, onClick }: ButtonProps) {
  return (
    <AntButton type={type} size="large" onClick={onClick} className="bg-button-color font-black">
      {text}
    </AntButton>
  );
}

Button.defaultProps = {
  onClick: () => {}, // 기본값으로 빈 함수를 지정하거나, 필요에 따라 다른 기본 동작을 설정할 수 있습니다.
};

export default Button;
