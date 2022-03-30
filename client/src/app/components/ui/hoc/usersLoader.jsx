import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataLoadedStatus, loadUsersList } from "../../../store/users";
import PropTypes from "prop-types";

const UsersLoader = ({ children }) => {
    const dataLoadedStatus = useSelector(getDataLoadedStatus());
    const dispatch = useDispatch();

    useEffect(() => {
        if (!dataLoadedStatus) {
            dispatch(loadUsersList());
        }
    }, []);

    if (!dataLoadedStatus) return "loading...";

    return children;
};

UsersLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UsersLoader;
