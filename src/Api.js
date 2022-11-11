import axios from "axios";
import Account from "./helpers/Account";

const { REACT_APP_API_URL } = process.env;
const api = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: {
    Authorization: Account.getToken(),
    'Content-Type': 'application/json',
  }
})

class Api {
  static register(firstName, lastName, email, password) {
    return api.post('/users/register', { firstName, lastName, email, password })
  }

  static login(email, password) {
    return api.post('/users/login', { email, password })
  }

  static singleUser(id) {
    return api.get(`/users/single`, {params: {id}});
  }

  static userList(search = '') {
    return api.get(`/users/list`, { params: { search } })
  }

  static messagesList(friendId, params = {}) {
    return api.get(`/messages/list/${friendId}`, { params })
  }

  static sendMessage(friendId, data = {}, onUploadProgress) {
    return api.post(`/messages/send/${friendId}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
  }
}

export default Api;
