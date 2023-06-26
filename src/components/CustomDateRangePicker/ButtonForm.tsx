import React from 'react'
import classes from './ButtonForm.module.scss' 
import PropTypes from 'prop-types'

export interface ButtonFormProps
{
    onClick: any;
    className: any;
    children: any;
    disabled?: any;
}
function ButtonForm(props: ButtonFormProps) {
    const {
        onClick,
        className,
        disabled
    } = props
    return (
        <div className={`${classes[className]} ${disabled ? classes['disabled'] : ''}`} onClick={onClick}>
            <span>
                {props?.children}
            </span>
        </div>
    )
}

ButtonForm.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string
}
ButtonForm.defaultProps = {
    onClick: () => {},
    className: 'ButtonFormContainer'
}

export default ButtonForm
