import * as React from "react";
import { styled } from "@mui/material/styles";
import SwitchUnstyled, {
  switchUnstyledClasses,
} from "@mui/base/SwitchUnstyled";

const green = {
  500: "#138300",
};

const grey = {
  400: "#707070",
  500: "#AAB4BE",
  600: "#707070",
};

const Root = styled("span")(
  ({ theme }) => `
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  cursor: pointer;

  &.${switchUnstyledClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  & .${switchUnstyledClasses.track} {
    background: ${theme.palette.mode === "dark" ? grey[600] : grey[400]};
    border-radius: 10px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  & .${switchUnstyledClasses.thumb} {
    display: block;
    width: 18px;
    height: 18px;
    top: 1px;
    left: 1px;
    border-radius: 16px;
    background-color: #fff;
    position: relative;
    transition: all 200ms ease;
  }

  &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
    background-color: ${grey[500]};
    box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
  }

  &.${switchUnstyledClasses.checked} {
    .${switchUnstyledClasses.thumb} {
      left: 21px;
      top: 1px;
      background-color: #fff;
    }

    .${switchUnstyledClasses.track} {
      background: ${green[500]};
    }
  }

  & .${switchUnstyledClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }
  `
);

export interface SwitchProps {
  onChange?: any;
  value?: any;
  color?: any;
  className?: any;
  defaultChecked?: any;
  _props?: any;
}

export default function Switch(props: SwitchProps) {
  const { onChange, value, color, className, defaultChecked = false } = props;
  const label = { componentsProps: { input: { "aria-label": "Demo switch" } } };
  return (
    <div>
      <SwitchUnstyled
        {...label}
        {...props._props}
        defaultChecked={defaultChecked}
        className={className}
        component={Root}
        onChange={onChange}
        checked={value}
      />
    </div>
  );
}
