import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ isFavourite, onToggleFavourite, _id }) => {
    return (
        <button className="btn btn-sm" onClick={() => onToggleFavourite(_id)}>
            <i className={"bi bi-star" + (isFavourite ? "-fill" : "")}></i>
        </button>
    );
};

Bookmark.propTypes = {
    isFavourite: PropTypes.bool,
    onToggleFavourite: PropTypes.func.isRequired,
    _id: PropTypes.string.isRequired
};

export default Bookmark;
