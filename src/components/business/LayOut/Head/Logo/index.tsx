import React from 'react';
import logo from '../../../../../assets/image/logo.png';
import './index.less';
const Logo: React.FC<any> = (props) => {
	return (
		<>
			<div className='head-logo'>
				<img src={logo} />
				<span className='logo-text'>ThemeTool</span>
			</div>
		</>
	);
};

export default Logo;
