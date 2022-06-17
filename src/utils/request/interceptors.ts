import { deepClone } from '../tools/index';
import { authorize, unauthorized } from './auth';
import { AxiosResponse } from 'axios';
import { wlyNotiFiction } from 'wlyUI';
const SUCCESS_CODE = 0;
declare type MessageType = 'success' | 'error' | 'warning' | 'success' | 'info' | 'open';
const interceptorsRules = {
	request: {
		onFulfilled: (req: any) => {
			return req;
		},
		onRejected: (error: any) => {
			Promise.reject(error);
		}
	},
	response: {
		onFulfilled: (res: AxiosResponse) => {
			const cloneRes = deepClone<AxiosResponse>(res);
			if (cloneRes.data.code != SUCCESS_CODE) {
				let messages = cloneRes.data.messages.join(',');
				let messagesType: MessageType = cloneRes.data.messagesType;
				wlyNotiFiction[messagesType]({ message: messages });
				return Promise.reject(cloneRes);
			}
			return cloneRes;
		},
		onRejected: (res: { response: { status: any }; message: any }) => {
			//parse response status. such as 401 500 302..
			const { status } = res.response;
			// debugger;
			if (status === 401) {
				unauthorized();
				return Promise.reject(status);
			}
			// const statusApply = STATUSCODE[status];
			// typeof statusApply === "function" && statusApply.call(null, statusText);
			// hiddenLoadding();
			// requestList.shift();
			return Promise.reject(res.message);
		}
	}
};
export { interceptorsRules };
