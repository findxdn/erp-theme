import React from 'react';
import styles from "./PlaceHolder.module.scss";


export interface PlaceHolderProps {
    _props?: string;
    className?: string;
  }
function PlaceHolder (props: PlaceHolderProps) {
    const {
        _props,
        className
    }=props;
    return (
        <div className={`${styles["placeholder-content"]} ${className}`}>
            <div className={styles["placeholder-content_item"]}></div>
        </div>
    )
}
export default PlaceHolder;