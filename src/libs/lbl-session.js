const lblSession = {};

lblSession.setSession = (key, value) => {
    window.sessionStorage.setItem(key, value)
}

lblSession.getSession = key => {
    return window.sessionStorage.getItem(key)
}

lblSession.removeSession = () => {
    window.sessionStorage.clear();
}

export default lblSession;