import React from "react";
import "./Empty.scss";
import { IcEmpty } from "../../assets/icons";

export interface Empty {
  style: any;
  width: number;
  height: number;
  title: string;
  className: string;
}
export default function Empty(props: Empty) {
  const { style, width = 150, height = 150, title, className } = props;
  return (
    <div style={style} className={className ? className : "container"}>
      <IcEmpty width={width} height={height} />
    </div>
  );
}
