import React from "react";
import "./Footer.scss";

export interface FooterProps {
  className?: string;
  style?: any;
  children?: any;
}
function Footer(props: FooterProps) {
  const { className, style, children } = props;
  return (
    <div
      style={style}
      className={`findx-footer bases__height--50 ${className}`}
    >
      {children}
    </div>
  );
}

Footer.defaultProps = {
  className: "",
  style: {},
  children: null,
};
export default Footer;
