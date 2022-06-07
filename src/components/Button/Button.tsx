import React from "react";
import "./Button.scss";
import Button from '@mui/material/Button'
export interface ButtonProps {
  onClick?: any;
  children?: string | any;
  className?: string;
  disabled?: any;
  sx?: any;
  icon?: any;
  type?: any;
}

const Buttons = (props: ButtonProps) => {
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
    <Button
      type={type}
      sx={{ textTransform: 'none', ...sx }}
      onClick={onClick}
      disabled={disabled}
      className={`button-default ${!!className ? className : ""}`}
    >
      {icon ? <span className="icon-style">{!!icon && icon}</span> : <></>}
      {children}
    </Button>
  );
};

export default Buttons;
