import React from "react";
import PropTypes from "prop-types";

import Quality from "./quality";

const QualitiesList = ({ qualitiesArray }) => {
    return (
        <>
            {qualitiesArray.map((item) => (
                <Quality key={item._id} {...item} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualitiesArray: PropTypes.arrayOf(PropTypes.object)
};

export default QualitiesList;
