import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Loading, Admin, fetchUtils, Resource, Authenticated } from 'react-admin';
import Login from '../auth/login';
import HomeContainer from '../home';
import MyLoginPage from '../auth';
import simpleRestProvider from 'ra-data-simple-rest';

import { asyncTimeout, CheckForIndexHTMLChange } from '../../utilities';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ready: false,
		};
		this.secureSetState = this.secureSetState.bind(this);
		this._isMounted = false;
	}
	get isMounted() {
		return this._isMounted;
	}

	set isMounted(val) {
		this._isMounted = val;
	}

	secureSetState(state, callback) {
		if (!this.isMounted) {
			return;
		}
		console.log('State');
		this.setState(state, callback);
	}

	async loopRefresh() {
		for (;;) {
			try {
				await asyncTimeout(600000);
			} catch (err) {
				console.log(err);
			}
		}
	}

	componentDidMount() {
		this.secureSetState({ ready: true });
		console.log('HELP');
		//this.loopRefresh();
		let token = localStorage.getItem('token');
		console.log('Token', token);
		if (token || token !== null) {
			console.log('Error');
		} else {
			console.log('Cambio State');
			this.secureSetState({ ready: true });
			this.setState({ ready: true });
			//this.props.history.replace('/login');
		}
	}

	componentWillUnmount() {
		this.isMounted = false;
	}

	render() {
		if (!this.state.ready) {
			return <Loading loadingPrimary="Stiamo arrivando" loadingSecondary="Wait for it" />;
		}
		const httpClient = (url, options = {}) => {
			if (!options.headers) {
				options.headers = new Headers({ Accept: 'application/json' });
			}
			// add your own headers here
			options.headers.set('X-Custom-Header', 'foobar');
			console.log('Options', options);
			return fetchUtils.fetchJson(url, options);
		};
		const dataProvider = simpleRestProvider('http://localhost/api/', httpClient);

		return (
			// <Switch>
			// 	<Route path="/login" exact component={Login} />
			// 	{/* <Route path="/forgot/:id?" exact component={Forgot} /> */}
			// 	<Route path="*" exact component={Home} />
			// </Switch>
			<Admin loginPage={MyLoginPage} authProvider={Login} dataProvider={dataProvider}>
				<Authenticated authParams={{ foo: 'bar' }} location={location}>
					<HomeContainer></HomeContainer>
				</Authenticated>
			</Admin>
		);
	}
}

export default withRouter(App);
