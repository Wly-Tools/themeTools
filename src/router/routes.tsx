import React from 'react';
import Home from '../views/Home';
import { RoutersType } from '../types';
import ColorField from '../views/ColorField/';
import Themes from '../views/Themes/';
// const Home = () => import('../views/Home');
const routes: RoutersType = [
	{
		path: '',
		redirect: 'home'
	},
	{
		path: 'home',
		element: <Home />,
		name: 'Home'
	},
	{
		path: 'colorfield',
		element: <ColorField />,
		name: 'ColorField'
	},
	{
		path: 'Themes',
		element: <Themes />,
		name: 'Themes'
	}
];

export { routes };
