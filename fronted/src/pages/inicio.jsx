function Inicio() {
    return (
        <section id="inicio" className="hero">
            <div className="hero-text">
                <span className="etiqueta">
                    ✦ Encuentra algo especial
                </span>

                <h2>
                    Regala momentos,
                    <span> no solo cosas.</span>
                </h2>

                <p>
                    Descubre experiencias únicas para sorprender,
                    celebrar y crear recuerdos que duren para siempre.
                </p>

                <div className="hero-buttons">
                    <a href="/experiencias" className="boton-principal">
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
    );
}

export default Inicio;