import React from "react";
import { IcRowDownWhite, IcUp } from "../../assets/icons/index";
import './ButtonSearch.scss'

export interface ButtonSearchProps {
  onClick?: any;
  children?: string | any;
  className?: string;
  disabled?: any;
  disabledButton?: any;
  sx?: any;
  sxButton?: any;
  icon?: any;
  type?: any;
  typeButton?: any;
  onClickBtnSearch?: any;
  onClickBtnSelect?: any;
  isDown?: any;
  ref?: any;
  refButton?: any;
  _props?: any;
  _propsButton?: any;
}

function ButtonSearch(props: ButtonSearchProps) {
  const {
    type,
    typeButton,
    sxButton,
    sx,
    onClickBtnSelect,
    onClickBtnSearch,
    disabled,
    disabledButton,
    className,
    ref,
    refButton,
    children,
    isDown,
    _props,
    _propsButton,
  } = props;
  const [isDownStatus, setIsDownStatus] = React.useState(isDown ?? false)
  return (
    <div className={`button-select-erp ${!!className ? className : ""}`} >
      <button
        type={type ?? "button"}
        disabled={disabled}
        style={sx}
        onClick={onClickBtnSearch}
        className='btn-search'
        ref={ref}
        {...props._props}
      >
        {children}
      </button>
      <button
        type={typeButton ?? "button"}
        disabled={disabledButton}
        style={sxButton}
        ref={refButton}
        onClick={() => {
          setIsDownStatus(!isDownStatus)
          if (onClickBtnSelect) onClickBtnSelect()
        }}
        className='btn-select'
        {...props._propsButton}
      >
        {isDownStatus ? <IcRowDownWhite /> : <IcUp />}
      </button>
    </div >
  );
}

export default ButtonSearch;
