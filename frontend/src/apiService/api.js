import baseUrl from "../config"
import setAuthToken from "../utils/setAuthToken"

const create = (user) => {
    return fetch(`${baseUrl}/api/users/`, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(user),
    }).then(response => response.json()).catch(err => console.log(err))
}

const login = (user) => {
    return fetch(`${baseUrl}/auth/signin/`, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(user),
    }).then(response => response.json()).catch(err => console.log(err))
}

const logoutUser = () => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
};

export { create, login, logoutUser }