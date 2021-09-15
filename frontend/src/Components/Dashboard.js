import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from '../actions/authActions';
import { logoutUser } from '../apiService/api';

const Dashboard = ({ history }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer);
    const onLogOut = () => {
        logoutUser();
        history.push("/")
        dispatch(setCurrentUser({}));
    }
    return (
        <div className="dashboard">
            <p>Welcome <b>{user.user.name}</b>. You successfully logged into our application</p>
            <button onClick={onLogOut}>Logout</button>
        </div>
    );
};

export default Dashboard;