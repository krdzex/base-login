import React, { useEffect, useState } from 'react';
import { create } from "../apiService/api"
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';

const Registar = ({ history }) => {

    const auth = useSelector(state => state.authReducer)
    useEffect(() => {
        if (auth.isAuthenticated) {
            history.push("/dashboard");
        }
    }, [auth, history])


    const [values, setValues] = useState({
        name: "",
        password: "",
        confirmPassword: "",
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
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined,
            confirmPassword: values.confirmPassword || undefined,
        };
        create(user).then((data) => {
            if (data.error) setValues({ ...values, error: data.error });
            else setValues({ ...values, error: "", open: true })
        })
    }
    if (values.open) return <Redirect to={"/login"} />
    return (
        <div className="registar">
            <form onSubmit={clickSubmit}>

                <h2>Sign Up</h2>
                <p>
                    <label htmlFor="name" className="floatLabel">Name</label>
                    <input type="text" value={values.name} onChange={handleChange("name")}></input>
                </p>

                <p>
                    <label htmlFor="Email" className="floatLabel">Email</label>
                    <input type="text" value={values.email} onChange={handleChange("email")}></input>
                </p>
                <p>
                    <label htmlFor="password" className="floatLabel">Password</label>
                    <input type="password" value={values.password} onChange={handleChange("password")}></input>
                </p>
                <p>
                    <label htmlFor="confirmPassword" className="floatLabel">Confirm Password</label>
                    <input type="password" value={values.confirmPassword} onChange={handleChange("confirmPassword")}></input>
                </p>
                {values.error && (<div className="error">{values.error}</div>)}
                <p>
                    <button type="submit" onClick={clickSubmit}>Registar</button>
                </p>
                <a href="/login" style={{ textAlign: "center", padding:"5px" }}>You already have account?</a>
            </form>
        </div>
    );
};

export default Registar;