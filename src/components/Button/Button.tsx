import React from "react";
import "./Button.scss";
import { IconButton } from '@mui/material'

export interface ButtonProps {
  onClick?: any;
  children?: string | any;
  className?: string;
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
    <IconButton>
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
    </IconButton>
  );
};

export default Button;
{/* <button
  type={type}
  style={sx}
  onClick={onClick}
  disabled={disabled}
  className={`button-default ${!!className ? className : ""}`}
>
  {icon ? <span className="icon-style">{!!icon && icon}</span> : <></>}
  {children}
</button> */}
