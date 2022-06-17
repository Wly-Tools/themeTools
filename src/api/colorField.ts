import { request } from 'src/utils/request';

const qureyColorField = (params?: { id?: string; name?: string; value?: string }) => {
	return request.get('/qureyColorField', { params });
};
const getThemeInfoById = (params: { id: string }) => {
	return request.get('/getThemeInfoById', { params });
};
export { qureyColorField, getThemeInfoById };
