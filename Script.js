// ======================================
// BUSCADOR DE EXPERIENCIAS
// ======================================

const ocasion = document.getElementById("ocasion");
const persona = document.getElementById("persona");
const presupuesto = document.getElementById("presupuesto");
const btnBuscar = document.getElementById("btnBuscar");

btnBuscar.addEventListener("click", function () {

    const ocasionSeleccionada = ocasion.value;
    const personaSeleccionada = persona.value;
    const presupuestoSeleccionado = presupuesto.value;

    if (
        ocasionSeleccionada === "" ||
        personaSeleccionada === "" ||
        presupuestoSeleccionado === ""
    ) {
        alert("Por favor, completa las tres opciones.");
        return;
    }

    alert(
        "Encontraremos una experiencia para " +
        personaSeleccionada +
        " por " +
        presupuestoSeleccionado +
        " para " +
        ocasionSeleccionada +
        "."
    );
});


// ======================================
// FORMULARIO DE CONTACTO
// ======================================

const formContacto = document.getElementById("formContacto");

formContacto.addEventListener("submit", async function (event) {

    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const mensaje = document.getElementById("mensaje").value;

    try {

        const respuesta = await fetch("http://localhost:3000/api/solicitudes", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nombre: nombre,
                correo: correo,
                mensaje: mensaje
            })
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(resultado.mensaje);
        }

        alert("¡Tu mensaje fue enviado correctamente!");

        formContacto.reset();

    } catch (error) {

        console.error("Error al enviar el mensaje:", error);

        alert("No fue posible enviar tu mensaje. Inténtalo nuevamente.");
    }

});