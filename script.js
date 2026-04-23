const contenedor = document.getElementById('atractivos');
const inputBusqueda = document.getElementById('inputBusqueda');
const btnBuscar = document.getElementById('btnBuscar');
const btnLimpiar = document.getElementById('btnLimpiar');

const API_URL = 'https://api-colombia.com/api/v1/TouristicAttraction';

let atractivos = [];

// Cargar datos desde la API
async function cargarAtractivos() {
  try {
    const response = await fetch(API_URL);
    atractivos = await response.json();
    mostrarAtractivos(atractivos);
  } catch (error) {
    console.error('Error al cargar la API:', error);
    contenedor.innerHTML = '<p>Error cargando los atractivos turísticos.</p>';
  }
}

// Mostrar tarjetas
function mostrarAtractivos(lista) {
  contenedor.innerHTML = '';

  lista.forEach(lugar => {
    const imagen = (lugar.images && lugar.images.length > 0)
      ? lugar.images[0]
      : 'https://via.placeholder.com/400x200?text=Colombia';

    const card = document.createElement('article');
    card.classList.add('card');

    card.innerHTML = `
      <img 
        src="${imagen}" 
        alt="Imagen de ${lugar.name}"
        onerror="this.onerror=null;this.src='https://via.placeholder.com/400x200?text=Sin+Imagen';"
      >
      <div class="card-content">
        <h3>${lugar.name}</h3>
        <p>${lugar.description || 'Descripción no disponible'}</p>
      </div>
    `;

    contenedor.appendChild(card);
  });
}

// Buscar por nombre
btnBuscar.addEventListener('click', () => {
  const texto = inputBusqueda.value.toLowerCase().trim();

  const resultados = atractivos.filter(lugar =>
    lugar.name.toLowerCase().includes(texto)
  );

  mostrarAtractivos(resultados);
});

// Mostrar todos
btnLimpiar.addEventListener('click', () => {
  inputBusqueda.value = '';
  mostrarAtractivos(atractivos);
});

// Cargar al iniciar
cargarAtractivos();