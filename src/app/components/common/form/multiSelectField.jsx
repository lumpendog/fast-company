import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
    const formattedOptions = Object.keys(options).map((key) => ({
        value: options[key]._id,
        label: options[key].name
    }));

    const handleChange = (e) => {
        onChange({ name: name, value: e });
    };

    console.log(defaultValue);

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                options={formattedOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
                name={name}
                defaultValue={defaultValue}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    options: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    defaultValue: PropTypes.array
};

export default MultiSelectField;
