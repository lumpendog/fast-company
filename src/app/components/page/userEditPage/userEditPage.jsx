import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import api from "../../../api";

import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";

const UserEditPage = ({ userId }) => {
    const [user, setUser] = useState();
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState();
    const [errors, setErrors] = useState();
    const history = useHistory();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

    useEffect(() => {
        validate();
    }, [user]);

    const validateConfig = {
        name: {
            isRequired: {
                message: "Необходимо заполнить имя пользователя"
            }
        },
        email: {
            isRequired: {
                message: "Необходимо заполнить электронную почту"
            },
            isEmail: {
                message: "Некорректная электронная почта"
            }
        }
    };

    const handleChange = (target) => {
        setUser((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const handleProfessionChange = ({ value }) => {
        const profName =
            professions[
                Object.keys(professions).find(
                    (item) => professions[item]._id === value
                )
            ].name;
        setUser((prevState) => ({
            ...prevState,
            profession: { _id: value, name: profName }
        }));
    };

    const handleQualitiesChange = ({ value }) => {
        const formattedQualities = value.map((item) => ({
            ...qualities[
                Object.keys(qualities).find(
                    (key) => qualities[key]._id === item.value
                )
            ]
        }));
        setUser((prevState) => ({
            ...prevState,
            qualities: formattedQualities
        }));
    };

    const validate = () => {
        const errors = validator(user, validateConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate) return;
        api.users.update(user._id, user).then(history.push(`/users/${userId}`));
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {user && qualities ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выберите профессию"
                                value={user.profession._id}
                                onChange={handleProfessionChange}
                                name="profession"
                                options={professions}
                            />
                            <RadioField
                                label="Выберите пол"
                                options={[
                                    { name: "Мужчина", value: "male" },
                                    { name: "Женщина", value: "female" },
                                    { name: "Другое", value: "other" }
                                ]}
                                name="sex"
                                onChange={handleChange}
                                value={user.sex}
                            />
                            <MultiSelectField
                                name="qualities"
                                label="Выберите ваши качества"
                                value={user.qualities}
                                onChange={handleQualitiesChange}
                                options={qualities}
                                defaultValue={user.qualities}
                            />
                            <button className="btn btn-primary w-100 mx-auto mb-4">
                                Обновить
                            </button>
                        </form>
                    ) : (
                        <h2>Loading...</h2>
                    )}
                </div>
            </div>
        </div>
    );
};

UserEditPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserEditPage;
