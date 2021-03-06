import { useEffect, useState } from "react";
import professions from "../mockData/professions.json";
import qualities from "../mockData/qualities.json";
import users from "../mockData/users.json";
import httpService from "../services/http.service";

const useMockData = () => {
    const statusConst = {
        idle: "Not Started",
        pending: "In Process",
        success: "Ready",
        error: "Error occur"
    };
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(statusConst.idle);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);
    const sumCount = professions.length + qualities.length + users.length;

    const incrementCount = () => {
        setCount((prevState) => prevState + 1);
    };

    const updateProgress = () => {
        if (count !== 0 && status === statusConst.idle) {
            setStatus(statusConst.pending);
        }
        const newProgress = Math.floor((count / sumCount) * 100);
        if (newProgress > progress) {
            setProgress(() => newProgress);
        }
        if (progress === 100) {
            setStatus(statusConst.success);
        }
    };

    useEffect(() => {
        updateProgress();
    }, [count]);

    const initialize = async () => {
        try {
            for (const prof of professions) {
                await httpService.put("profession/" + prof._id, prof);
                incrementCount();
            }
            for (const quality of qualities) {
                await httpService.put("quality/" + quality._id, quality);
                incrementCount();
            }
            for (const user of users) {
                await httpService.put("user/" + user._id, user);
                incrementCount();
            }
        } catch (error) {
            setError(error);
            setStatus(statusConst.error);
        }
    };

    return { error, initialize, status, progress };
};

export default useMockData;
