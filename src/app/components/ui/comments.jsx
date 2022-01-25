import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { orderBy } from "lodash";

import api from "../../api";
import CommentList, { AddCommentForm } from "../common/comments";

const Comments = ({ userId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);

    const handleRemoveComment = async (id) => {
        try {
            await api.comments.remove(id);
            setComments((prevState) =>
                prevState.filter((comment) => comment._id !== id)
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddComment = async (data) => {
        try {
            const newData = await api.comments.add({ ...data, pageId: userId });
            setComments((prevState) => [...prevState, newData]);
        } catch (error) {
            console.log(error);
        }
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <AddCommentForm pageId={userId} onAdd={handleAddComment} />
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

Comments.propTypes = {
    userId: PropTypes.string.isRequired
};

export default Comments;
