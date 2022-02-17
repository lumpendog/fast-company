import React, { useEffect, useState } from "react";

import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backHistoryButton";
import { useAuth } from "../../../hooks/useAuth";
import { useQuality } from "../../../hooks/useQuality";
import { useProfession } from "../../../hooks/useProfession";
import { Redirect, useParams } from "react-router-dom";

const UserEditPage = () => {
    const [user, setUser] = useState();
    const [errors, setErrors] = useState();
    const { userId } = useParams();

    const { currentUser, updateUser } = useAuth();
    const { qualities, getQuality } = useQuality();
    const { professions } = useProfession();

    const transformData = (data) => {
        const newData = data.map((id) => getQuality(id));
        return newData.map((item) => ({
            label: item.name,
            value: item._id
        }));
    };

    useEffect(() => {
        setUser({
            ...currentUser,
            qualities: transformData(currentUser.qualities)
        });
    }, []);

    useEffect(() => {
        validate();
    }, [user]);

    const validateConfig = {
        name: {
            isRequired: {
                message: "Необходимо заполнить имя пользователя"
            },
            min: {
                message: "Имя должно быть длиннее 2 символов",
                value: "3"
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

    const validate = () => {
        const errors = validator(user, validateConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        updateUser({
            ...user,
            qualities: user.qualities.map((q) => q.value)
        });
    };

    if (currentUser._id !== userId) {
        return <Redirect to={"/users/" + currentUser._id + "/edit"} />;
    }

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {user ? (
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
                                value={user.profession}
                                onChange={handleChange}
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
                                onChange={handleChange}
                                options={qualities}
                                defaultValue={user.qualities}
                            />
                            <button
                                className={
                                    "btn btn-primary w-100 mx-auto mb-4" +
                                    (Object.keys(errors).length === 0
                                        ? ""
                                        : " disabled")
                                }
                            >
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

export default UserEditPage;
