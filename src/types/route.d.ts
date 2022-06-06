import { MutexType } from './utils';

export declare type RouteType = MutexType<
	{
		path: string;
		children?: RouteType[];
		element: JSX.Element;
		option?: any;
		isLeaf?: boolean;
		name?: string;
	},
	{
		path: string;
		children?: RouteType[];
		redirect: string;
		option?: any;
		isLeaf?: boolean;
		name?: string;
	}
>;

// export declare interface RouteType extends ISRedirect {
// 	path: string;
// 	children?: RouteType[];
// 	redirect: string
// 	option?: any;
// 	isLeaf?: boolean;
// }

export type RoutersType = RouteType[];
