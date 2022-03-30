import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getQualityById } from "../../../store/qualities";

const Quality = ({ id }) => {
    const quality = useSelector(getQualityById(id));
    const { name, color, _id } = quality;
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
