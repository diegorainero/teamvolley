import React from 'react';
import { Link, Switch, Route, Redirect, withRouter } from 'react-router-dom';

// import HomePage from "./home";
// import Vendors from "./vendors";
// import Clients from "./clients";
// import Administrators from "./administrators";
// import Chargeboxes from "./chargeboxes";
// import Transactions from "./transactions";
// import Reservations from "./reservations";
// import Reports from "./reports";
// import Documents from "./documents";
// import Rfids from "./rfids";
// import Customization from "./customization";
// import Payments from "./payments";
// import Settings from "./settings";
// import Developers from "./developers";

const Home = (props) => {
	return (
		// <Switch>
		// 	<Route path="/" exact component={HomePage} />

		// 	<Route path="/administrators" exact component={Administrators} />
		// 	<Route path="/chargeboxes" exact component={Chargeboxes} />
		// 	<Route path="/transactions" exact component={Transactions} />
		// 	<Route path="/reservations" exact component={Reservations} />
		// 	<Route path="/reports" exact component={Reports} />
		// 	<Route path="/rfids" exact component={Rfids} />
		// 	<Route path="/advanced/developers" exact component={Developers} />
		// 	<Route path="/settings" exact component={Settings} />
		// 	<Redirect to="/" />
		// </Switch>
		<>
			<div>Ciao</div>
		</>
	);
};

export default withRouter(Home);
