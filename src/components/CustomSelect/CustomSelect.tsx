import { Tooltip } from "@mui/material";
import _ from "lodash";
import React from "react";
import Select, { components } from "react-select";
import MessageError from "../../utils/MessageError";
import SelectStyles from "./Select.module.scss";
import IconDropDownForm from "../../assets/icons/system/ic-drop-down-form";
import IconDropUpForm from "../../assets/icons/system/ic-drop-up-form";
export interface CustomSelectProps {
  name: string;
  className?: string;
  placeholder?: any;
  onChange?: any;
  options?: any;
  register?: any;
  errors?: any;
  styles?: any;
  defaultValue?: any;
  _props?: any;
  ref?: any;
  value?: any;
  fieldref?: any;
  isTooltip?: any;
  disabled?: any;
  isSearchOpitons?: any;
  onChangeInput?: any;
  noOptionsText?: any;
  isClearable?: any;
  isMulti?: any;
  escapeClearsValue?: any;
  noOptionsMessage?: any;
  isSearchable?: any;
  menuPortalTarget?: any;
  group?: any;
  maxToShowProps?: any;
  hideSelectedOptions?: any;
  customComponents: any;
  backgroundColorActive: any;
  colorActive: any;
  height: any;
  colorFocusOption: any;
}
const CustomSelect = React.forwardRef((props: CustomSelectProps, ref) => {
  const {
    escapeClearsValue = true,
    placeholder = "Chọn",
    isSearchable = true,
    noOptionsMessage = () => "Không tìm thấy",
    errors = [],
    isTooltip = false,
    name = "custom-select-name",
    disabled = false,
    value,
    fieldref = null,
    options = [],
    isClearable = true,
    isMulti = false,
    _props,
    styles = {},
    menuPortalTarget,
    group,
    hideSelectedOptions = false,
    maxToShowProps = 10,
    customComponents = {},
    backgroundColorActive = "#d8d7d7",
    colorActive = "#333333",
    height = 32,
    colorFocusOption = "#d8d7d7",
  } = props;
  const onChange = (
    val: { key: any; map: (arg0: (x: any) => any) => any },
    action: any
  ) => {
    if (!isMulti) {
      props.onChange(val?.key, action);
    } else {
      let rs = val.map((x: { key: any }) => x?.key);
      props.onChange(rs, action);
    }
  };
  let showError = false;

  let arr = name.split(".");

  let error = null;

  if (arr.length >= 1 && errors !== null) {
    let result = arr.reduce((rs, e) => {
      if (rs[e]) {
        return (rs = rs[e]);
      }
      return {};
    }, errors);
    error = result;
    showError = !_.isEmpty(error);
  }
  const getValue = () => {
    if (!isMulti) {
      if (group) {
        let object = null;
        options?.map((v: { key: any }) => {
          let indexValue = v?.options?.findIndex(
            (x: { key: any }) => x?.key == value
          );
          if (indexValue != -1) {
            object = v?.options[indexValue];
          }
        });
        return object;
      } else {
        let indexValue = options?.findIndex(
          (x: { key: any }) => x?.key == value
        );
        if (indexValue != -1) {
          return options[indexValue];
        }
        return null;
      }
    } else {
      if (group) {
        let object: any = [];
        options?.map((v: any) => {
          value?.map((x: any) => {
            let indexValue = v?.options?.findIndex((_xx: any) => _xx?.key == x);
            if (indexValue != -1) {
              object.push(v?.options[indexValue]);
            }
          });
        });
        return object;
      } else {
        return options?.filter((x: { key: any }) => value.includes(x.key));
      }
    }
  };

  const [clearable, setIsClearable] = React.useState(false);

  const ClearIndicatorDemo = (props: any) => {
    const {
      innerProps: { ref, ...restInnerProps },
    } = props;

    return (
      <div
        {...restInnerProps}
        ref={ref}
        style={{ display: `${clearable ? "" : "none"}` }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.46967 6.46967C6.76256 6.17678 7.23744 6.17678 7.53033 6.46967L17.5303 16.4697C17.8232 16.7626 17.8232 17.2374 17.5303 17.5303C17.2374 17.8232 16.7626 17.8232 16.4697 17.5303L6.46967 7.53033C6.17678 7.23744 6.17678 6.76256 6.46967 6.46967Z"
            fill="#707070"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.5303 6.46967C17.8232 6.76256 17.8232 7.23744 17.5303 7.53033L7.53033 17.5303C7.23744 17.8232 6.76256 17.8232 6.46967 17.5303C6.17678 17.2374 6.17678 16.7626 6.46967 16.4697L16.4697 6.46967C16.7626 6.17678 17.2374 6.17678 17.5303 6.46967Z"
            fill="#707070"
          />
        </svg>
      </div>
    );
  };

  const MultiValue = ({ index, getValue, ...props }) => {
    const maxToShow = maxToShowProps;
    const overflow = getValue()
      .slice(maxToShow)
      .map((x) => x.label);

    return index < maxToShow ? (
      <components.MultiValue {...props} />
    ) : index === maxToShow ? (
      <MoreSelectedBadge items={overflow} />
    ) : null;
  };
  const MoreSelectedBadge = ({ items }) => {
    const style = {
      marginLeft: "auto",
      background: "#d4eefa",
      borderRadius: "4px",
      fontSize: "11px",
      padding: "3px",
      order: 99,
      whiteSpace: "nowrap",
    };

    const title = items.join(", ");
    const length = items.length;
    const label = `+ ${length}`;

    return (
      <div style={style} title={title}>
        {label}
      </div>
    );
  };

  let MultiValueProps = {};
  if (isMulti) {
    MultiValueProps = MultiValue;
  }
  const DropdownIndicator = (prop) => {
    return components.DropdownIndicator && prop.selectProps.menuIsOpen ? (
      <components.DropdownIndicator {...prop}>
        <IconDropUpForm />
      </components.DropdownIndicator>
    ) : (
      <components.DropdownIndicator {...prop}>
        <IconDropDownForm />
      </components.DropdownIndicator>
    );
  };
  return (
    <div className={SelectStyles["CustomSelect"]}>
      <Tooltip
        placement="bottom"
        arrow
        classes={{
          arrow: SelectStyles["arrow"],
          tooltip: SelectStyles["tooltip"],
        }}
        title={
          showError && isTooltip ? (
            <MessageError
              type={error?.type}
              message={error?.message}
              style={{ color: "red", marginTop: "0px" }}
            />
          ) : (
            ""
          )
        }
      >
        <div>
          <Select
            name={name}
            ref={fieldref !== null ? fieldref : ref}
            className={SelectStyles["select"]}
            options={props.options}
            styles={{
              menu: (base) => ({ ...base, zIndex: 2 }),
              control: (base) => ({
                ...base,
                minHeight: 32,
                height: height,
                borderRadius: 3,
                border: `1px solid ${showError ? "red" : "#d8d7d7"}`,
                boxShadow: "unset",
                "&:hover": {
                  borderColor: showError ? "red" : "#138300",
                },
                "&:focus": {
                  borderColor: showError ? "red" : "#138300",
                  boxShadow: "unset",
                },
                backgroundColor: disabled ? "#E3E3E3" : "#fff",
              }),
              placeholder: (base) => ({
                ...base,
                fontWeight: 400,
                color: "#C7C7C7",
                opacity: 1,
              }),
              option: (base, { isSelected, isFocused }) => ({
                ...base,
                fontWeight: 400,
                color: isSelected ? colorActive : "#333333",
                backgroundColor: isSelected
                  ? backgroundColorActive
                  : isFocused
                  ? colorFocusOption
                  : "#fff",
              }),
              singleValue: (base) => ({
                ...base,
                fontWeight: 400,
                color: "#333333",
                textAlign: "left",
              }),
              indicatorSeparator: (base) => ({ ...base, width: 0 }),
              indicatorsContainer: (base) => ({
                ...base,
                minHeight: 32,
                height: height,
              }),
              ...styles,
            }}
            // components={{ ClearIndicator: ClearIndicatorDemo, MultiValue: MultiValueProps}}
            components={{
              ...customComponents,
              DropdownIndicator,
              MultiValue: MultiValueProps,
            }}
            onMenuOpen={() => {
              setIsClearable(true);
            }}
            onMenuClose={() => {
              setIsClearable(false);
            }}
            placeholder={placeholder}
            onChange={(e, action) => {
              if (typeof e === "undefined") {
                onChange(null);
                return;
              }
              onChange(e, action);
            }}
            escapeClearsValue={escapeClearsValue}
            isSearchable={isSearchable}
            noOptionsMessage={noOptionsMessage}
            isDisabled={disabled}
            value={getValue()}
            isClearable={isClearable}
            isMulti={isMulti}
            menuPortalTarget={menuPortalTarget}
            hideSelectedOptions={hideSelectedOptions}
            {..._props}
            classNamePrefix={`custom__select__form ${
              _props?.classNamePrefix ?? "react-select"
            }`}
          />
        </div>
      </Tooltip>
      {showError && !isTooltip ? (
        <MessageError type={error?.type} message={error?.message} />
      ) : (
        <></>
      )}
    </div>
  );
});

export default CustomSelect;
