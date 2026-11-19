import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    const navigate = useNavigate();

    const iniciarSesion = async (e) => {
        e.preventDefault();
        setError("");
        setCargando(true);

        try {
            const respuesta = await fetch(
                "https://momentia-backend-rq2e.onrender.com/api/admin/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ usuario, password })
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(datos.mensaje || "No se pudo iniciar sesión");
            }

            localStorage.setItem("tokenAdmin", datos.token);
            navigate("/admin");

        } catch (error) {
            setError(error.message);
        } finally {
            setCargando(false);
        }
    };

    return (
        <section className="login-admin">
            <div className="login-contenedor">
                <h1>Administración Momentia</h1>
                <p>Ingresa tus credenciales para continuar.</p>

                <form onSubmit={iniciarSesion}>
                    <label>Usuario</label>
                    <input
                        type="text"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        required
                    />

                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && <p className="login-error">{error}</p>}

                    <button type="submit" disabled={cargando}>
                        {cargando ? "Ingresando..." : "Iniciar sesión"}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Login;