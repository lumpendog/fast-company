function generateAuthError(message) {
    if (message === "INVALID_PASSWORD") {
        return "Неверный пароль";
    }
    if (message === "EMAIL_NOT_FOUND") {
        return "Пользователя с таким email не существует";
    }
    if (message === "EMAIL_EXISTS") {
        return "Пользователь с таким email уже существует";
    }
}

export default generateAuthError;
