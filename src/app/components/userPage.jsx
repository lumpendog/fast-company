import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../api";
import QualitiesList from "./qualitiesList";

const UserPage = () => {
    const { userId } = useParams();
    const history = useHistory();
    const [user, setUser] = useState(null);
    useEffect(() => {
        api.users.getUserById(userId).then((data) => {
            setUser(data);
        });
    }, []);
    const handleAllUsersClick = () => {
        history.push("/users");
    };
    if (!user) return <h2>Loading...</h2>;
    return (
        <>
            <h1>{user.name}</h1>
            <h2>Профессия: {user.profession.name}</h2>
            <QualitiesList qualitiesArray={user.qualities} />
            <p>Completed meetings: {user.completedMeetings}</p>
            <h2>Rate: {user.rate}</h2>
            <button className="btn btn-primary" onClick={handleAllUsersClick}>
                Все пользователи
            </button>
        </>
    );
};

export default UserPage;
