import React from "react";
import { useParams } from "react-router-dom";

import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";
import { useSelector } from "react-redux";
import { getUserById, getUsersLoadingStatus } from "../../../store/users";

const UserPage = () => {
    const { userId } = useParams();
    const isLoading = useSelector(getUsersLoadingStatus());
    const user = useSelector(getUserById(userId));

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
                        <Comments />
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserPage;
