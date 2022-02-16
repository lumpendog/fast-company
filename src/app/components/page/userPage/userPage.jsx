import React from "react";
import PropTypes from "prop-types";

import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";
import { useUsers } from "../../../hooks/useUsers";
import { CommentsContextProvider } from "../../../hooks/useComments";

const UserPage = ({ userId }) => {
    const { isLoading, getUserById } = useUsers();
    const user = getUserById(userId);

    if (isLoading && !user) return <h2>Loading...</h2>;
    return (
        <>
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                        <QualitiesCard qualities={user.qualities} />
                        <MeetingsCard value={user.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <CommentsContextProvider>
                            <Comments />
                        </CommentsContextProvider>
                    </div>
                </div>
            </div>
        </>
    );
};
UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
