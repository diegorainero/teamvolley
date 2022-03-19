import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./presentation";

const AppContainer = () => (
    <BrowserRouter basename="/">
        <App />
    </BrowserRouter>
);

export default AppContainer;
