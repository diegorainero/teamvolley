import React from "react";
import { withRouter } from "react-router-dom";
import { Admin } from "react-admin";
import { AUTH_LOGIN } from "react-admin";
import loginPage from "./loginPage";

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            processing: false,
            email: "",
            passw: "",
            oldPassw: "",
            newPassw: "",
            newPassw2: "",
            newPasswordRequired: false,
            error: null,
            showPassw: false,
        };
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onChange = this.onChange.bind(this);
        this.togglePasswordVisibility =
            this.togglePasswordVisibility.bind(this);
        this.login = this.login.bind(this);
        this.changePassw = this.changePassw.bind(this);
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

    onKeyPress(cb) {
        return (e) => (e.key === "Enter" ? cb() : null);
    }

    onChange(e) {
        if (this.state.processing) {
            return;
        }
        const { value, name } = e.target;
        switch (name) {
            case "email":
                this.secureSetState({
                    email: value.toLowerCase(),
                    newPasswordRequired: false,
                    oldPassw: "",
                    newPassw: "",
                    newPassw2: "",
                    error: null,
                });
                break;
            case "passw":
                this.secureSetState({
                    passw: value,
                    newPasswordRequired: false,
                    oldPassw: "",
                    newPassw: "",
                    newPassw2: "",
                    error: null,
                });

                break;

            default:
                this.secureSetState({ [name]: value, error: null });
                break;
        }
    }

    togglePasswordVisibility() {
        let showPassw = !this.state.showPassw;
        this.secureSetState({ showPassw });
    }

    login() {
        if (this.state.processing) {
            return;
        }
        this.secureSetState({ processing: true, error: null }, async () => {
            if (
                this.state.email.length === 0 ||
                this.state.passw.length === 0
            ) {
                this.secureSetState({ processing: false, error: "mandatory" });
                return;
            }
            try {
                let newPasswordRequired = await CognitoLogin(
                    this.state.email,
                    this.state.passw
                );
                if (!newPasswordRequired) {
                    setTimeout(() => (window.location.href = "/"), 500);
                    return;
                }
                this.secureSetState({
                    processing: false,
                    error: null,
                    newPasswordRequired: newPasswordRequired,
                    passw: "",
                });
            } catch (err) {
                console.log(err.code);
                switch (err.code) {
                    case "UserNotFoundException":
                        this.secureSetState({
                            processing: false,
                            error: "notFound",
                        });
                        // this.errorMsg = this.gettextCatalog.getString('The provided e-mail address does not exist.');
                        break;
                    case "NotAuthorizedException":
                        this.secureSetState({
                            processing: false,
                            error: "incorrect",
                        });
                        // this.errorMsg = this.gettextCatalog.getString('Incorrect e-mail address or password.');
                        break;
                    default:
                        this.secureSetState({
                            processing: false,
                            error: "generic",
                        });
                        // this.errorMsg = this.gettextCatalog.getString('Could not authenticate user.');
                        break;
                }
            }
        });
    }

    changePassw() {
        if (this.state.processing) {
            return;
        }
        this.secureSetState({ processing: true, error: null }, async () => {
            if (
                this.state.email.length === 0 ||
                this.state.oldPassw.length === 0 ||
                this.state.newPassw.length === 0 ||
                this.state.newPassw2.length === 0
            ) {
                this.secureSetState({ processing: false, error: "mandatory" });
                return;
            }
            if (this.state.newPassw !== this.state.newPassw2) {
                this.secureSetState({ processing: false, error: "dontMatch" });
                return;
            }
            try {
                await CognitoLogin(
                    this.state.email,
                    this.state.oldPassw,
                    this.state.newPassw
                );
                setTimeout(() => (window.location.href = "/"), 500);
            } catch (err) {
                console.log(err.code);
                switch (err.code) {
                    case "UserNotFoundException":
                        this.secureSetState({
                            processing: false,
                            error: "notFound",
                        });
                        // this.errorMsg = this.gettextCatalog.getString('The provided e-mail address does not exist.');
                        break;
                    case "NotAuthorizedException":
                        this.secureSetState({
                            processing: false,
                            error: "incorrect",
                        });
                        // this.errorMsg = this.gettextCatalog.getString('Incorrect e-mail address or password.');
                        break;
                    case "InvalidPasswordException":
                        this.secureSetState({
                            processing: false,
                            error: "invalid",
                        });
                        break;
                    default:
                        this.secureSetState({
                            processing: false,
                            error: "generic",
                        });
                        // this.errorMsg = this.gettextCatalog.getString('Could not authenticate user.');
                        break;
                }
            }
        });
    }

    componentDidMount() {
        this.isMounted = true;
        document.title = "Thor";
    }

    componentWillUnmount() {
        this.isMounted = false;
    }

    render() {
        return <Admin loginPage={loginPage}>...</Admin>;
    }
}

export default withRouter(LoginContainer);
