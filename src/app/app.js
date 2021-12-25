import React from "react";
import NavBar from "./components/navBar";
import { Route, Switch } from "react-router-dom";
import Main from "./layout/main";
import Login from "./layout/login";
import Users from "./layout/users";

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={Users} />
                <Route path="/" component={Main} />
            </Switch>
        </>
    );
};

export default App;
