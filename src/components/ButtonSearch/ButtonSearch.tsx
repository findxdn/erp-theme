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
  onClickBtn?: any;
  isDown?: any;
}

function ButtonSearch(props: ButtonSearchProps) {
  const {
    type,
    sx,
    onClickBtn,
    disabled,
    className,
    children,
    isDown,
  } = props;
  const [isDownStatus, setIsDownStatus] = React.useState(isDown ?? false)
  return (
    <button
      type={type ?? 'button'}
      disabled={disabled}
      style={sx}
      onClick={() => {
        setIsDownStatus(!isDownStatus)
        if (onClickBtn) {
          onClickBtn()
        }
      }}
      className="button-select-erp"
    >
      <div className={`btn-search ${!!className ? className : ''}`}>
        {children}
      </div>
      <div className={`btn-select ${!!className ? className : ''}`}>
        {isDownStatus ? <IcRowDownWhite /> : <IcUp />}
      </div>
    </button>
  );
}

export default ButtonSearch;
