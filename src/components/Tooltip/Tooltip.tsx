import React from "react";

export interface TooltipProps {
  title: string;
  className: string;
  style: object;
  _props?: any;
  children?: any;
}

export default function Tooltip(props: TooltipProps) {
  const {
    _props,
    title='',
    className='',
    style={},
    children=''
  } = props;
  return (
    <div 
        {..._props}
        title={title}
        className={className}
        style={style}
    >
      {props.children}
    </div>
  );
}
