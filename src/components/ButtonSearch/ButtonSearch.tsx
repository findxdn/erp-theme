import React from "react";
import { IcRowDownWhite, IcUp } from "../../assets/icons/index";
import './ButtonSearch.scss'

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
    onClickBtnSelect,
    onClickBtnSearch,
    disabled,
    className,
    children,
    isDown,
  } = props;
  const [isDownStatus, setIsDownStatus] = React.useState(isDown ?? false)
  return (
    <div className="button-select-erp">
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
        onClick={() => {
          setIsDownStatus(!isDownStatus)
          if (onClickBtnSelect) onClickBtnSelect()
        }}
        className={`btn-select ${!!className ? className : ""}`}
      >
        {isDownStatus ? <IcRowDownWhite /> : <IcUp />}
      </button>
    </div>
  );
}

export default ButtonSearch;
