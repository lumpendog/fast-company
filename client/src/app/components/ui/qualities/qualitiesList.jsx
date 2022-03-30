import React, { useEffect } from "react";
import PropTypes from "prop-types";

import Quality from "./quality";
import { useDispatch, useSelector } from "react-redux";
import {
    getQualitiesLoadingStatus,
    loadQualitiesList
} from "../../../store/qualities";

const QualitiesList = ({ qualitiesArray }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getQualitiesLoadingStatus());

    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);

    if (isLoading) return <>loading...</>;
    return (
        <>
            {qualitiesArray.map((item) => (
                <Quality key={item} id={item} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualitiesArray: PropTypes.arrayOf(PropTypes.string)
};

export default QualitiesList;
