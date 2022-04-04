import httpService from "./http.service";
import localStorageService from "./local.storage.service";

const usersEndpoint = "user/";

const userService = {
    get: async () => {
        const { data } = await httpService.get(usersEndpoint);
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(
            usersEndpoint + localStorageService.getUserId()
        );
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            usersEndpoint + localStorageService.getUserId(),
            payload
        );
        return data;
    }
};

export default userService;
