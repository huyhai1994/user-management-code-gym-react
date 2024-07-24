import axios from "axios";
import {API_URL} from "../config/backend.config";

class UserService {

    static async getAllUsers() {
        return await axios.get(API_URL);
    }

    static async deleteUser(id) {
        return await axios.delete(API_URL + id);
    }

    static async getUserById(id) {
        return await axios.get(API_URL + '/' + id);
    }

    static async createUser(user) {
        return await axios.post(API_URL, user);
    }

    static async updateUser(id, user) {
        return await axios.put(API_URL + '/' + id, user);
    }

    static async findUserByName(name) {
        return await axios.get(API_URL + '?name=' + name);
    }


}

export default UserService;