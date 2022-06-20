import { request } from 'src/utils/request';

const qureyColorField = (params?: { id?: string; name?: string; value?: string }) => {
	return request.get('/qureyColorField', { params });
};
const getThemeInfoById = (params: { id: string }) => {
	return request.get('/getThemeInfoById', { params });
};
const qureyThemeInfo = (params?: {
	id?: string;
	component?: string;
	position?: string;
	group?: string;
	status?: string;
	attribute?: string;
}) => {
	return request.get('/qureyThemeInfo', { params });
};
const updateColorField = (params: {
	color: string;
	usedIdLists: string[];
	swapInfo: {
		[key: string]: {
			to: string;
		};
	};
	id: string;
}) => {
	return request.post('/updateColorField', { ...params });
};
export { qureyColorField, getThemeInfoById, qureyThemeInfo, updateColorField };
