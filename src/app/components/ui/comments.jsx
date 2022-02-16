import React from "react";
import { orderBy } from "lodash";

import CommentList, { AddCommentForm } from "../common/comments";
import { useComments } from "../../hooks/useComments";

const Comments = () => {
    const { comments, createComment, removeComment } = useComments();

    const handleRemoveComment = (id) => {
        removeComment(id);
    };

    const handleAddComment = (data) => {
        createComment(data);
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <AddCommentForm onAdd={handleAddComment} />
                </div>
            </div>
            {comments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />
                        <CommentList
                            comments={sortedComments}
                            onRemove={handleRemoveComment}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
