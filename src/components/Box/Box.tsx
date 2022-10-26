/* eslint-disable react/forbid-prop-types */
import React from "react";
import "./Box.scss";

export interface BoxProps {
  className: string;
  style?: any;
  children?: any;
  boxTitle?: any;
  isHaveBorderTitle?: any;
  iconTitleLeft?: any;
  iconTitleRight?: any;
  onChange?: any;
}

function Box(props: BoxProps) {
  const {
    className,
    style,
    children,
    boxTitle,
    isHaveBorderTitle,
    iconTitleLeft,
    iconTitleRight,
    onChange,
  } = props;

  const renderHeaderBox = (param: { pTitle: any; isBorder: any }) => {
    const { pTitle = "", isBorder = false } = param;
    onChange({ box_title: boxTitle, value: props });
    return (
      <div
        className={`d-flex justify-content-between align-items-center box-title ${isBorder ? "border-title" : ""
          }`}
      >
        <div className="d-flex align-items-center">
          {iconTitleLeft && iconTitleLeft}
          <p className={`${iconTitleLeft ? "bases__margin-left--15" : ""}`}>
            {pTitle}
          </p>
        </div>
        <div>{iconTitleRight && iconTitleRight}</div>
      </div>
    );
  };

  return (
    <div className={`findx-box ${className}`} style={style}>
      {boxTitle &&
        renderHeaderBox({ pTitle: boxTitle, isBorder: isHaveBorderTitle })}
      <div className="box-content">{children}</div>
    </div>
  );
}

Box.defaultProps = {
  className: "",
  style: {},
  children: null,
  boxTitle: "",
  isHaveBorderTitle: false,
  iconTitleLeft: null,
  iconTitleRight: null,
  onChange: () => { },
};

export default Box;
