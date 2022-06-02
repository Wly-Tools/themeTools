import React, { FC } from 'react';
import { UserOutlined } from '@ant-design/icons';
import './index.less';
const UserInfo: FC<any> = (props) => {
	return (
		<div className='user-info'>
			<UserOutlined
				style={{
					color: '#04b373',
					fontSize: '25px',
					display: 'block',
					margin: 'auto'
				}}
			/>
		</div>
	);
};

export default UserInfo;
