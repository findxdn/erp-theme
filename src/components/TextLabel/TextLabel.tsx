/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import "./TextLabel.scss";

export interface TextLabelProps {
  className: string;
  children?: string;
  isInfo?: any;
  isSuccess?: any;
  isWarning?: any;
  isDanger?: any;
  onChange?: any;
}

function TextLabel(props: TextLabelProps) {
  const {
    children,
    className,
    isInfo,
    isSuccess,
    isWarning,
    isDanger,
    onChange,
    ...rest
  } = props;
  onChange(children);
  return (
    <div>
      <p
        {...rest}
        className={`
          findx-text-label 
          ${isInfo ? "findx-text-label-info" : ""}
          ${isSuccess ? "findx-text-label-success" : ""}
          ${isWarning ? "findx-text-label-warning" : ""}
          ${isDanger ? "findx-text-label-danger" : ""}
          ${className}`}
      >
        {children}
      </p>
    </div>
  );
}

TextLabel.defaultProps = {
  className: "",
  isInfo: false,
  isSuccess: false,
  isWarning: false,
  isDanger: false,
  children: null,
  onChange: () => {},
};

export default TextLabel;
