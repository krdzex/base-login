import { combineReducers } from "redux";
import authReducer from "./AuthReducer";

const allReducer = combineReducers({
    authReducer,
})

export default allReducer;