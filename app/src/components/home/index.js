import React from "react";
import { withRouter } from "react-router-dom";
import Home from "./presentation";

class HomeContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
        this.setState(state, callback);
    }

    async logout() {
        // try {
        //     await CognitoLogout();
        // } catch (err) {
        //     console.log(err);
        // }
        this.props.history.replace("/login");
    }

    componentDidMount() {
        this.isMounted = true;
        this.routeChanged();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.routeChanged();
        }
    }

    componentWillUnmount() {
        this.isMounted = false;
    }

    render() {
        return <Home {...this.state} />;
    }
}

export default withRouter(HomeContainer);
