import { getCookie } from '../tools/index';
const unauthorized = function () {
	const origin = window.location.origin;
	if (process.env.NODE_ENV != 'development') {
		window.location.href = `/login?return=${encodeURIComponent(window.location.pathname)}`;
	}
	window.location.href = `/login?return=${encodeURIComponent(window.location.pathname)}`;
};
const authorize = function (): { Auth: string } {
	const authCookie = getCookie('X-Request_Auth');
	if (!authCookie) {
		unauthorized();
	}
	return {
		Auth: authCookie
	};
};
export { unauthorized, authorize };
