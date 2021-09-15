import isEmpty from "is-empty"
const authReducer = (state = { isAuthenticated: false, user: {} }, action) => {
    switch (action.type) {
        case "SET_CURRENT_USER":
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        default:
            return state;
    }
}
export default authReducer;
