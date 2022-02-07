import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Main from "./layout/main";
import Login from "./layout/login";
import Users from "./layout/users";
import NavBar from "./components/ui/navBar";
import { ToastContainer } from "react-toastify";
import { ProfessionContextProvider } from "./hooks/useProfession";
import { QualityContextProvider } from "./hooks/useQuality";
import { AuthContextProvider } from "./hooks/useAuth";

const App = () => {
    return (
        <>
            <AuthContextProvider>
                <NavBar />
                <ProfessionContextProvider>
                    <QualityContextProvider>
                        <Switch>
                            <Route path="/login/:type?" component={Login} />
                            <Route
                                path="/users/:userId?/:edit?"
                                component={Users}
                            />
                            <Route path="/" exact component={Main} />
                            <Redirect to="/" />
                        </Switch>
                    </QualityContextProvider>
                </ProfessionContextProvider>
                <ToastContainer />
            </AuthContextProvider>
        </>
    );
};

export default App;
