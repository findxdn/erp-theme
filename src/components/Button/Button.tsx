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
  ref?: any,
  _props?: any,
  type?: any;
}

const Buttons = React.forwardRef((props: ButtonProps, ref) => {
  const {
    onClick,
    children,
    className,
    sx,
    disabled,
    icon,
    _props,
    type = "button",
  } = props;
  return (
    <Button
      type={type}
      sx={{ textTransform: 'none', padding: '10px 20px', ...sx }}
      onClick={onClick}
      disabled={disabled}
      className={`button-default ${!!className ? className : ""}`}
      ref={ref}
      {...props._props}
    >
      {icon ? <span className="icon-style">{!!icon && icon}</span> : <></>}
      {children}
    </Button>
  );
})

export default Buttons;
