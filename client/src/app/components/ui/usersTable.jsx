import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Bookmark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table";
import Profession from "./profession";

const UsersTable = ({ users, onToggleBookmark, onSort, selectedSort }) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            name: "Качества",
            component: (user) => <Qualities qualitiesArray={user.qualities} />
        },
        professionName: {
            name: "Профессия",
            component: (user) => <Profession id={user.profession} />
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    {...{
                        onToggleBookmark,
                        _id: user._id,
                        bookmark: user.bookmark
                    }}
                />
            )
        }
    };
    return <Table {...{ onSort, selectedSort, columns, data: users }} />;
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};

export default UsersTable;
