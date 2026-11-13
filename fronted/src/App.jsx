import { useState } from 'react';
import './App.css';
const experiencias = [
    {
    id: 1,
    nombre: 'Desayuno especial',
    descripcion: 'Un desayuno sorpresa para compartir en un día especial.',
    precio: 45000,
    imagen: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0',
    ocasiones: ['Cumpleaños', 'Día de la Madre', 'Día del Padre'],
    personas: ['Mi mamá', 'Mi papá', 'Un familiar']
},
    {
        id: 2,
        nombre: 'Tarde de café',
        descripcion: 'Una tarde agradable para conversar y disfrutar.',
        precio: 30000,
        ocasiones: ['Cumpleaños', 'Quiero sorprender'],
        personas: ['Mi papá', 'Mi mamá', 'Un amigo', 'Un familiar']
    },
    {
        id: 3,
        nombre: 'Taller de arte',
        descripcion: 'Una experiencia creativa para pintar y aprender.',
        precio: 70000,
        ocasiones: ['Cumpleaños', 'Aniversario', 'Quiero sorprender'],
        personas: ['Mi pareja', 'Un amigo', 'Un familiar']
    },
    {
        id: 4,
        nombre: 'Día de relajación',
        descripcion: 'Un espacio para descansar y disfrutar del bienestar.',
        precio: 90000,
        ocasiones: ['Cumpleaños', 'Día de la Madre', 'Día del Padre'],
        personas: ['Mi mamá', 'Mi papá', 'Mi pareja']
    },
    {
        id: 5,
        nombre: 'Cena especial para dos',
        descripcion: 'Una cena para compartir momentos inolvidables.',
        precio: 150000,
        ocasiones: ['Aniversario', 'San Valentín', 'Cumpleaños'],
        personas: ['Mi pareja']
    },
    {
        id: 6,
        nombre: 'Experiencia de aventura',
        descripcion: 'Un plan diferente para disfrutar y vivir emociones.',
        precio: 250000,
        ocasiones: ['Cumpleaños', 'Quiero sorprender'],
        personas: ['Mi pareja', 'Un amigo', 'Un familiar']
    },
    {
        id: 7,
        nombre: 'Picnic sorpresa',
        descripcion: 'Un picnic al aire libre para compartir y disfrutar.',
        precio: 60000,
        ocasiones: ['Cumpleaños', 'Aniversario', 'Quiero sorprender'],
        personas: ['Mi pareja', 'Un amigo', 'Mi mamá', 'Un familiar']
    },
    {
        id: 8,
        nombre: 'Spa para dos',
        descripcion: 'Una experiencia de relajación para disfrutar en compañía.',
        precio: 180000,
        ocasiones: ['Aniversario', 'San Valentín', 'Cumpleaños'],
        personas: ['Mi pareja', 'Mi mamá', 'Un amigo']
    },
    {
        id: 9,
        nombre: 'Clase de baile',
        descripcion: 'Aprende nuevos pasos y disfruta de la música.',
        precio: 80000,
        ocasiones: ['Cumpleaños', 'Quiero sorprender'],
        personas: ['Mi pareja', 'Un amigo', 'Un familiar']
    },
    {
        id: 10,
        nombre: 'Caja de dulces personalizada',
        descripcion: 'Una selección de dulces para sorprender a alguien especial.',
        precio: 40000,
        ocasiones: ['Cumpleaños', 'San Valentín', 'Día de la Madre', 'Día del Padre'],
        personas: ['Mi pareja', 'Mi mamá', 'Mi papá', 'Un amigo', 'Un familiar']
    },
    {
        id: 11,
        nombre: 'Escapada de fin de semana',
        descripcion: 'Un viaje para desconectarse y descubrir nuevos lugares.',
        precio: 350000,
        ocasiones: ['Aniversario', 'San Valentín', 'Cumpleaños'],
        personas: ['Mi pareja', 'Un amigo', 'Un familiar']
    },
    {
        id: 12,
        nombre: 'Taller de cocina',
        descripcion: 'Una actividad para aprender recetas y compartir sabores.',
        precio: 120000,
        ocasiones: ['Cumpleaños', 'Día de la Madre', 'Día del Padre', 'Quiero sorprender'],
        personas: ['Mi pareja', 'Mi mamá', 'Mi papá', 'Un amigo', 'Un familiar']
    },
    {
        id: 13,
        nombre: 'Sesión de fotografía',
        descripcion: 'Conserva recuerdos especiales con una sesión fotográfica.',
        precio: 220000,
        ocasiones: ['Cumpleaños', 'Aniversario', 'San Valentín'],
        personas: ['Mi pareja', 'Un amigo', 'Un familiar']
    },
    {
        id: 14,
        nombre: 'Experiencia de spa premium',
        descripcion: 'Un día completo de bienestar, descanso y cuidado personal.',
        precio: 280000,
        ocasiones: ['Cumpleaños', 'Día de la Madre', 'Aniversario'],
        personas: ['Mi mamá', 'Mi pareja', 'Un familiar']
    },
    {
        id: 15,
        nombre: 'Día de deportes extremos',
        descripcion: 'Una aventura llena de adrenalina y nuevas emociones.',
        precio: 320000,
        ocasiones: ['Cumpleaños', 'Quiero sorprender'],
        personas: ['Mi pareja', 'Un amigo', 'Un familiar']
    }
];


