// authService.js
const authService = {
    isAuthenticated() {
        return localStorage.getItem('isAuthenticated') === 'true';
    },
    getRole() {
        return localStorage.getItem('role');
    },
    login(email, password) {
        if (email === "admin@example.com" && password === "admin") {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('role', 'admin');
            return true;
        }
        if (email === "user@example.com" && password === "user") {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('role', 'user');
            return true;
        }
        return false;
    },
    logout(cb) {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('role');
        setTimeout(cb, 100);
    }
};

export default authService;
