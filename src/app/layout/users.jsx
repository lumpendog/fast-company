import React from "react";
import { useParams } from "react-router-dom";

import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import UserEditPage from "../components/page/userEditPage";
import { UserContextProvider } from "../hooks/useUsers";

const Users = () => {
    const { userId, edit } = useParams();

    return (
        <UserContextProvider>
            {userId ? (
                edit === "edit" ? (
                    <UserEditPage />
                ) : (
                    <UserPage />
                )
            ) : (
                <UsersListPage />
            )}
        </UserContextProvider>
    );
};

export default Users;
