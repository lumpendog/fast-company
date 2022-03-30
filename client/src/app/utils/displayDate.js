import declOfNum from "./declOfNum";

const formatTime = (num) => {
    return num < 10 ? "0" + num : num;
};

const displayDate = (timestamp) => {
    const variantMinutes = [" минуту", " минуты", " минут"];
    const date = new Date(parseInt(timestamp));
    const dateNow = new Date();
    const difYears = dateNow.getFullYear() - date.getFullYear();
    if (difYears === 0) {
        const difDays = dateNow.getDate() - date.getDate();
        if (difDays === 0) {
            const difHours = dateNow.getHours() - date.getHours();
            if (difHours === 0) {
                const difMinutes = dateNow.getMinutes() - date.getMinutes();
                return `${difMinutes} ${declOfNum(
                    difMinutes,
                    variantMinutes
                )} назад`;
            }
            return `${formatTime(date.getHours())}:${formatTime(
                date.getMinutes()
            )}`;
        }

        return `${date.getDate()} ${date.toLocaleString("default", {
            month: "long"
        })}`;
    }
    return (
        formatTime(date.getDate()) +
        "." +
        (date.getMonth() + 1) +
        "." +
        date.getFullYear()
    );
};

export default displayDate;
