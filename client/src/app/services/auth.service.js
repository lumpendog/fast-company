import axios from "axios";
import localStorageService from "./local.storage.service";
import config from "../config.json";

const httpAuth = axios.create({
    baseURL: config.apiEndpoint + "/auth/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});

const authService = {
    register: async (payload) => {
        const { data } = await httpAuth.post(`signUp`, payload);
        return data;
    },
    login: async (email, password) => {
        const { data } = await httpAuth.post(`signInWithPassword`, {
            email,
            password
        });
        return data;
    },
    refresh: async () => {
        const { data } = await httpAuth.post("token", {
            refreshToken: localStorageService.getRefreshToken()
        });
        return data;
    }
};

export default authService;
