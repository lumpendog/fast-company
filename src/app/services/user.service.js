import httpService from "./http.service";

const usersEndpoint = "user/";

const userService = {
    get: async () => {
        const { data } = await httpService.get(usersEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            usersEndpoint + payload._id,
            payload
        );
        return data;
    }
};

export default userService;
