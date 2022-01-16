import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Bookmark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table";

const UsersTable = ({
    users,
    onDelete,
    onToggleBookmark,
    onSort,
    selectedSort
}) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link to={`users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            name: "Качества",
            component: (user) => <Qualities qualitiesArray={user.qualities} />
        },
        professionName: { path: "profession.name", name: "Профессия" },
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
        },
        delete: {
            component: (user) => (
                <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(user._id)}
                >
                    delete
                </button>
            )
        }
    };
    return <Table {...{ onSort, selectedSort, columns, data: users }} />;
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};

export default UsersTable;
