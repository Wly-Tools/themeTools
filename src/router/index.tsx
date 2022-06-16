import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import { RoutersType, RouteType } from '../types';
import LayOut from '../components/business/LayOut';

const renderRoutes = (routes: RoutersType) => {
	return routes.map((route: RouteType, index: number) => {
		const { path, element, children, redirect } = route;
		return (
			<Route
				path={path}
				element={redirect ? <Navigate to={redirect} replace /> : element}
				key={path + index}>
				{children && children?.length !== 0 ? renderRoutes(children) : null}
			</Route>
		);
	});
};
const RouteDom = renderRoutes(routes);
const RootRoute = () => {
	return (
		<BrowserRouter basename='/tts'>
			<Routes>
				<Route path='' element={<Navigate to={'layout'} replace />}></Route>
				<Route path={'layout'} element={<LayOut />}>
					{RouteDom}
				</Route>
				{RouteDom}
			</Routes>
		</BrowserRouter>
	);
};
export default RootRoute;
