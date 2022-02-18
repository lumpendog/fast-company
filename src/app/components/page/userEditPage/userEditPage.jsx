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
import { Redirect, useHistory, useParams } from "react-router-dom";

const UserEditPage = () => {
    const [data, setData] = useState();
    const [errors, setErrors] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { userId } = useParams();
    const history = useHistory();

    const { currentUser, updateUserData } = useAuth();
    const { qualities, getQuality, isLoading: qualitiesLoading } = useQuality();
    const { professions, isLoading: professionsLoading } = useProfession();

    const transformData = (data) => {
        const newData = data.map((id) => getQuality(id));
        return newData.map((item) => ({
            label: item.name,
            value: item._id
        }));
    };

    useEffect(() => {
        if (!qualitiesLoading && !professionsLoading && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            });
        }
    }, [qualitiesLoading, professionsLoading, currentUser, data]);

    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    useEffect(() => {
        validate();
    }, [data]);

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
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const validate = () => {
        const errors = validator(data, validateConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        await updateUserData({
            ...data,
            qualities: data.qualities.map((q) => q.value)
        });
        history.push("/users/" + currentUser._id);
    };

    if (currentUser._id !== userId) {
        return <Redirect to={"/users/" + currentUser._id + "/edit"} />;
    }

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выберите профессию"
                                value={data.profession}
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
                                value={data.sex}
                            />
                            <MultiSelectField
                                name="qualities"
                                label="Выберите ваши качества"
                                onChange={handleChange}
                                options={qualities}
                                defaultValue={data.qualities}
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
