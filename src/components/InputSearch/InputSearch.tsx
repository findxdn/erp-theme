import React from "react";
import { IcSearch } from "../../assets/icons/index";

export interface InputSearchProps {
  name?: string;
  inputCustom?: any;
}

function InputSearch(props: InputSearchProps) {
  const { inputCustom } = props;
  return (
    <div className={`input-search-social ${inputCustom}`}>
      <IcSearch />
      <input placeholder="Tìm kiếm" className="input-social" />
    </div>
  );
}

export default InputSearch;
