function decode(str: string) {
	return str.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
}
function deepClone<T>(source: Object): T {
	if (!source && typeof source !== 'object') {
		throw new Error('error arguments shallowClone');
	}
	var targetObj = Array.isArray(source) ? [] : {};
	for (var keys in source) {
		if (source?.hasOwnProperty(keys)) {
			if (source[keys] && typeof source[keys] === 'object') {
				targetObj[keys] = deepClone(source[keys]); //递归
			} else {
				targetObj[keys] = source[keys];
			}
		}
	}
	return targetObj as T;
}
function setCookie(key: string, value, attributes?) {
	if (typeof document === 'undefined') {
		return '';
	}
	attributes = Object.assign(
		{
			path: '/'
		},
		attributes
	);

	if (typeof attributes.expires === 'number') {
		attributes.expires = new Date(new Date().getTime() + attributes.expires * 864e5);
	}
	attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';
	try {
		const result = JSON.stringify(value);
		if (/^[\{\[]/.test(result)) {
			value = result;
		}
	} catch (e) {}

	value = encodeURIComponent(String(value)).replace(
		/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
		decodeURIComponent
	);
	key = encodeURIComponent(String(key))
		.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
		.replace(/[\(\)]/g, escape);

	let stringifiedAttributes = '';
	for (let attributeName in attributes) {
		if (!attributes[attributeName]) {
			continue;
		}
		stringifiedAttributes += '; ' + attributeName;
		if (attributes[attributeName] === true) {
			continue;
		}
		stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
	}
	document.cookie = key + '=' + value + stringifiedAttributes;
}
function getCookie(key, json?) {
	if (typeof document === 'undefined') {
		return;
	}
	const jar = {};
	const cookies = document.cookie ? document.cookie.split('; ') : [];
	for (let i = 0; i < cookies.length; i++) {
		const parts = cookies[i].split('=');
		let cookie = parts.slice(1).join('=');
		if (!json && cookie.charAt(0) === '"') {
			cookie = cookie.slice(1, -1);
		}
		try {
			const name = decode(parts[0]);
			cookie = decode(cookie);

			if (json) {
				try {
					cookie = JSON.parse(cookie);
				} catch (e) {}
			}

			jar[name] = cookie;
			if (key === name) {
				break;
			}
		} catch (e) {}
	}
	return key ? jar[key] : jar;
}
function removeCookie(key, attributes) {
	!attributes && (attributes = {});
	setCookie(
		key,
		'',
		Object.assign(attributes, {
			expires: -1
		})
	);
}
function inintLocalStorage(config: any | {}) {
	Object.keys(config).forEach((item) => {
		window.localStorage.setItem(item, config[item]);
	});
}
export { deepClone, setCookie, getCookie, removeCookie, inintLocalStorage };
