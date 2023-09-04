const createAuthService = (apiUrl) => ({
    isAuthenticated: false,
    role: null,

    async login(email, password) {
        try {
            const response = await fetch(`${apiUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            
            // Almacenar el token en el almacenamiento local
            localStorage.setItem('token', data.data.token);

            this.isAuthenticated = true;
            this.role = data.data.roleName; // Asumiendo que el role se envía en el objeto de respuesta
            localStorage.setItem("role", "admin");

            return true;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    },

    logout(cb) {
        // Limpiar el token del almacenamiento local
        localStorage.removeItem('token');

        this.isAuthenticated = false;
        this.role = null;
        setTimeout(cb, 100);
    },

    // Opción para recuperar el rol almacenado si es necesario
    getRole() {
        return this.role || localStorage.getItem('role');
    }
});

export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token;
};

export const getRole = () => {
    const role = localStorage.getItem("role");
    return role;
};

const apiUrl = process.env.REACT_APP_API_BASE_URL;
const authService = createAuthService(apiUrl);
export default authService;
