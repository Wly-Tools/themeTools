import { getCookie } from '../tools/index';
const unauthorized = function () {
	const origin = window.location.origin;
	if (process.env.NODE_ENV != 'development') {
		window.location.href = `http://localhost:9001/login?return_url=${encodeURIComponent(
			window.location.href
		)}`;
	}
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
