import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ bookmark, onToggleBookmark, _id }) => {
    return (
        <button className="btn btn-sm" onClick={() => onToggleBookmark(_id)}>
            <i className={"bi bi-star" + (bookmark ? "-fill" : "")}></i>
        </button>
    );
};

Bookmark.propTypes = {
    bookmark: PropTypes.bool,
    onToggleBookmark: PropTypes.func.isRequired,
    _id: PropTypes.string.isRequired
};

export default Bookmark;
