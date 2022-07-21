/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Link, BrowserRouter } from "react-router-dom";
import "./TextLink.scss";

export interface TextLinkProps {
  [x: string]: any;
  to: string;
  title?: string;
  className?: any;
  children?: any;
  onChange?: any;
  rest?: any;
  onClick?: any;
}

function TextLink(props: TextLinkProps) {
  const { to, title, className, onChange, children, onClick, ...rest } = props;
  onChange({ link: to, title: children });
  return (
    <BrowserRouter>
      <Link
        {...rest}
        to={to}
        onClick={onClick}
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
