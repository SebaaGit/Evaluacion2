// Dirección de la API que entrega usuarios de prueba
const API_URL = "https://jsonplaceholder.typicode.com/users";

// Aquí guardamos los usuarios que llegan desde la API
let usuarios = [];

// Función que consulta la API y muestra los datos
async function cargarUsuarios() {
    const estado = document.getElementById("estado");
    estado.textContent = "Cargando usuarios...";

    try {
        const respuesta = await fetch(API_URL);
        usuarios = await respuesta.json();
        mostrarUsuarios(usuarios);
    } catch (error) {
        estado.textContent = "No se pudieron cargar los usuarios. Revisa tu conexión.";
    }
}

// Función que dibuja las tarjetas en pantalla
function mostrarUsuarios(lista) {
    const contenedor = document.getElementById("resultados");
    const estado = document.getElementById("estado");

    contenedor.innerHTML = "";

    if (lista.length === 0) {
        estado.textContent = "No se encontraron usuarios.";
        return;
    }

    estado.textContent = "Usuarios encontrados: " + lista.length;

    lista.forEach(function(usuario) {
        contenedor.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4">
                <article class="card usuario shadow-sm">
                    <div class="card-body">
                        <h3 class="card-title h5">${usuario.name}</h3>
                        <p class="card-text mb-1"><strong>Correo:</strong> ${usuario.email}</p>
                        <p class="card-text mb-1"><strong>Ciudad:</strong> ${usuario.address.city}</p>
                        <p class="card-text mb-0"><strong>Empresa:</strong> ${usuario.company.name}</p>
                    </div>
                </article>
            </div>`;
    });
}

// Función que filtra por nombre o correo
function filtrarUsuarios() {
    const texto = document.getElementById("busqueda").value.toLowerCase().trim();

    const filtrados = usuarios.filter(function(usuario) {
        return usuario.name.toLowerCase().includes(texto) ||
               usuario.email.toLowerCase().includes(texto);
    });

    mostrarUsuarios(filtrados);
}

// Eventos de los botones
document.getElementById("btnBuscar").addEventListener("click", filtrarUsuarios);
document.getElementById("btnMostrar").addEventListener("click", function() {
    document.getElementById("busqueda").value = "";
    mostrarUsuarios(usuarios);
});

// También permite buscar al presionar Enter
document.getElementById("busqueda").addEventListener("keydown", function(evento) {
    if (evento.key === "Enter") {
        filtrarUsuarios();
    }
});

// Cargamos los usuarios al abrir la página
cargarUsuarios();
