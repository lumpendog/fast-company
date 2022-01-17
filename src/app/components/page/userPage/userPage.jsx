import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import api from "../../../api";
import Qualities from "../../ui/qualities";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState(null);
    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUser(data);
        });
    }, []);
    const handleAllUsersClick = () => {
        history.push(`/users/${userId}/edit`);
    };
    if (!user) return <h2>Loading...</h2>;
    return (
        <>
            <h1>{user.name}</h1>
            <h2>Профессия: {user.profession.name}</h2>
            <Qualities qualitiesArray={user.qualities} />
            <p>Completed meetings: {user.completedMeetings}</p>
            <h2>Rate: {user.rate}</h2>
            <button className="btn btn-primary" onClick={handleAllUsersClick}>
                Изменить
            </button>
        </>
    );
};
UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
