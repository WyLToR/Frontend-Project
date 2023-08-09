export const saveToLocalStorage = (data) => {
    let authStored = JSON.stringify(data);
    window.localStorage.setItem("authStored", authStored);
}

export const loadFromLocalStorage = () => {
    if (Object.keys(window.localStorage).includes("authStored")) {
        let authUser = window.localStorage.getItem("authStored");
        return JSON.parse(authUser);
    }
}