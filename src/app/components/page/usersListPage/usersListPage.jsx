import React, { useState, useEffect } from "react";
import _ from "lodash";

import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import TextField from "../../common/form/textField";
import { useSelector } from "react-redux";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../../store/professions";
import { getCurrentUserId, getUsers } from "../../../store/users";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [searchText, setSearchText] = useState("");
    const users = useSelector(getUsers());
    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());
    const currentUserId = useSelector(getCurrentUserId());

    const pageSize = 8;

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleToggleBookmark = (id) => {
        const newUsers = [...users];
        const index = newUsers.findIndex((user) => user._id === id);
        newUsers[index].bookmark = !newUsers[index].bookmark;
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

    const filterUsers = (data) => {
        let result;
        if (selectedProf) {
            result = data.filter(
                (item) => item.profession._id === selectedProf._id
            );
        } else if (searchText !== "") {
            result = data.filter((item) =>
                _.includes(_.lowerCase(item.name), _.lowerCase(searchText))
            );
        } else {
            result = data;
        }
        result = result.filter((item) => item._id !== currentUserId);
        return result;
    };

    const filteredUsers = filterUsers(users);
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

    if (usersCrop.length === 0 && count) setCurrentPage((prev) => prev - 1);

    if (users.length === 0) return <h2>No users left</h2>;

    return (
        <div className="d-flex">
            {professions && !professionsLoading && (
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
