import React from "react";
import { useProfession } from "../../hooks/useProfession";
import PropTypes from "prop-types";

const Profession = ({ id }) => {
    const { getProfession, isLoading } = useProfession();
    if (isLoading) return <h2>loading</h2>;
    const { name } = getProfession(id);
    return name;
};
Profession.propTypes = {
    id: PropTypes.string.isRequired
};

export default Profession;
