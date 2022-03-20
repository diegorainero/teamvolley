import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';

const Login = async (type, params) => {
	console.log('Type .. %o - Params .. %o', type, params);
	if (type === AUTH_LOGIN) {
		const { email, password } = params;
		const request = new Request('http://localhost/api/login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: new Headers({ 'Content-Type': 'application/json' }),
		});
		return fetch(request)
			.then((response) => {
				if (response.status < 200 || response.status >= 300) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then(({ response }) => {
				localStorage.setItem('token', response.data.token);
				localStorage.setItem('name', response.data.name);
			});
	}
	if (type === AUTH_LOGOUT) {
		// ...
	}
	if (type === AUTH_ERROR) {
		// ...
	}
	if (type === AUTH_CHECK) {
		let token = localStorage.getItem('token');
		console.log('Token %o Params %o', token, params);
		return token && token !== null ? Promise.resolve() : Promise.reject();
	}
	return Promise.reject('Unknown method');
};

export default Login;
