import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RouteType } from 'src/types';
import './index.less';
const NavItem: React.FC<any> = (props) => {
	const [isHover, setIsHover] = useState(false);
	const handleHover = (hover: boolean) => {
		setIsHover(hover);
	};
	const createChildrenDom = (route: RouteType) => {
		if (route?.children && route.children.length !== 0) {
			return route.children.map((item, index) => {
				//todo
				if (item?.name) {
					return (
						<NavLink
							to={`${route.path}/${item.path}`}
							className={({ isActive }) => (isActive ? 'nav-item-nav active' : 'nav-item-nav')}
							key={'level2' + item.path}>
							{item.name}
						</NavLink>
					);
				}
			});
		} else {
			return [];
		}
	};
	return (
		<div
			className='nav-item nav-level1'
			onMouseOver={() => {
				handleHover(true);
			}}
			onMouseLeave={() => {
				handleHover(false);
			}}>
			<NavLink
				to={props.route.path}
				className={({ isActive }) => (isActive ? 'nav-item-nav active' : 'nav-item-nav')}>
				{props.route.name}
			</NavLink>

			{isHover && (
				<div className='nav-item nav-level2'>
					{props.route?.children && createChildrenDom(props.route)}
				</div>
			)}
		</div>
	);
};
export default NavItem;
