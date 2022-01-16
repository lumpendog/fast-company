import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, value, onChange, label, children, error }) => {
    const handleChange = () => {
        onChange({ name: name, value: !value });
    };

    const renderCheckBoxClasses = () => {
        return "form-check-label" + (error ? " is-invalid" : "");
    };

    return (
        <div className="form-check mb-4 has-validation">
            <input
                className="form-check-input"
                type="checkbox"
                value={value}
                id={name}
                name={name}
                onChange={handleChange}
                checked={value}
            />
            <label className={renderCheckBoxClasses()} htmlFor={name}>
                {!label ? children : label}
            </label>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

CheckBoxField.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    error: PropTypes.string
};

export default CheckBoxField;
