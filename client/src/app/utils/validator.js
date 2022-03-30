export function validator(data, config) {
    const errors = {};
    function validate(valitadeMethod, data, config) {
        let statusValidate;
        switch (valitadeMethod) {
            case "isRequired": {
                if (typeof data === "boolean") {
                    statusValidate = !data;
                } else {
                    statusValidate = data.trim() === "";
                }
                break;
            }
            case "isEmail": {
                const emailRegExp = /^\S+@\S+\.\S+$/;
                statusValidate = !emailRegExp.test(data);
                break;
            }
            case "isCatipalSymbol": {
                const capitalRegExp = /[A-Z]+/;
                statusValidate = !capitalRegExp.test(data);
                break;
            }
            case "isContainDigit": {
                const containDigitRegExp = /\d+/;
                statusValidate = !containDigitRegExp.test(data);
                break;
            }
            case "min": {
                statusValidate = data.length < config.value;
                break;
            }
            default:
                break;
        }
        if (statusValidate) return config.message;
    }
    for (const fieldName in data) {
        for (const valitadeMethod in config[fieldName]) {
            const error = validate(
                valitadeMethod,
                data[fieldName],
                config[fieldName][valitadeMethod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}
