import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getProfessionById,
    getProfessionsLoadingStatus
} from "../../store/professions";

const Profession = ({ id }) => {
    const isLoading = useSelector(getProfessionsLoadingStatus());
    if (isLoading) return <h2>loading</h2>;
    const { name } = useSelector(getProfessionById(id));
    return name;
};
Profession.propTypes = {
    id: PropTypes.string.isRequired
};

export default Profession;
