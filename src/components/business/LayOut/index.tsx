import React from 'react';
import { Outlet } from 'react-router-dom';
import Head from './Head';
import './index.less';
const LayOut: React.FC<any> = (props) => {
	return (
		<div className={'layout'}>
			<Head />
			<Outlet />
		</div>
	);
};
export default LayOut;
