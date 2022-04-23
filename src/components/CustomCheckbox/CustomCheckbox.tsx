import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
// import CheckIcon from "@mui/icons-material/Check";
// import { IcCheckBox } from "../../assets/icons/index";

export interface CustomCheckboxProps {
  onChange?: any;
  value?: any;
  className?: any;
}

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function CustomCheckbox(props: CustomCheckboxProps) {
  const { onChange, value, className } = props;
  return (
    <div>
      <Checkbox
        {...label}
        // icon={<IcOutlineCheckbox />}
        // checkedIcon={<CheckIcon />}
        onChange={(e) => onChange(e.target.checked)}
        checked={value}
        className={className}
        size="medium"
        sx={{
          "&.Mui-checked": {
            color: "#138300",
          },
        }}
      />
    </div>
  );
}
