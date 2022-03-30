import React from "react";
import Comment from "./comment";
import PropTypes from "prop-types";

const CommentList = ({ comments, onRemove }) => {
    return comments.map((comment) => (
        <Comment key={comment._id} comment={comment} onRemove={onRemove} />
    ));
};
CommentList.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.object),
    onRemove: PropTypes.func.isRequired
};

export default CommentList;
