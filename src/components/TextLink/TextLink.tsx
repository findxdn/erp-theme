/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Link } from "react-router-dom";

export interface TextLinkProps {
  [x: string]: any;
  to: string;
  title?: string;
  className?: any;
  children?: any;
  onChange?: any;
}

function TextLink(props: TextLinkProps) {
  const { to, title, className, onChange, children, ...rest } = props;
  onChange({ link: to, title: children });
  return (
    <Link
      to="/xxx/vc"
      {...rest}
      className={`findx-text-link ${className}`}
      title={title}
    >
      <div>{children}</div>
    </Link>
  );
}

TextLink.defaultProps = {
  to: "/",
  title: "",
  className: "",
  children: null,
  onChange: () => {},
};

export default TextLink;
