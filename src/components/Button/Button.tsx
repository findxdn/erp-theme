import React from "react";
import "./Button.scss";

export interface ButtonProps {
  label: string;
  onClick?: any;
  children?: any;
  className?: any;
  disabled?: any;
  sx?: any;
  icon?: any;
  type?: any;
}

const Button = (props: ButtonProps) => {
  const {
    onClick,
    children,
    className,
    sx,
    disabled,
    icon,
    type = "button",
  } = props;
  return (
    <button
      type={type}
      style={sx}
      onClick={onClick}
      disabled={disabled}
      className={`button-default ${!!className ? className : ""}`}
    >
      {icon ? <span className="icon-style">{!!icon && icon}</span> : <></>}
      {children}
    </button>
  );
};

export default Button;
