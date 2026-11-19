import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem('tokenAdmin');
    navigate('/login');
  };

  useEffect(() => {
    const obtenerDatos = async () => {
      const token = localStorage.getItem('tokenAdmin');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const solicitudesRespuesta = await fetch(
          'https://momentia-backend-rq2e.onrender.com/api/solicitudes',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const pedidosRespuesta = await fetch(
          'https://momentia-backend-rq2e.onrender.com/api/pedidos',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (
          solicitudesRespuesta.status === 401 ||
          pedidosRespuesta.status === 401
        ) {
          localStorage.removeItem('tokenAdmin');
          navigate('/login');
          return;
        }

        if (!solicitudesRespuesta.ok || !pedidosRespuesta.ok) {
          throw new Error('No se pudieron cargar los datos.');
        }

        const solicitudesDatos = await solicitudesRespuesta.json();
        const pedidosDatos = await pedidosRespuesta.json();

        setSolicitudes(solicitudesDatos);
        setPedidos(pedidosDatos);

      } catch (error) {
        console.error('Error al cargar el panel:', error);
        setError('No fue posible cargar la información.');
      } finally {
        setCargando(false);
      }
    };

    obtenerDatos();
  }, [navigate]);

  return (
    <div className="admin-container">

      <h1>Panel administrativo</h1>

      <p>Bienvenida a la administración de Momentia.</p>

      <button onClick={cerrarSesion}>
        Cerrar sesión
      </button>

      {/* SECCIÓN DE PEDIDOS */}

      <section className="admin-pedidos">

        <h2>Pedidos recibidos</h2>

        <p>Total de pedidos: {pedidos.length}</p>

        {cargando && <p>Cargando pedidos...</p>}

        {!cargando && pedidos.length === 0 && (
          <p>Aún no hay pedidos registrados.</p>
        )}

        <div className="pedidos-lista">

          {pedidos.map((pedido) => (

            <article className="pedido-card" key={pedido._id}>

              <h3>Pedido #{pedido._id.slice(-6)}</h3>

              <p>
                <strong>Cliente:</strong> {pedido.cliente.nombre}
              </p>

              <p>
                <strong>Correo:</strong> {pedido.cliente.correo}
              </p>

              <p>
                <strong>Teléfono:</strong> {pedido.cliente.telefono}
              </p>

              <h4>Experiencias solicitadas</h4>

              {pedido.experiencias.map((experiencia, indice) => (

                <div key={`${pedido._id}-${indice}`}>

                  <p>
                    {experiencia.nombre}
                  </p>

                  <p>
                    Cantidad: {experiencia.cantidad}
                  </p>

                  <p>
                    Precio: ${experiencia.precio.toLocaleString('es-CO')}
                  </p>

                  <p>
                    Subtotal: ${
                      (
                        experiencia.precio * experiencia.cantidad
                      ).toLocaleString('es-CO')
                    }
                  </p>

                </div>

              ))}

              <h3>
                Total: ${pedido.total.toLocaleString('es-CO')}
              </h3>

              <p>
                <strong>Estado:</strong> {pedido.estado}
              </p>

              <small>
                Fecha: {new Date(pedido.createdAt).toLocaleString('es-CO')}
              </small>

            </article>

          ))}

        </div>

      </section>

      {/* SECCIÓN DE SOLICITUDES */}

      <section className="admin-solicitudes">

        <h2>Solicitudes recibidas</h2>

        <p>Total de solicitudes: {solicitudes.length}</p>

        {cargando && <p>Cargando solicitudes...</p>}

        {!cargando && solicitudes.length === 0 && (
          <p>Aún no hay solicitudes registradas.</p>
        )}

        <div className="solicitudes-lista">

          {solicitudes.map((solicitud) => (

            <div className="solicitud-card" key={solicitud._id}>

              <h3>{solicitud.nombre}</h3>

              <p>
                <strong>Correo:</strong> {solicitud.correo}
              </p>

              <p>
                <strong>Mensaje:</strong> {solicitud.mensaje}
              </p>

              <small>
                {new Date(solicitud.createdAt).toLocaleString('es-CO')}
              </small>

            </div>

          ))}

        </div>

      </section>

      {error && <p>{error}</p>}

    </div>
  );
}

export default Admin;