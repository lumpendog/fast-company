import React, { useState } from "react";
import { validator } from "../../../utils/validator";
import TextAreaField from "../form/textAreaField";
import PropTypes from "prop-types";

const AddCommentForm = ({ onAdd }) => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});

    const validatorConfig = {
        content: {
            isRequired: {
                message: "Нужно заполнить комментарий"
            }
        }
    };

    const clearForm = () => {
        setData({});
        setErrors({});
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onAdd(data);
        clearForm();
    };

    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}></form>
            <TextAreaField
                label="Сообщение"
                name="content"
                value={data.content}
                onChange={handleChange}
                error={errors.content}
            />
            <div className="d-flex justify-content-end" onClick={handleSubmit}>
                <button className="btn btn-primary">Опубликовать</button>
            </div>
        </div>
    );
};

AddCommentForm.propTypes = {
    onAdd: PropTypes.func.isRequired
};

export default AddCommentForm;
