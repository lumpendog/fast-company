import React, { useState } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import PropTypes from "prop-types";

const Users = ({ users, onDelete, onToggleFavourite }) => {
    const count = users.length;
    const pageSize = 4;

    const [currentPage, setCurrentPage] = useState(1);

    const usersCrop = paginate(users, currentPage, pageSize);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col">Избранное</th>
                        <th scope="col">&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {usersCrop.map((user) => (
                        <User
                            key={user._id}
                            user={user}
                            onDelete={onDelete}
                            onToggleFavourite={onToggleFavourite}
                        />
                    ))}
                </tbody>
            </table>

            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};

Users.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleFavourite: PropTypes.func.isRequired
};

export default Users;
