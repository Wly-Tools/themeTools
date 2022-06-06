import React from 'react';
import Logo from './Logo/index';
import NavNormal from './NavNormal';
import UserInfo from '../Head/UserInfo';
import './index.less';
const Head: React.FC<any> = (props) => {
	return (
		<>
			<div className={'layout-head'}>
				<div className='head-normal'>
					<Logo />
					<div
						className='white-space'
						style={{ width: 20, flex: '0 0 auto' }}></div>
					<NavNormal />
					<div className='white-space'></div>
					<UserInfo></UserInfo>
				</div>
			</div>
		</>
	);
};

export default Head;
