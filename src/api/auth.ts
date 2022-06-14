import { request } from 'src/utils/request';

const getUserInfo = () => {
	return request.get('/getUserInfo', { baseURL: '/pjServer' });
};

export { getUserInfo };
