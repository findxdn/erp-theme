/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React from "react";
import LazyLoad from "react-lazyload";
// import { ImageDefault } from "../../assets/images/images";

export interface ImageProps {
  width?: string;
  height?: string;
  className: string;
  src?: string;
  defaultImage?: any;
  style?: any;
  seo?: any;
  srcset?: any;
  sizes?: any;
  lazyLoad?: any;
  lazyOffset?: any;
  lazyHeight?: any;
  lazyPlaceholder?: any;
  onClick?: any;
}

function Image(props: ImageProps) {
  const {
    width,
    height,
    className,
    src,
    defaultImage,
    style,
    seo = "fm.com.vn",
    srcset,
    sizes,
    lazyLoad,
    lazyOffset,
    lazyHeight,
    lazyPlaceholder,
    onClick,
  } = props;
  const onError = (e: { target: { onerror: null; src: any } }) => {
    e.target.onerror = null;
    e.target.src = defaultImage;
  };
  const onClickImage = () => {
    if (typeof onClick === "function") {
      onClick();
    }
  };
  return lazyLoad ? (
    <LazyLoad
      height={lazyHeight}
      offset={lazyOffset}
      placeholder={lazyPlaceholder}
    >
      <img
        role="button"
        aria-hidden
        width={width}
        height={height}
        style={style}
        className={`${className ?? ""}`}
        src={src ?? defaultImage}
        onError={onError}
        onClick={onClickImage}
        alt={seo}
        title={seo}
        srcSet={srcset?.toString()}
        size={sizes}
      />
    </LazyLoad>
  ) : (
    <img
      role="button"
      aria-hidden
      width={width}
      height={height}
      style={style}
      className={`object_fit_cover ${className ?? ""}`}
      src={src ?? defaultImage}
      onError={onError}
      onClick={onClick}
      alt={seo}
      title={seo}
      srcSet={srcset?.toString()}
      size={sizes}
    />
  );
}
Image.defaultProps = {
  srcset: [],
  sizes: "",
  lazyLoad: true,
  lazy_offset: 400,
  lazy_height: 300,
  lazy_placeholder: <div>loading...</div>,
};
export default Image;
