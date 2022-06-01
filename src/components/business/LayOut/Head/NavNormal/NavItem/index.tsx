import React from 'react';
import { NavLink } from 'react-router-dom';
import { RouteType } from 'src/types';
import './index.less';
const NavItem: React.FC<any> = (props) => {
	let ChildrenDom;
	const createChildrenDom = (route: RouteType) => {
		if (route?.children && route.children.length !== 0) {
			route.children.map((item, index) => {
				//todo
			});
		} else {
			return [];
		}
	};
	return (
		<div className='nav-item'>
			<NavLink to={props.route.path}>{props.route.name}</NavLink>
		</div>
	);
};
export default NavItem;
