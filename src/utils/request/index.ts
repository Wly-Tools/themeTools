import axios from 'axios';
import { interceptorsRules } from './interceptors';

axios.defaults.withCredentials = true; //允许跨域携带Cookie信息
const host = '/pjts';
const request = axios.create({
	baseURL: host,
	timeout: 6000
});
request.interceptors.request.use(
	interceptorsRules.request.onFulfilled,
	interceptorsRules.request.onRejected
);
request.interceptors.response.use(
	interceptorsRules.response.onFulfilled,
	interceptorsRules.response.onRejected
);
export { request };
