import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Main from "./layout/main";
import Login from "./layout/login";
import Users from "./layout/users";
import NavBar from "./components/ui/navBar";
import { ToastContainer } from "react-toastify";
import { ProfessionContextProvider } from "./hooks/useProfession";
import { QualityContextProvider } from "./hooks/useQuality";
import { AuthContextProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import Logout from "./layout/logout";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);

    return (
        <>
            <AuthContextProvider>
                <NavBar />
                <ProfessionContextProvider>
                    <QualityContextProvider>
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
                    </QualityContextProvider>
                </ProfessionContextProvider>
                <ToastContainer />
            </AuthContextProvider>
        </>
    );
};

export default App;
