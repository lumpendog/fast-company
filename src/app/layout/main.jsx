import React from "react";
import useMockData from "../utils/mockData";

const Main = () => {
    const { error, initialize, status, progress } = useMockData();

    const handleClick = () => {
        initialize();
    };

    return (
        <div className="container mt-5">
            <h1>Main</h1>
            <h3>Инициализация данных для firebase</h3>
            <ul>
                <li>Status: {status}</li>
                <li>Progress: {progress}%</li>
                {error && <li>{error}</li>}
            </ul>
            <button className="btn btn-primary" onClick={handleClick}>
                Иницииализировать
            </button>
        </div>
    );
};

export default Main;
