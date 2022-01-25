import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    label,
    value,
    onChange,
    defaultOption,
    name,
    options,
    error
}) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    const renderSelectClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };
    let optionsArray = [];
    if (!Array.isArray(options) && typeof options === "object") {
        optionsArray = Object.keys(options).map((optionName) => ({
            name: options[optionName].name,
            value: options[optionName]._id
        }));
    }
    if (Array.isArray(options)) {
        optionsArray = options.map((option) => ({
            name: option.name,
            value: option._id
        }));
    }

    return (
        <div className="mb-4">
            <label htmlFor="profession-select" className="form-label">
                {label}
            </label>
            <select
                className={renderSelectClasses()}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionsArray &&
                    optionsArray.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.name}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

SelectField.defaultProps = {
    defaultOption: "Выберите..."
};
SelectField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    error: PropTypes.string,
    defaultOption: PropTypes.string
};

export default SelectField;
