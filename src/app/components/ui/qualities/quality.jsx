import React from "react";
import PropTypes from "prop-types";
import { useQuality } from "../../../hooks/useQuality";

const Quality = ({ id }) => {
    const { getQuality } = useQuality();
    const { name, color, _id } = getQuality(id);
    return (
        <span key={_id} className={`badge bg-${color} m-1`}>
            {name}
        </span>
    );
};

Quality.propTypes = {
    id: PropTypes.string.isRequired
};

export default Quality;
