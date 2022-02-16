import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useProfession } from "../../hooks/useProfession";
import { useQuality } from "../../hooks/useQuality";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        name: "",
        qualities: [],
        license: false
    });
    const { signUp } = useAuth();
    const [errors, setErrors] = useState({});
    const { professions } = useProfession();
    const { qualities } = useQuality();

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
        name: {
            isRequired: {
                message: "Имя обязательно к заполнению"
            },
            min: {
                message: "Имя должно быть минимум 3 символа",
                value: 3
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        };
        try {
            await signUp(newData);
            history.push("/");
        } catch (e) {
            setErrors(e);
        }
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
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
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
                    { name: "Женщина", value: "female" },
                    { name: "Другое", value: "other" }
                ]}
                name="sex"
                onChange={handleChange}
                value={data.sex}
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
