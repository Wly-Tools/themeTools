import React from 'react';
import Home from '../views/Home';
import { RoutersType } from '../types';
import App from '../App';

const routes: RoutersType = [
	{
		path: '',
		redirect: 'app'
	},
	{
		path: 'home',
		element: <Home />,
		name: 'Home'
	},
	{
		path: 'app',
		element: <App />,
		name: 'APP',
		children: [
			{
				path: '',
				redirect: 'home'
			},
			{
				path: 'home',
				element: <Home />,
				name: 'HOME'
			}
		]
	}
];

export { routes };
