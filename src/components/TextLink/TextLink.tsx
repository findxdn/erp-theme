/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Link, BrowserRouter } from "react-router-dom";

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
    <BrowserRouter>
      <Link
        to={to}
        {...rest}
        className={`findx-text-link ${className}`}
        title={title}
      >
        <div>{children}</div>
      </Link>
    </BrowserRouter>
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
