import React from "react";
import PropTypes from "prop-types";

import Quality from "./quality";
import { useQuality } from "../../../hooks/useQuality";

const QualitiesList = ({ qualitiesArray }) => {
    const { isLoading } = useQuality();
    if (isLoading) return <>loading...</>;
    return (
        <>
            {qualitiesArray.map((item) => (
                <Quality key={item} id={item} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualitiesArray: PropTypes.arrayOf(PropTypes.string)
};

export default QualitiesList;
