export declare type Without<T, U> = {
	[P in Exclude<keyof T, keyof U>]?: never;
};
//互斥类型
export declare type MutexType<T, U> = (Without<T, U> & U) | (Without<U, T> & T);
