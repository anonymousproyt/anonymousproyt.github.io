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
        console.log(myObj);
        poblarMenu(myObj);
        cargarPaginacion(myObj);
    }

    /* LLENA LOS JUEGOS DEL MENU PRINCIPAL CON LOS JUEGOS QUE ESTAN EN LA BASE DE DATOS JSON */
    function poblarMenu(jsonObj){
        // Si esta en el index general
        if(location.pathname.substring(location.pathname.lastIndexOf('/') + 1, location.pathname.length) == "index.html"){
            for(var i = 0; (i < 16) && (i < jsonObj.juegos.length - 1) ; i++){
                document.getElementById("juegocontenido" + (i+1)).style.display = "inline-block";
                document.getElementById("imagenjuegocontenido" + (i+1)).src = jsonObj.juegos[(jsonObj.juegos.length - 1) - i].imagentapa;
                document.getElementById("textojuegocontenido" + (i+1)).textContent = jsonObj.juegos[(jsonObj.juegos.length - 1) - i].nombre;
            }
        // Si esta en cualquier otra pagina
        }else{
            // Contiene el numero de pagina actual
            var pagActual = location.pathname.substring(location.pathname.lastIndexOf('/') + 1, location.pathname.lastIndexOf('.'));

            for(var i = 1; (i < 16) && (((jsonObj.juegos.length - (16 * (pagActual - 1))) - i) >= 0) ; i++){
                document.getElementById("juegocontenido" + i).style.display = "inline-block";
                document.getElementById("imagenjuegocontenido" + i).src = jsonObj.juegos[(jsonObj.juegos.length - (16 * (pagActual - 1))) - i].imagentapa;
                document.getElementById("textojuegocontenido" + i).textContent = jsonObj.juegos[(jsonObj.juegos.length - (16 * (pagActual - 1))) - i].nombre;
            }
        }
    }

    function cargarPaginacion(jsonObj) { 
        for(var i = 0; (i < ((Math.floor(jsonObj.juegos.length / 16)) + 1)) && (i < 5); i++){
            document.getElementById("pageopcion" + (i+1)).style.display = "list-item";
            document.getElementById("textopageopcion" + (i+1)).textContent = (i+1);
            // Si esta en el index general
            if(location.pathname.substring(location.pathname.lastIndexOf('/') + 1, location.pathname.length) == "index.html"){
                document.getElementById("textopageopcion" + (i+1)).setAttribute('href', location.pathname.substring(0, location.pathname.lastIndexOf('/') + 1) +'subidos/'+(i+1)+".html");
            // Si esta en una pagina normal (2,3,4,...)
            }else if(i == 0){ // Si tiene que ir al index
                document.getElementById("textopageopcion" + (i+1)).setAttribute('href', location.pathname.substring(0, location.pathname.lastIndexOf('/')).substring(0, location.pathname.substring(0, location.pathname.lastIndexOf('/')).lastIndexOf('/') + 1) + "index.html");
            }else{ // Si tiene que ir a otra pagina normal
                document.getElementById("textopageopcion" + (i+1)).setAttribute('href', location.pathname.substring(0, location.pathname.lastIndexOf('/') + 1)+(i+1)+".html");
            }
        }
    }
    



})