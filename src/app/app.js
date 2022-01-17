import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Main from "./layout/main";
import Login from "./layout/login";
import Users from "./layout/users";
import NavBar from "./components/ui/navBar";

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:userId?/:userParam?" component={Users} />
                <Route path="/" exact component={Main} />
                <Redirect to="/" />
            </Switch>
        </>
    );
};

export default App;