function App() {
  const [ocasion, setOcasion] = useState('');
  const [persona, setPersona] = useState('');
  const [presupuesto, setPresupuesto] = useState('');
  const [resultados, setResultados] = useState([]);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');

  const buscarExperiencia = (e) => {
    e.preventDefault();

    if (!ocasion || !persona || !presupuesto) {
        alert('Por favor, completa todos los campos del buscador.');
        return;
    }

    let precioMinimo = 0;
    let precioMaximo = 0;

    if (presupuesto === 'Hasta $50.000') {
        precioMaximo = 50000;
    } else if (presupuesto === '$50.000 - $100.000') {
        precioMinimo = 50000;
        precioMaximo = 100000;
    } else if (presupuesto === '$100.000 - $200.000') {
        precioMinimo = 100000;
        precioMaximo = 200000;
    } else if (presupuesto === 'Más de $200.000') {
        precioMinimo = 200000;
        precioMaximo = Infinity;
    }

    const experienciasFiltradas = experiencias.filter((experiencia) => {
        const coincideOcasion = experiencia.ocasiones.includes(ocasion);
        const coincidePersona = experiencia.personas.includes(persona);

        const coincidePresupuesto =
            experiencia.precio >= precioMinimo &&
            experiencia.precio <= precioMaximo;

        return coincideOcasion && coincidePersona && coincidePresupuesto;
    });

    setResultados(experienciasFiltradas);
    setBusquedaRealizada(true);
};

  const enviarContacto = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch('http://localhost:3000/api/solicitudes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, correo, mensaje }),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.mensaje || 'No se pudo enviar el mensaje.');
      }

      alert('¡Tu mensaje fue enviado correctamente!');
      setNombre('');
      setCorreo('');
      setMensaje('');
    } catch (error) {
      console.error('Error:', error);
      alert('No fue posible enviar el mensaje. Verifica que el servidor esté funcionando.');
    }
  };

  return (
    <>
      <header>
        <div className="logo">
          <h1>Momentia</h1>
          <p>Regala momentos, crea recuerdos.</p>
        </div>

        <nav>
          <a href="#inicio">Inicio</a>
          <a href="#experiencias">Experiencias</a>
          <a href="#como-funciona">¿Cómo funciona?</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="hero-text">
            <span className="etiqueta">✦ Encuentra algo especial</span>

            <h2>
              Regala momentos,
              <span> no solo cosas.</span>
            </h2>

            <p>
              Descubre experiencias únicas para sorprender, celebrar y crear
              recuerdos que duren para siempre.
            </p>

            <div className="hero-buttons">
              <a href="#experiencias" className="boton-principal">
                Explorar experiencias
              </a>

              <a href="#recomendaciones" className="boton-secundario">
                Necesito una recomendación
              </a>
            </div>
          </div>

          <div className="hero-card">
            <div className="icono-regalo">🎁</div>
            <p>El regalo perfecto</p>
            <h3>Una experiencia para recordar</h3>
            <span>Hecho para compartir momentos especiales.</span>
          </div>
        </section>

        <section className="buscador">
          <h2>¿Qué tipo de momento quieres regalar?</h2>
          <p>Encuentra una experiencia según lo que estás buscando.</p>

          <form className="form-busqueda" onSubmit={buscarExperiencia}>
            <select value={ocasion} onChange={(e) => setOcasion(e.target.value)}>
              <option value="">Selecciona una ocasión</option>
              <option value="Cumpleaños">Cumpleaños</option>
              <option value="Aniversario">Aniversario</option>
              <option value="San Valentín">San Valentín</option>
              <option value="Día de la Madre">Día de la Madre</option>
              <option value="Día del Padre">Día del Padre</option>
              <option value="Quiero sorprender">Quiero sorprender</option>
            </select>

            <select value={persona} onChange={(e) => setPersona(e.target.value)}>
              <option value="">¿Para quién es?</option>
              <option value="Mi pareja">Mi pareja</option>
              <option value="Mi mamá">Mi mamá</option>
              <option value="Mi papá">Mi papá</option>
              <option value="Un amigo">Un amigo</option>
              <option value="Un familiar">Un familiar</option>
            </select>

            <select
              value={presupuesto}
              onChange={(e) => setPresupuesto(e.target.value)}
            >
              <option value="">Presupuesto</option>
              <option value="Hasta $50.000">Hasta $50.000</option>
              <option value="$50.000 - $100.000">$50.000 - $100.000</option>
              <option value="$100.000 - $200.000">$100.000 - $200.000</option>
              <option value="Más de $200.000">Más de $200.000</option>
            </select>

            <button type="submit">Buscar</button>
          </form>
        </section>
                {busquedaRealizada && (
          <section className="resultados-busqueda">
            <div className="titulo-seccion">
              <span>RECOMENDACIONES</span>
              <h2>Experiencias para ti</h2>
              <p>Encontramos estas opciones según tus preferencias.</p>
            </div>

            {resultados.length > 0 ? (
              <div className="experiencias-grid">
                {resultados.map((experiencia) => (
                  <article className="experiencia-card" key={experiencia.id}>
                      <img
                     src={experiencia.imagen}
                     alt={experiencia.nombre}
                    className="experiencia-foto"
    />
                    <div className="experiencia-info">
                      <h3>{experiencia.nombre}</h3>
                      <p>{experiencia.descripcion}</p>
                      <strong>
                        ${experiencia.precio.toLocaleString('es-CO')}
                      </strong>
                      <a href="#contacto">Consultar experiencia →</a>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="sin-resultados">
                No encontramos experiencias para esos criterios.
                Intenta con otro presupuesto o selección.
              </p>
            )}
          </section>
        )}
<section id="catalogo" className="destacadas">
    <div className="titulo-seccion">
        <span>DESCUBRE MOMENTIA</span>
        <h2>Todas nuestras experiencias</h2>
        <p>Explora opciones especiales para regalar y compartir.</p>
    </div>

    <div className="experiencias-grid">
        {experiencias.map((experiencia) => (
            <article className="experiencia-card" key={experiencia.id}>
                <div className="experiencia-info">
                    <h3>{experiencia.nombre}</h3>
                    <p>{experiencia.descripcion}</p>
                    <strong>
                        ${experiencia.precio.toLocaleString('es-CO')}
                    </strong>
                    <a href="#contacto">Consultar experiencia →</a>
                </div>
            </article>
        ))}
    </div>
</section>
        <section id="experiencias" className="categorias">
          <div className="titulo-seccion">
            <span>DESCUBRE</span>
            <h2>Experiencias para cada ocasión</h2>
            <p>
              Porque cada persona es diferente, encuentra un momento pensado
              especialmente para ella.
            </p>
          </div>

          <div className="categorias-grid">
            <article className="categoria">
              <div className="categoria-icono">♡</div>
              <h3>Momentos románticos</h3>
              <p>Cenas, planes para parejas y experiencias para compartir.</p>
              <a href="#destacadas">Explorar →</a>
            </article>

            <article className="categoria">
              <div className="categoria-icono">✧</div>
              <h3>Bienestar & Spa</h3>
              <p>Regala tranquilidad, relajación y un momento para descansar.</p>
              <a href="#destacadas">Explorar →</a>
            </article>

            <article className="categoria">
              <div className="categoria-icono">✎</div>
              <h3>Arte & creatividad</h3>
              <p>Talleres y actividades para crear y aprender.</p>
              <a href="#destacadas">Explorar →</a>
            </article>

            <article className="categoria">
              <div className="categoria-icono">◇</div>
              <h3>Aventura</h3>
              <p>Emociones, naturaleza y nuevas experiencias.</p>
              <a href="#destacadas">Explorar →</a>
            </article>

            <article className="categoria">
              <div className="categoria-icono">☼</div>
              <h3>Escapadas</h3>
              <p>Una oportunidad para desconectarse y descubrir lugares.</p>
              <a href="#destacadas">Explorar →</a>
            </article>

            <article className="categoria">
              <div className="categoria-icono">♫</div>
              <h3>Música & entretenimiento</h3>
              <p>Planes para disfrutar y vivir algo diferente.</p>
              <a href="#destacadas">Explorar →</a>
            </article>
          </div>
        </section>

        <section id="destacadas" className="destacadas">
          <div className="titulo-seccion">
            <span>PARA SORPRENDER</span>
            <h2>Experiencias destacadas</h2>
            <p>Algunas ideas para convertir un día común en un recuerdo especial.</p>
          </div>

          <div className="experiencias-grid">
            <article className="experiencia-card">
              <div className="experiencia-imagen">🌹</div>
              <div className="experiencia-info">
                <span>ROMÁNTICO</span>
                <h3>Cena especial para dos</h3>
                <p>Una noche para disfrutar, conversar y crear recuerdos.</p>
                <strong>Desde $120.000</strong>
                <a href="#contacto">Ver experiencia →</a>
              </div>
            </article>

            <article className="experiencia-card">
              <div className="experiencia-imagen">🧘</div>
              <div className="experiencia-info">
                <span>BIENESTAR</span>
                <h3>Día de relajación</h3>
                <p>Un espacio pensado para descansar y disfrutar.</p>
                <strong>Desde $90.000</strong>
                <a href="#contacto">Ver experiencia →</a>
              </div>
            </article>

            <article className="experiencia-card">
              <div className="experiencia-imagen">🎨</div>
              <div className="experiencia-info">
                <span>CREATIVIDAD</span>
                <h3>Taller de arte</h3>
                <p>Una experiencia diferente para aprender y crear.</p>
                <strong>Desde $70.000</strong>
                <a href="#contacto">Ver experiencia →</a>
              </div>
            </article>
          </div>
        </section>

        <section id="recomendaciones" className="ia">
          <div className="ia-contenido">
            <span>✦ TU ASISTENTE PERSONAL</span>
            <h2>¿No sabes qué regalar?</h2>
            <p>
              Cuéntanos un poco sobre esa persona y te ayudaremos a encontrar
              una experiencia que realmente le guste.
            </p>

            <ul>
              <li>✓ Según sus intereses</li>
              <li>✓ Según tu presupuesto</li>
              <li>✓ Según la ocasión</li>
              <li>✓ Según su edad</li>
            </ul>

            <a href="#contacto" className="boton-principal">
              Encontrar el regalo ideal
            </a>
          </div>

          <div className="ia-card">
            <div>✨</div>
            <h3>Momentia AI</h3>
            <p>
              "Cuéntame para quién estás buscando un regalo y te ayudaré a
              encontrar el momento perfecto."
            </p>
          </div>
        </section>

        <section id="como-funciona" className="como-funciona">
          <div className="titulo-seccion">
            <span>MUY FÁCIL</span>
            <h2>Regalar un momento es sencillo</h2>
            <p>Solo necesitas unos cuantos pasos para encontrar el regalo perfecto.</p>
          </div>

          <div className="pasos">
            <article>
              <div className="numero">01</div>
              <h3>Explora</h3>
              <p>Descubre experiencias pensadas para diferentes gustos y ocasiones.</p>
            </article>

            <article>
              <div className="numero">02</div>
              <h3>Elige</h3>
              <p>Selecciona la experiencia que mejor representa a esa persona.</p>
            </article>

            <article>
              <div className="numero">03</div>
              <h3>Reserva</h3>
              <p>Completa el formulario y solicita tu reserva de manera sencilla.</p>
            </article>

            <article>
              <div className="numero">04</div>
              <h3>Sorprende</h3>
              <p>Regala la experiencia y convierte ese momento en un recuerdo.</p>
            </article>
          </div>
        </section>

        <section id="nosotros" className="nosotros">
          <div className="nosotros-texto">
            <span>NUESTRA HISTORIA</span>
            <h2>Creemos que los mejores regalos son los momentos que recordamos.</h2>
            <p>
              Momentia nace de una idea sencilla: muchas veces no sabemos qué
              regalar, pero sabemos que queremos hacer sentir especial a alguien.
            </p>
            <p>
              Por eso creamos un espacio donde encontrar experiencias que
              conecten a las personas, celebrar ocasiones importantes y crear
              recuerdos que duren mucho más que un objeto.
            </p>
          </div>

          <div className="frase">
            <span>✦</span>
            <blockquote>
              "Un regalo puede abrirse en un momento, pero un recuerdo puede
              acompañarnos toda la vida."
            </blockquote>
          </div>
        </section>

        <section id="contacto" className="contacto">
          <div className="titulo-seccion">
            <span>HABLEMOS</span>
            <h2>¿Tienes alguna pregunta?</h2>
            <p>Estamos aquí para ayudarte.</p>
          </div>

          <form id="formContacto" onSubmit={enviarContacto}>
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Escribe tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />

            <label htmlFor="correo">Correo electrónico</label>
            <input
              type="email"
              id="correo"
              name="correo"
              placeholder="ejemplo@correo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />

            <label htmlFor="mensaje">¿En qué podemos ayudarte?</label>
            <textarea
              id="mensaje"
              name="mensaje"
              placeholder="Escribe tu mensaje..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
            />

            <button type="submit">Enviar mensaje</button>
          </form>
        </section>
      </main>

      <footer>
        <div className="footer-logo">
          <h2>Momentia</h2>
          <p>Regala momentos, crea recuerdos.</p>
        </div>

        <div className="footer-enlaces">
          <h3>Explora</h3>
          <a href="#inicio">Inicio</a>
          <a href="#catalogo">Experiencias</a>
          <a href="#como-funciona">¿Cómo funciona?</a>
        </div>

        <div className="footer-enlaces">
          <h3>Momentia</h3>
          <a href="#nosotros">Nosotros</a>
          <a href="#contacto">Contacto</a>
        </div>

        <div className="footer-enlaces">
          <h3>Síguenos</h3>
          <a href="#contacto">Instagram</a>
          <a href="#contacto">Facebook</a>
        </div>

        <div className="footer-final">
          <p>© 2026 Momentia. Todos los derechos reservados por su creadora E.A.</p>
        </div>
      </footer>
    </>
  );
}

export default App;