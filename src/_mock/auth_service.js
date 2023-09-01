// authService.js
const authService = {
    isAuthenticated: false,
    role: null,
    login(email, password) {
        if (email === "admin@example.com" && password === "admin") {
            this.isAuthenticated = true;
            this.role = 'admin';
            return true;
        }
        if (email === "user@example.com" && password === "user") {
            this.isAuthenticated = true;
            this.role = 'user';
            return true;
        }
        this.isAuthenticated = false;
        this.role = null;
        return false;

    },
    logout(cb) {
        this.isAuthenticated = false;
        this.role = null;
        setTimeout(cb, 100);
    }
};

export default authService;
