import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';

const Login = async (type, params) => {
	if (type === AUTH_LOGIN) {
		const { username, password } = params;
		var formdata = new FormData();
		formdata.append('email', username);
		formdata.append('password', password);
		var requestOptions = {
			method: 'POST',
			body: formdata,
		};
		return fetch('http://localhost/api/login', requestOptions)
			.then((response) => {
				if (response.status < 200 || response.status >= 300) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then((response) => {
				localStorage.setItem('token', response.data.token);
				localStorage.setItem('name', response.data.name);
			});
	}
	if (type === AUTH_LOGOUT) {
		localStorage.removeItem('token');
		return Promise.resolve();
	}
	if (type === AUTH_ERROR) {
		const status = params.status;
		if (status === 401 || status === 403) {
			localStorage.removeItem('token');
			return Promise.reject();
		}
		return Promise.resolve();
	}
	if (type === AUTH_CHECK) {
		let token = localStorage.getItem('token');
		return token && token !== null ? Promise.resolve() : Promise.reject();
	}
	return Promise.reject('Unknown method');
};

export default Login;
