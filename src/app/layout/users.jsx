import React from "react";
import { useParams } from "react-router-dom";

import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import UserEditPage from "../components/page/userEditPage";

const Users = () => {
    const { userId, edit } = useParams();
    return userId ? (
        edit === "edit" ? (
            <UserEditPage userId={userId} />
        ) : (
            <UserPage userId={userId} />
        )
    ) : (
        <UsersListPage />
    );
};

export default Users;
