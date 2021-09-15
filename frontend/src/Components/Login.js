import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { login } from '../apiService/api';
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../actions/authActions';
import { useSelector } from 'react-redux';

const Login = ({ history }) => {
    const auth = useSelector(state => state.authReducer)

    useEffect(() => {
        if (auth.isAuthenticated) {
            history.push("/dashboard");
        }
    }, [auth, history])

    const dispatch = useDispatch();
    const [values, setValues] = useState({
        password: "",
        email: "",
        open: false,
        error: ""
    })
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        const user = {
            email: values.email || undefined,
            password: values.password || undefined,
        };
        login(user).then(data => {
            if (data.err) setValues({ ...values, error: data.err })
            else {
                localStorage.setItem("jwtToken", data.token);
                setAuthToken(data.token);
                const decoded = jwt_decode(data.token);
                dispatch(setCurrentUser(decoded));
                setValues({ ...values, open: true })
            }
        })
    }
    if (values.open) return <Redirect to="/dashboard" />
    return (
        <div className="login">
            <form onSubmit={clickSubmit}>

                <h2>Sign in</h2>
                <p>
                    <label htmlFor="Email" className="floatLabel">Email</label>
                    <input type="text" value={values.email} onChange={handleChange("email")}></input>
                </p>
                <p>
                    <label htmlFor="password" className="floatLabel">Password</label>
                    <input type="password" value={values.password} onChange={handleChange("password")}></input>
                </p>
                {values.error && (<div className="error">{values.error}</div>)}
                <p>
                    <button type="submit" onClick={clickSubmit}>Login</button>
                </p>
                <a href="/registar" style={{ textAlign: "center", padding:"5px" }}>You dont have account?</a>
            </form>
        </div>
    );
};

export default Login;