'use strict'

window.addEventListener('load', () => {




    /* FUNCIONES MENU PRINCIPAL */

    // URL del JSON 
    const requestURL = 'https://raw.githubusercontent.com/anonymousproyt/anonymousproyt.github.io/master/json/general.json';
    // Crear una solicitud
    const request = new XMLHttpRequest();
    // Abrir una nueva solicitud
    request.open('GET', requestURL);
    // XHR sabe que el servidor estará retornando JSON y que esto debería ser convertido en segundo plano en un objeto JavaScript
    request.responseType = 'json';
    // Envía la solicitud
    request.send();
    // Espera por la respuesta a retornar desde el servidor y luego, manejarla
    request.onload = function() {
        const myObj = JSON.parse(JSON.stringify(request.response));
        poblarMenu(myObj);
    }

    /* LLENA LOS JUEGOS DEL MENU PRINCIPAL CON LOS JUEGOS QUE ESTAN EN LA BASE DE DATOS JSON */
    function poblarMenu(jsonObj){
        const url = new URL(window.location.href);
        var tag = url.searchParams.get("tag").toLowerCase();
        var contador = 0;
        for(var i = 0; (contador < 16) && (i < jsonObj.juegos.length) ; i++){
            if((jsonObj.juegos[i].nombre).toLowerCase().includes(tag)){
                contador++;
                document.getElementById("juegocontenido" + contador).style.display = "inline-block";
                document.getElementById("imagenjuegocontenido" + contador).src = jsonObj.juegos[i].imagentapa;
                document.getElementById("textojuegocontenido" + contador).textContent = jsonObj.juegos[i].nombre;
            }
        }
    }
})


/* EVENTO QUE SE LLAMA AL HACER CLICK EN UN JUEGO */
function irAJuego(idjuego) {
    window.location.href = "juego.html?name=" + document.getElementById("textojuegocontenido" + idjuego).textContent;
}


/* EVENTO QUE SE LLAMA AL HACER CLICK EN BUSCAR JUEGO */
function buscar() {
    window.location.href = "buscar.html?tag=" + document.getElementById("textoBuscarJuego").value;
    document.getElementById("textoBuscarJuego").value = "";
}