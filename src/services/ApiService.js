
import {API_PATH,  BASE_URL} from "../config";

export default class ApiService {
    #makeHeaders = async () => {
        let headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
        return headers;
    };

    #makeBody = (data) => {
        return JSON.stringify(data);
    };

    async postData(path, data) {
        let endpoint = BASE_URL + API_PATH + path;
        let requestData = {
            method: "POST",
            headers: await this.#makeHeaders(),
            body: this.#makeBody(data),
        };
        return await fetch(endpoint, requestData)
            .then((res) => {
                const statusCode = res.status;
                const data = res.json();
                return Promise.all([statusCode, data]);
            })
            .then(([statusCode, data]) => {
                return {data, statusCode: statusCode};
            })
            .catch((e) => console.log(e));
    }
    async getData(path) {
        let endpoint = BASE_URL + API_PATH + path;

        let requestData = {
            method: "GET",
            headers: await this.#makeHeaders(),
        };

        return await fetch(endpoint, requestData).then((res) => {
            const statusCode = res.status;
            const data = res.json();
            return Promise.all([statusCode, data]);
        })
            .then(([statusCode, data]) => {
                return {data, statusCode: statusCode};
            })
            .catch((e) => console.log(e));
    }

}
