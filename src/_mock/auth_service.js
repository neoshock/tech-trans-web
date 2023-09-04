import jwtDecode from 'jwt-decode';

const createAuthService = (apiUrl) => ({
    isAuthenticated: false,
    role: null,

    async login(email, password) {
        console.log('entra');
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

            const decodedToken = jwtDecode(data.data.token);


            this.isAuthenticated = true;
            this.role = decodedToken.rolName; // Asumiendo que el role se envía en el objeto de respuesta
            localStorage.setItem("role", this.role);
            localStorage.setItem("email", decodedToken.email);
            localStorage.setItem("full_name", `${decodedToken.Name} ${decodedToken.Surname}`);

            return true;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    },

    logout(cb) {
        // Limpiar el token del almacenamiento local
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('email');
        localStorage.removeItem('full_name');

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
