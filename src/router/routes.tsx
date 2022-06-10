import React from 'react';
import Home from '../views/Home';
import { RoutersType } from '../types';
import App from '../views/APP';
import { ThemeInfo } from 'src/views/APP/ThemeInfo';
import { AttributeInfo } from 'src/views/APP/AttributeInfo';

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
				redirect: 'themeinfo'
			},
			{
				path: 'themeinfo',
				element: <ThemeInfo />,
				name: 'THEMEINFO'
			},
			{
				path: 'attributeinfo',
				element: <AttributeInfo />,
				name: 'ATTRIBUTEINFO'
			}
		]
	}
];

export { routes };
