import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        gender: "male",
        qualities: [],
        license: false
    });
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState({});

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

    useEffect(() => {
        validate();
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна к заполнению"
            },
            isEmail: {
                message: "Проверьте правильность ввода электронной почты"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен к заполнению"
            },
            isCatipalSymbol: {
                message:
                    "В пароле должна присутствовать минимум 1 заглавная буква"
            },
            isContainDigit: {
                message: "В пароле должна присутствовать минимум 1 цифра"
            },
            min: {
                message: "Длина пароля должна быть минимум 8 символов",
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: "Необходимо выбрать профессию"
            }
        },
        license: {
            isRequired: {
                message: "Нужно подтвердить принятие лицензионного соглашения"
            }
        }
    };

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />

            <SelectField
                label="Профессия"
                value={data.profession}
                onChange={handleChange}
                name="profession"
                options={professions}
                error={errors.profession}
            />

            <RadioField
                options={[
                    { name: "Мужчина", value: "male" },
                    { name: "Женщина", value: "female" }
                ]}
                name="gender"
                onChange={handleChange}
                value={data.gender}
                label="Выберите пол"
            />

            <MultiSelectField
                options={qualities}
                onChange={handleChange}
                name="qualities"
                label="Выберите качества"
                defaultValue={data.qualities}
            />

            <CheckBoxField
                value={data.license}
                onChange={handleChange}
                name="license"
                error={errors.license}
            >
                Подтвердите, что принимаете{" "}
                <a href="#">лицензионное соглашение</a>.
            </CheckBoxField>

            <button
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto mb-4"
            >
                Зарегистрироваться
            </button>
        </form>
    );
};

export default RegisterForm;
