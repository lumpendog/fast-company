import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Main from "./layout/main";
import Login from "./layout/login";
import Users from "./layout/users";
import NavBar from "./components/ui/navBar";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoute";
import Logout from "./layout/logout";
import AppLoader from "./components/ui/hoc/appLoader";

const App = () => {
    return (
        <>
            <AppLoader>
                <NavBar />
                <Switch>
                    <Route path="/login/:type?" component={Login} />
                    <ProtectedRoute
                        path="/users/:userId?/:edit?"
                        component={Users}
                    />
                    <Route path={"/logout"} component={Logout} />
                    <Route path="/" exact component={Main} />
                    <Redirect to="/" />
                </Switch>
                <ToastContainer />
            </AppLoader>
        </>
    );
};

export default App;
