import { request } from '../utils/request';

const getAppThemeInfo = (params: any) => {
	return request.get('/getAppThemeInfo', { params });
};
