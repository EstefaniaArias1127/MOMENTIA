import { useEffect, useState } from 'react';

function Admin() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const obtenerSolicitudes = async () => {
      try {
        const respuesta = await fetch('http://localhost:3000/api/solicitudes');
        
        if (!respuesta.ok) {
          throw new Error('No se pudieron cargar las solicitudes');
        }

        const datos = await respuesta.json();
        setSolicitudes(datos);
      } catch (error) {
        console.error(error);
        setError('No fue posible cargar las solicitudes.');
      } finally {
        setCargando(false);
      }
    };

    obtenerSolicitudes();
  }, []);

  return (
    <div className="admin-container">
      <h1>Panel administrativo</h1>
      <p>Bienvenida a la administración de Momentia.</p>

      <h2>Solicitudes recibidas</h2>

      {cargando && <p>Cargando solicitudes...</p>}
      {error && <p>{error}</p>}

      {!cargando && !error && solicitudes.length === 0 && (
        <p>Aún no hay solicitudes registradas.</p>
      )}

      <div className="solicitudes-lista">
        {solicitudes.map((solicitud) => (
          <div className="solicitud-card" key={solicitud._id}>
            <h3>{solicitud.nombre}</h3>
            <p><strong>Correo:</strong> {solicitud.correo}</p>
            <p><strong>Mensaje:</strong> {solicitud.mensaje}</p>
            <small>
              {new Date(solicitud.createdAt).toLocaleString('es-CO')}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;