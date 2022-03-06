import React, { useEffect } from "react";
import { orderBy } from "lodash";

import CommentList, { AddCommentForm } from "../common/comments";
import { useDispatch, useSelector } from "react-redux";
import {
    createComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment
} from "../../store/comments";
import { useParams } from "react-router-dom";
import { getCurrentUserId } from "../../store/users";

const Comments = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const currentUserId = useSelector(getCurrentUserId());

    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);

    const isLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());

    const handleRemoveComment = (id) => {
        dispatch(removeComment(id));
    };

    const handleAddComment = (data) => {
        dispatch(createComment({ data, userId, currentUserId }));
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <AddCommentForm onAdd={handleAddComment} />
                </div>
            </div>
            {sortedComments?.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />
                        {!isLoading ? (
                            <CommentList
                                comments={sortedComments}
                                onRemove={handleRemoveComment}
                            />
                        ) : (
                            "loading..."
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
