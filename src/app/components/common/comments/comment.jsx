import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import displayDate from "../../../utils/displayDate";

const Comment = ({ comment, onRemove }) => {
    const [user, setUser] = useState();

    const { _id, userId, content, created_at: createdAt } = comment;

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    return (
        <div className="bg-light card-body mb-3">
            <div className="row">
                {!user ? (
                    <h2>Loading...</h2>
                ) : (
                    <div className="col">
                        <div className="d-flex flex-start">
                            <img
                                src={`https://avatars.dicebear.com/api/avataaars/${(
                                    Math.random() + 1
                                )
                                    .toString(36)
                                    .substring(7)}.svg`}
                                className="rounded-circle shadow-1-strong me-3"
                                alt="avatar"
                                width="65"
                                height="65"
                            />
                            <div className="flex-grow-1 flex-shrink-1">
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-1">
                                            {user.name}
                                            <span className="small">
                                                {" " + displayDate(createdAt)}
                                            </span>
                                        </p>
                                        <button
                                            className="btn btn-sm text-primary d-flex align-items-center"
                                            onClick={() => {
                                                onRemove(_id);
                                            }}
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    </div>
                                    <p className="small mb-0">{content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

Comment.propTypes = {
    comment: PropTypes.object,
    onRemove: PropTypes.func.isRequired
};

export default Comment;
