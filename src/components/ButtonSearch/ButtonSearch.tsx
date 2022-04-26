import React from "react";
import { IconRowDown, IcUp } from "../../assets/icons/index";

export interface ButtonSearchProps {
  onClick?: any;
  children?: string | any;
  className?: string;
  disabled?: any;
  sx?: any;
  icon?: any;
  type?: any;
  onClickBtnSearch?: any;
  onClickBtnSelect?: any;
  isDown?: any;
}

function ButtonSearch(props: ButtonSearchProps) {
  const {
    type,
    sx,
    onClickBtnSearch,
    onClickBtnSelect,
    disabled,
    className,
    children,
    isDown,
  } = props;
  return (
    <div className="button-select">
      <button
        type={type ?? "button"}
        disabled={disabled}
        style={sx}
        onClick={onClickBtnSearch}
        className={`btn-search ${!!className ? className : ""}`}
      >
        {children}
      </button>
      <button
        type={type ?? "button"}
        disabled={disabled}
        style={sx}
        onClick={onClickBtnSelect}
        className={`btn-select ${!!className ? className : ""}`}
      >
        {isDown ? <IconRowDown /> : <IcUp />}
      </button>
    </div>
  );
}

export default ButtonSearch;