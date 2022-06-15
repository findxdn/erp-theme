import React from "react";
import Radio from "@mui/material/Radio";
import {
  RadioIcon,
  RadioIconCheck as IconCheck,
} from "../../assets/icons/index";

const style = {
  width: "100%",
  marginTop: "-10px",
  fontSize: 14,
  zIndex: "1",
};

export interface SwitchProps {
  value?: any;
}

export default function CustomRadio(props: SwitchProps) {
  const { value } = props;

  return (
    <div>
      <Radio
        // eslint-disable-next-line react/jsx-props-no-spreading
        value={value}
        icon={<RadioIcon />}
        checkedIcon={<IconCheck />}
        sx={style}
      />
    </div>
  );
}
