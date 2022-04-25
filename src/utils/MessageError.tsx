import React from "react";

export interface MessageErrorProps {
  type: string;
  message: string;
}

function MessageError(props: MessageErrorProps) {
  const { type, message } = props;

  const getMessage = () => {
    if (message) {
      return message;
    }
    switch (type) {
      case "required":
        return "Vui lòng điền thông tin";
      case "minLength":
        return "Vui lòng nhập tối đa số kí tự";
      default:
        break;
    }
  };

  return <p style={{ color: "red" }}>{getMessage()}</p>;
}

export default MessageError;
