import React, { useEffect, useState } from "react";
import SelectField from "../form/selectField";
import api from "../../../api";
import { validator } from "../../../utils/validator";
import TextAreaField from "../form/textAreaField";
import PropTypes from "prop-types";

const AddCommentForm = ({ onAdd }) => {
    const initialData = { userId: "", content: "" };
    const [data, setData] = useState(initialData);
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Нужно выбрать имя пользователя"
            }
        },
        content: {
            isRequired: {
                message: "Нужно заполнить комментарий"
            }
        }
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
        setData(initialData);
        setErrors({});
    };

    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}></form>
            <div className="mb-4">
                <SelectField
                    value={data.userId}
                    onChange={handleChange}
                    name="userId"
                    options={users}
                    error={errors.userId}
                    defaultOption="Выберите пользователя"
                />
            </div>
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
