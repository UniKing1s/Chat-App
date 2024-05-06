import axios from "axios";
import { USER_API, MESSAGE_API } from "./config";
export function userCallApi(endpoint, method, body) {
  return axios({
    method: method,
    url: USER_API + endpoint,
    data: body,
  }).catch((error) => {
    console.log(error);
  });
}
export function messageCallApi(endpoint, method, body) {
  return axios({
    method: method,
    url: MESSAGE_API + endpoint,
    data: body,
  }).catch((error) => {
    console.log(error);
  });
}
