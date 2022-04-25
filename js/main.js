//* Con este simulador lo que podemos hacer es ingresar un pais y una ciudad del mismo, y de esta manera se nos mostrara en el DOM el Clima.

const container = document.querySelector('.container');
const asideContainer = document.querySelector('#asideContainer');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
    e.preventDefault();

    // Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === '') {
        // Hubo un error
        mostrarError('Ambos campos son obligatorios');

        return;
    } else {

    }

    // Consultamos la API
    consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
    const alerta = document.querySelector('.mensajeError');

    if(!alerta) {
        const alerta = document.createElement('div');

        alerta.classList.add('mensajeError');
        alerta.innerHTML = `
            <span class="block"> <strong class="font-bold">Error!</strong> ${mensaje}</span>
        `
    
        asideContainer.appendChild(alerta);

        // Eliminar alerta despues de 3 seg
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
    
}

function consultarAPI(ciudad, pais) {
    const appId = 'bc216482814ee94c8b57c51639da6ec4';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    Spinner(); // Muestra spinner de carga

    fetch(url)
        .then( response => response.json())
        .then( datos => {
            limpiarHTML(); // Limpiar HTML previo
            if(datos.cod === '404') {
                mostrarError('Ciudad no encontrada.');

                return;
            }

            // Imprime la respuesta en el HTML
            mostrarClima(datos);
        })
}

function mostrarClima(datos) {
    const { name, main: { temp, temp_max, temp_min } } = datos;

    const centigrados = kelvinACentigrados(temp);
    const min = kelvinACentigrados(temp_min);
    const max = kelvinACentigrados(temp_max);

    const resultadoDiv = document.createElement('div');
    resultadoDiv.innerHTML = `
        <div class="card text-start w-75 h-50 border-light text-secondary m-auto mt-5 shadow-lg d-flex flex-column flex-wrap divCards">
            <div class="card-header text-dark d-flex flex-row align-items-center justify-content-between">
                <h2 class="card-title p-3">${name}</h2>
            </div>
            <div class="card-body">
                <p>Temp. Actual:<strong> ${centigrados} &#8451;</strong></p>
                <p>Máxima:<strong> ${max} &#8451;</strong></p>
                <p>Mínima:<strong> ${min} &#8451;</strong></p>
            </div>
        </div>
    `

    resultado.appendChild(resultadoDiv);
}

const kelvinACentigrados = grados => parseInt(grados - 273.15);

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

function Spinner() {
    const spinner = document.querySelector('.sk-circle');

    if(!spinner) {
        const divSpinner = document.createElement('div');
        divSpinner.classList.add('sk-circle');
    
        divSpinner.innerHTML = `
            <div class="sk-circle1 sk-child"></div>
            <div class="sk-circle2 sk-child"></div>
            <div class="sk-circle3 sk-child"></div>
            <div class="sk-circle4 sk-child"></div>
            <div class="sk-circle5 sk-child"></div>
            <div class="sk-circle6 sk-child"></div>
            <div class="sk-circle7 sk-child"></div>
            <div class="sk-circle8 sk-child"></div>
            <div class="sk-circle9 sk-child"></div>
            <div class="sk-circle10 sk-child"></div>
            <div class="sk-circle11 sk-child"></div>
            <div class="sk-circle12 sk-child"></div>
        `
    
        asideContainer.appendChild(divSpinner);
    
        setInterval(() => {
            divSpinner.remove()
        }, 500);
    }
    
}

//Switch Darkmode
let darkMode;

if(localStorage.getItem('darkMode')) { //Aqui pregunto si EXISTE
    darkMode = localStorage.getItem('darkMode'); //si existe, asigno la variable, si no existe, la variable pasa a llamarse light
} else {
    darkMode = "light";
}

localStorage.setItem('darkMode', darkMode); //Despues del If seteo el modo en el que haya sido o no guardado

$(() => {
    if(localStorage.getItem('darkMode') == "dark") {
        $('.item1').addClass('darkMode1')
        $('#logoChange').html("")
        $('#logoChange').prepend(`<a href="index.html"><img src="img/logoDm.png" alt="logo.png" width="250px"></a>`).css({"display": "none"}).fadeIn(500)
        $('.item2').addClass('darkMode2')
        $('.item3').addClass('darkMode3')
        $('.face').addClass('footerDm')

        $('#btnDarkMode').hide()
        $('#btnLightMode').show()
    } else {
        $('#btnLightMode').hide()
    }

    $('#btnDarkMode').click(() => { //Agrego que cuando al clickear, desaparezca uno u otro boton
        $('#btnDarkMode').hide()
        $('#btnLightMode').show()
        
        $('.item1').addClass('darkMode1')
        $('#logoChange').html("")
        $('#logoChange').prepend(`<a href="index.html"><img src="img/logoDm.png" alt="logo.png" width="250px"></a>`).css({"display": "none"}).fadeIn(500)
        $('select').addClass('darkMode1')
        $('.item2').addClass('darkMode2')
        $('.item3').addClass('darkMode3')
        $('.face').addClass('footerDm')

        localStorage.setItem('darkMode', "dark")
    })

    $('#btnLightMode').click(() => { //Agrego que cuando al clickear, desaparezca uno u otro boton
        $('.item1').removeClass('darkMode1')
        $('#logoChange').html("")
        $('#logoChange').prepend(`<a href="index.html"><img src="img/logo.png" alt="logo.png" width="250px"></a>`).css({"display": "none"}).fadeIn(500)
        $('select').removeClass('darkMode1')
        $('.item2').removeClass('darkMode2')
        $('.item3').removeClass('darkMode3')
        $('.face').removeClass('footerDm')

        $('#btnDarkMode').show()
        $('#btnLightMode').hide()

        localStorage.setItem('darkMode', "light")
    })
})