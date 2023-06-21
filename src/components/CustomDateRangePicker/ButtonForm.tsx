import React from 'react'
import classes from './ButtonForm.module.scss' 
import PropTypes from 'prop-types'

export interface ButtonFormProps
{
    onClick: any;
    className: any;
    children: any;
}
function ButtonForm(props: ButtonFormProps) {
    const {
        onClick,
        className
    } = props
    return (
        <div className={classes[className]} onClick={onClick}>
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
