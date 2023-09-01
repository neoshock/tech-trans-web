// Componente LoginForm
export default function LoginForm({ username, setUsername, password, setPassword, handleLogin }) {
    return (
        <form onSubmit={e => { e.preventDefault(); handleLogin(); }}>
            <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Iniciar sesión</button>
        </form>
    );
}
