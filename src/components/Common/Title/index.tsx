import React, { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './index.less';
export declare interface TitleType {
	titleinfo: {
		name: string;
		path: string;
	}[];
}
const Title: FC<TitleType> = (props) => {
	const { titleinfo } = props;

	return <div className='title'></div>;
};

export { Title };
