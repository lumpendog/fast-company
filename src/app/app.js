import React, { useEffect, useState } from "react";
import Users from "./components/users";
import api from "../app/api";

const App = () => {
    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (id) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    };

    const handleToggleFavourite = (id) => {
        const newUsers = [...users];
        const index = newUsers.findIndex((user) => user._id === id);
        newUsers[index].isFavourite = !newUsers[index].isFavourite;
        setUsers(newUsers);
    };

    return (
        <>
            {users && users.length !== 0 && (
                <Users
                    users={users}
                    onDelete={handleDelete}
                    onToggleFavourite={handleToggleFavourite}
                />
            )}
        </>
    );
};

export default App;
