// ******************************
// Variables
// ******************************

const selectMarca = document.querySelector('#marca');
const selectYear = document.querySelector('#year');
const selectPrecioMinimo = document.querySelector('#minimo');
const selectPrecioMaximo = document.querySelector('#maximo');
const selectPuertas = document.querySelector('#puertas');
const selectColor = document.querySelector('#color');
const selectTransmision = document.querySelector('#transmision');

// Contenedor para resultados
const resultados = document.querySelector('#resultado');

const yearMax = new Date().getFullYear();
const yearMin = yearMax-10;

// Objetos con los datos de busqueda

const datosBusqueda = {
    marca: '', 
    year: '', 
    precioMinimo: '',
    precioMaximo: '',
    puertas: '', 
    color: '', 
    transmision: '' 
}

// ******************************
// Eventos
// ******************************

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#buscador').reset();
    
    mostrarAutos(autos); // Muestra el listado de autos
    
    llenarSelectYears(); // Llena el select de autos
});

// Event listener para los valores de la busqueda

selectMarca.addEventListener('change', (e) => {
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
});
selectYear.addEventListener('change', (e) => {
    datosBusqueda.year = parseInt(e.target.value);
    filtrarAuto();
});
selectPrecioMinimo.addEventListener('change', (e) => {
    datosBusqueda.precioMinimo = parseInt(e.target.value);
    filtrarAuto();
});
selectPrecioMaximo.addEventListener('change', (e) => {
    datosBusqueda.precioMaximo = parseInt(e.target.value);
    filtrarAuto();
});
selectPuertas.addEventListener('change', (e) => {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
});
selectColor.addEventListener('change', (e) => {
    datosBusqueda.color = e.target.value;
    filtrarAuto();
});
selectTransmision.addEventListener('change', (e) => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});


// ******************************
// Funciones
// ******************************

function mostrarAutos (autos){
    // resultado.textContent = '';

    // La siguiente forma de borrar contenido seria mas rapida
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }

    if(autos.length === 0) {
        autoHTML = document.createElement('div');
        autoHTML.textContent = 'No hay resultados';
        autoHTML.classList.add('error')
        resultados.appendChild(autoHTML);
        return;
    }

    autos.forEach(auto => {
        const {marca, modelo, year, precio, puertas, color, transmision} = auto;
        autoHTML = document.createElement('p');
        autoHTML.textContent = `
        Marca ${marca} - Modelo ${modelo} - Año ${year}
         - u$s ${precio} - ${puertas} puertas - Color ${color} - Transmisión ${transmision}
        `;

        resultados.appendChild(autoHTML);
    });
}

function llenarSelectYears(){
    for (let i = yearMax; i >= yearMin; i--) {
        const element = document.createElement('option');
        element.value = i;
        element.textContent = i;
        selectYear.appendChild(element);
    }
}

function filtrarAuto(){
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    mostrarAutos(resultado);
}

function filtrarMarca(auto){
    if(datosBusqueda.marca) {
        return auto.marca === datosBusqueda.marca;
    } else {
        return auto;
    }
}

function filtrarYear(auto){
    if(datosBusqueda.year) {
        return auto.year === datosBusqueda.year;
    } else {
        return auto;
    }
}

function filtrarMinimo(auto){
    if(datosBusqueda.precioMinimo) {
        return auto.precio >= datosBusqueda.precioMinimo;
    } else {
        return auto;
    }
}

function filtrarMaximo(auto){
    if(datosBusqueda.precioMaximo) {
        return auto.precio <= datosBusqueda.precioMaximo;
    } else {
        return auto;
    }
}


function filtrarPuertas(auto){
    if(datosBusqueda.puertas) {
        return auto.puertas === datosBusqueda.puertas;
    } else {
        return auto;
    }
}

function filtrarTransmision(auto){
    if(datosBusqueda.transmision) {
        return auto.transmision === datosBusqueda.transmision;
    } else {
        return auto;
    }
}

function filtrarColor(auto){
    if(datosBusqueda.color) {
        return auto.color === datosBusqueda.color;
    } else {
        return auto;
    }
}
