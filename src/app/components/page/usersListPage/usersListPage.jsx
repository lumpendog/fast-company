import React, { useState, useEffect } from "react";
import _ from "lodash";

import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import api from "../../../api";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import TextField from "../../common/form/textField";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [users, setUsers] = useState();
    const [searchText, setSearchText] = useState("");

    const pageSize = 8;

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (id) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    };

    const handleToggleBookmark = (id) => {
        const newUsers = [...users];
        const index = newUsers.findIndex((user) => user._id === id);
        newUsers[index].bookmark = !newUsers[index].bookmark;
        setUsers(newUsers);
    };

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setSearchText("");
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const clearFilter = () => {
        setSelectedProf();
    };

    const handleSearchChange = (target) => {
        setSearchText(target.value);
        clearFilter();
    };

    if (!users) return <h2>loading....</h2>;

    const filterUsers = (users) => {
        if (selectedProf) {
            return users.filter(
                (user) => user.profession._id === selectedProf._id
            );
        } else if (searchText !== "") {
            return users.filter((user) =>
                _.includes(_.lowerCase(user.name), _.lowerCase(searchText))
            );
        } else return users;
    };

    const filteredUsers = filterUsers(users);
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

    if (usersCrop.length === 0 && count) setCurrentPage((prev) => prev - 1);

    if (users.length === 0) return <h2>No users left</h2>;

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column flex-grow-1">
                {<SearchStatus number={count} />}
                <TextField
                    name="search"
                    placeholder="Search..."
                    value={searchText}
                    onChange={handleSearchChange}
                />
                {count > 0 && (
                    <UsersTable
                        users={usersCrop}
                        onDelete={handleDelete}
                        onToggleBookmark={handleToggleBookmark}
                        onSort={handleSort}
                        selectedSort={sortBy}
                    />
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default UsersListPage;
