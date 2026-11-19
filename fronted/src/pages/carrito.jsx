import { useState } from 'react';

function Carrito({ carrito, actualizarCantidad, eliminarDelCarrito, vaciarCarrito }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [enviando, setEnviando] = useState(false);

  const total = carrito.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
    0
  );

  const finalizarPedido = async (e) => {
    e.preventDefault();

    if (carrito.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    setEnviando(true);

    try {
      const respuesta = await fetch('http://localhost:3000/api/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cliente: {
            nombre,
            correo,
            telefono
          },
          experiencias: carrito,
          total
        })
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.mensaje || 'No se pudo registrar el pedido.');
      }

      alert('¡Tu pedido fue registrado correctamente!');

      vaciarCarrito();
      setNombre('');
      setCorreo('');
      setTelefono('');

    } catch (error) {
      console.error('Error al registrar el pedido:', error);
      alert(error.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="carrito-pagina">
      <div className="titulo-seccion">
        <span>TU SELECCIÓN</span>
        <h2>Mi carrito</h2>
        <p>Revisa tus experiencias antes de confirmar tu pedido.</p>
      </div>

      {carrito.length === 0 ? (
        <div className="carrito-vacio">
          <h3>Tu carrito está vacío</h3>
          <p>Explora nuestras experiencias y encuentra el regalo perfecto.</p>
        </div>
      ) : (
        <>
          <div className="carrito-productos">
            {carrito.map((item) => (
              <article className="carrito-producto" key={item.id}>
                <img src={item.imagen} alt={item.nombre} />

                <div className="carrito-producto-info">
                  <h3>{item.nombre}</h3>

                  <p>
                    ${item.precio.toLocaleString('es-CO')}
                  </p>

                  <div className="cantidad-controles">
                    <button
                      type="button"
                      onClick={() =>
                        actualizarCantidad(item.id, item.cantidad - 1)
                      }
                    >
                      −
                    </button>

                    <span>{item.cantidad}</span>

                    <button
                      type="button"
                      onClick={() =>
                        actualizarCantidad(item.id, item.cantidad + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="eliminar-producto"
                    onClick={() => eliminarDelCarrito(item.id)}
                  >
                    Eliminar
                  </button>
                </div>

                <strong>
                  ${(item.precio * item.cantidad).toLocaleString('es-CO')}
                </strong>
              </article>
            ))}
          </div>

          <div className="carrito-resumen">
            <h3>Resumen del pedido</h3>

            <p>
              Total:
              <strong>${total.toLocaleString('es-CO')}</strong>
            </p>
          </div>

          <form className="formulario-pedido" onSubmit={finalizarPedido}>
            <h3>Datos del comprador</h3>

            <label>Nombre completo</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />

            <label>Correo electrónico</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />

            <label>Teléfono</label>
            <input
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />

            <button type="submit" disabled={enviando}>
              {enviando ? 'Registrando pedido...' : 'Confirmar pedido'}
            </button>
          </form>
        </>
      )}
    </main>
  );
}

export default Carrito;