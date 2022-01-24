import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
    const formatData = (data) => {
        if (!Array.isArray(data) && typeof data === "object") {
            return Object.keys(options).map((key) => ({
                value: options[key]._id,
                label: options[key].name
            }));
        }
        if (Array.isArray(data)) {
            return data.map((item) => ({ value: item._id, label: item.name }));
        }
    };

    const handleChange = (e) => {
        onChange({ name: name, value: e });
    };

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                options={formatData(options)}
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
