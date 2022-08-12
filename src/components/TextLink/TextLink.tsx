/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Link, BrowserRouter } from "react-router-dom";
import "./TextLink.scss";

export interface TextLinkProps {
  url?:string;
  title?: string;
  className?: any;
  children?: any;
}

function TextLink(props: TextLinkProps) {
  const { url, className, children } = props;
  return (
    <a href={url} onClick={(e)=> e.preventDefault()}  className={`findx-text-link ${className}`}>
        {children}
    </a>
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
