/* eslint-disable no-shadow */
import React, { useState } from "react";
import { RadioGroup, FormControlLabel, FormControl } from "@mui/material";
import _ from "lodash";
import MessageError from "../../utils/MessageError";
import CustomRadio from "../../components/CustomRadio";

export interface MultiRadioProps {
  name: string;
  placeholder?: any;
  control?: any;
  options?: any;
  row?: any;
  onChange?: any;
  errors?: any;
  className?: string;
}

export default function MultiRadio(props: MultiRadioProps) {
  const { name, control, options, row, errors, onChange, className } = props;
  const [value, setValue] = React.useState<string | null>(options[0]);
  let showError = false;
  let error = null
  let arr = name.split(".");
  if (arr.length >= 1 && errors !== null) {
    let result = arr.reduce((rs, e) => {
      if (rs[e]) {
        return rs = rs[e]
      }
      return {}

    }, errors)
    error = result
    showError = !_.isEmpty(error);
  }
  return (
    <FormControl error={showError} fullWidth>
      <RadioGroup
        name={name}
        row={row}
        value={value}
        onChange={(event: any, newValue: string | null) => {
          onChange(newValue);
          setValue(newValue);
        }}
        className={className}
      >
        {options.map(
          (options: {
            value: any;
            label:
            | string
            | number
            | React.ReactElement<
              any,
              string | React.JSXElementConstructor<any>
            >;
          }) => (
            <FormControlLabel
              key={options.value}
              value={options.value}
              control={control}
              label={options.label}
            />
          )
        )}
      </RadioGroup>
      {error?.message && (
        <MessageError type={error?.type} message={error?.message} />
      )}
    </FormControl>
  );
}

MultiRadio.defaultProps = {
  name: "",
  options: [],
  row: false,
  control: <CustomRadio />,
  onChange: () => { },
};
