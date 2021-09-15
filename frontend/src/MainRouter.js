
import { Route, Switch } from "react-router-dom"
import Home from "./Components/Home";
import Login from "./Components/Login";
import Registar from "./Components/Registar";
import Dashboard from "./Components/Dashboard";
import PrivateRoute from "./PrivateRoute";
import { useDispatch } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser } from "./actions/authActions";
import { logoutUser } from "./apiService/api";
import { useEffect } from "react";

const MainRouter = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        if (localStorage.jwtToken) {
            const token = localStorage.jwtToken;
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                logoutUser();
                dispatch(setCurrentUser({}));
            }
        }
    }, [dispatch])


    return (
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/registar" component={Registar} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
        </div>
    )
}
export default MainRouter;