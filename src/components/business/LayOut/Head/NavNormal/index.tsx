import React from 'react';
import { routes } from 'src/router/routes';
import NavItem from './NavItem';
import './index.less';
const NavNormal: React.FC<any> = (props) => {
	return (
		<>
			<div className={'head-nav-nomal'}>
				{routes.map((item, index) => {
					if (item?.name) {
						return <NavItem route={item} key={item.path + index} />;
					}
				})}
			</div>
		</>
	);
};
export default NavNormal;
