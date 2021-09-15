
export const setCurrentUser = (token) => {
  return {
    type: "SET_CURRENT_USER",
    payload: token,
  }
}

