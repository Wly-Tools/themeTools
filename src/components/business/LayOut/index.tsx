import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getUserInfo } from 'src/api/auth';
import Head from './Head';
import './index.less';
const LayOut: React.FC<any> = (props) => {
	useEffect(() => {
		getUserInfo();
	}, []);
	return (
		<div className={'layout'}>
			<Head />
			<Outlet />
		</div>
	);
};
export default LayOut;
