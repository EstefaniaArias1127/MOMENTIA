import experiencias from '../data/experiencias';

function Experiencias({ agregarAlCarrito }) {
  return (
    <section className="destacadas">
      <div className="titulo-seccion">
        <span>DESCUBRE MOMENTIA</span>
        <h2>Todas nuestras experiencias</h2>
        <p>Explora opciones especiales para regalar y compartir.</p>
      </div>

      <div className="experiencias-grid">
        {experiencias.map((experiencia) => (
          <article
            className="experiencia-card"
            key={experiencia.id}
            id={`experiencia-${experiencia.id}`}
          >
            <img
              src={experiencia.imagen}
              alt={experiencia.nombre}
              className="experiencia-foto"
            />

            <div className="experiencia-info">
              <h3>{experiencia.nombre}</h3>

              <p>{experiencia.descripcion}</p>

              <strong>
                ${Number(experiencia.precio).toLocaleString('es-CO')}
              </strong>

              <button
                type="button"
                onClick={() => agregarAlCarrito(experiencia)}
              >
                Agregar al carrito +
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Experiencias;