import React from "react";
import { useParams } from "react-router-dom";

import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import UserEditPage from "../components/page/userEditPage";
import { UserContextProvider } from "../hooks/useUsers";
import { useAuth } from "../hooks/useAuth";
import { useQuality } from "../hooks/useQuality";
import { useProfession } from "../hooks/useProfession";

const Users = () => {
    const { userId, edit } = useParams();
    const { isLoading: currentUserLoading } = useAuth();
    const { isLoading: qualitiesLoading } = useQuality();
    const { isLoading: professionsLoading } = useProfession();
    const isLoading =
        currentUserLoading || professionsLoading || qualitiesLoading;

    if (isLoading) return <h2>Loading...</h2>;

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
