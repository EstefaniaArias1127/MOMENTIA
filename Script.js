const ocasion = document.getElementById("ocasion");
const persona = document.getElementById("persona");
const presupuesto = document.getElementById("presupuesto");
const btnBuscar = document.getElementById("btnBuscar");

btnBuscar.addEventListener("click", function () {

    const ocasionSeleccionada = ocasion.value;
    const personaSeleccionada = persona.value;
    const presupuestoSeleccionado = presupuesto.value;

    if (
        ocasionSeleccionada === "Selecciona una ocasión" ||
        personaSeleccionada === "¿Para quién es?" ||
        presupuestoSeleccionado === "Presupuesto"
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