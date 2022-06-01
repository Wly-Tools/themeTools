import React from 'react';
import Logo from './Logo/index';
import NavNormal from './NavNormal';
import './index.less';
const Head: React.FC<any> = (props) => {
	return (
		<>
			<div className={'layout-head'}>
				<div className='head-normal'>
					<Logo />
					<div className='white-space'></div>
					<NavNormal />
				</div>
			</div>
		</>
	);
};

export default Head;
