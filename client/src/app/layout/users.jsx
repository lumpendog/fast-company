import React from "react";
import { useParams } from "react-router-dom";

import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import UserEditPage from "../components/page/userEditPage";
import UsersLoader from "../components/ui/hoc/usersLoader";

const Users = () => {
    const { userId, edit } = useParams();

    return (
        <UsersLoader>
            {userId ? (
                edit === "edit" ? (
                    <UserEditPage />
                ) : (
                    <UserPage />
                )
            ) : (
                <UsersListPage />
            )}
        </UsersLoader>
    );
};

export default Users;
