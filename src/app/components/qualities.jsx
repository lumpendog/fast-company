import React from "react";
import PropTypes from "prop-types";

const Qualities = ({ qualitiesArray }) => {
    return (
        <>
            {qualitiesArray.map((item) => {
                const { _id, name, color } = item;
                return (
                    <span key={_id} className={`badge bg-${color} m-1`}>
                        {name}
                    </span>
                );
            })}
        </>
    );
};

Qualities.propTypes = {
    qualitiesArray: PropTypes.arrayOf(PropTypes.object)
};

export default Qualities;
