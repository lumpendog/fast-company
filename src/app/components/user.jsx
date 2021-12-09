import React from "react";
import Qualities from "./qualities";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";

const User = ({ user, onDelete, onToggleFavourite }) => {
    const {
        _id,
        name,
        qualities,
        profession,
        completedMeetings,
        rate,
        isFavourite
    } = user;
    const { name: profName } = profession;
    return (
        <tr key={_id}>
            <th scope="row">{name}</th>
            <td>
                <Qualities qualitiesArray={qualities} />
            </td>
            <td>{profName}</td>
            <td>{completedMeetings}</td>
            <td>{rate}/5</td>
            <td>
                <Bookmark
                    isFavourite={isFavourite}
                    _id={_id}
                    onToggleFavourite={onToggleFavourite}
                />
            </td>
            <td>
                <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(_id)}
                >
                    delete
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    user: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleFavourite: PropTypes.func.isRequired
};

export default User;
