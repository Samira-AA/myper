import axios from "axios";
import {environment} from "../../../environment/environment.js";

const http = axios.create({
    baseURL: environment.baseUrl,
    headers: {
        "Content-Type": "application/json"
    }
});

export class UserApiService {
    async getUsers() {
        return await http.get('/users');
    }
}