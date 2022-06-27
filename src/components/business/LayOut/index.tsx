import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getUserInfo } from 'src/api/auth';
import { setCss } from 'src/utils/tools';
import Head from './Head';
import './index.less';
const LayOut: React.FC<any> = (props) => {
	useEffect(() => {
		getUserInfo().then((res) => {
			// console.log(res.data.data.fileKey);
			setCss(res.data.data.fileKey);
		});
	}, []);
	return (
		<div className={'layout'}>
			<Head />
			<Outlet />
		</div>
	);
};
export default LayOut;
