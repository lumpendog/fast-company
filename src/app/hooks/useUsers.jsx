import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import userService from "../services/user.service";
import { toast } from "react-toastify";

const UserContext = React.createContext();

export const useUsers = () => {
    return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const { content } = await userService.get();
                setUsers(content);
                setIsLoading(false);
            } catch (e) {
                errorCatcher(e);
            }
        };
        getUsers();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    function errorCatcher(e) {
        const { message } = e.response.data;
        setError(message);
        setIsLoading(false);
    }

    function getUserById(id) {
        return users.find((u) => u._id === id);
    }

    return (
        <UserContext.Provider value={{ users, getUserById }}>
            {!isLoading ? children : <h1>Users are loading...</h1>}
        </UserContext.Provider>
    );
};
UserContextProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
