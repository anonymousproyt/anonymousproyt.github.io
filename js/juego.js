'use strict'

window.addEventListener('load', () => {


    /* CAMBIAR NOMBRE DE PAGINA POR EL NOMBRE DEL JUEGO */
    const url = new URL(window.location.href);
    document.title = url.searchParams.get("name");

    
 
    /* CARGAR CON LOS DATOS DEL JUEGO */

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
        console.log("aa");
        const myObj = JSON.parse(JSON.stringify(request.response));
        var juego = buscarJuego(myObj);
        cargarDatos(juego);
    }

    // Busca el juego en la base de datos y lo retorna
    function buscarJuego(jsonObj) {
        var nombreJuego = url.searchParams.get("name");
        var juego;
        var searchField = "nombre";
        for (var i=0 ; i < jsonObj.juegos.length ; i++){
            if (jsonObj.juegos[i][searchField] == nombreJuego) {
                juego = jsonObj.juegos[i];
            }
        }
        return juego;
    }

    // Carga los datos en pantalla con los datos del juego
    function cargarDatos(juego){
        console.log(juego);
        // Imagen tapa
        document.getElementById("imagentapa").src = juego.imagentapa;
        // Nombre
        document.getElementById("nombre").textContent = juego.nombre;
        // Genero
        var contenidoGenero = "";
        for(var i = 0;i < juego.genero.length;i++){
            contenidoGenero = contenidoGenero + juego.genero[i];
            if(i < (juego.genero.length - 1)){
                contenidoGenero = contenidoGenero + ", ";
            }
        }
        document.getElementById("genero").textContent = contenidoGenero;
        // Fecha lanzamiento
        var arrayFechaLanzamiento = juego.fechalanzamiento.split("/");
        var stringFechaLanzamiento = arrayFechaLanzamiento[0] + " de ";
        switch (arrayFechaLanzamiento[1]){
            case "01":
                stringFechaLanzamiento = stringFechaLanzamiento + "Enero";
                break;
            case "02":
                stringFechaLanzamiento = stringFechaLanzamiento + "Febrero";
                break;
            case "03":
                stringFechaLanzamiento = stringFechaLanzamiento + "Marzo";
                break;
            case "04":
                stringFechaLanzamiento = stringFechaLanzamiento + "Abril";
                break;
            case "05":
                stringFechaLanzamiento = stringFechaLanzamiento + "Mayo";
                break;
            case "06":
                stringFechaLanzamiento = stringFechaLanzamiento + "Junio";
                break;
            case "07":
                stringFechaLanzamiento = stringFechaLanzamiento + "Julio";
                break;
            case "08":
                stringFechaLanzamiento = stringFechaLanzamiento + "Agosto";
                break;
            case "09":
                stringFechaLanzamiento = stringFechaLanzamiento + "Septiembre";
                break;
            case "10":
                stringFechaLanzamiento = stringFechaLanzamiento + "Octubre";
                break;
            case "11":
                stringFechaLanzamiento = stringFechaLanzamiento + "Noviembre";
                break;
            case "12":
                stringFechaLanzamiento = stringFechaLanzamiento + "Diciembre";
                break;
        }
        stringFechaLanzamiento = stringFechaLanzamiento + " de ";
        stringFechaLanzamiento = stringFechaLanzamiento + arrayFechaLanzamiento[2];
        document.getElementById("fechalanzamiento").textContent = stringFechaLanzamiento;
        // Fecha actualizacion
        var arrayFechaActualizacion = juego.fechaactualizacion.split("/");
        var stringFechaActualizacion = arrayFechaActualizacion[0] + " de ";
        switch (arrayFechaActualizacion[1]){
            case "01":
                stringFechaActualizacion = stringFechaActualizacion + "Enero";
                break;
            case "02":
                stringFechaActualizacion = stringFechaActualizacion + "Febrero";
                break;
            case "03":
                stringFechaActualizacion = stringFechaActualizacion + "Marzo";
                break;
            case "04":
                stringFechaActualizacion = stringFechaActualizacion + "Abril";
                break;
            case "05":
                stringFechaActualizacion = stringFechaActualizacion + "Mayo";
                break;
            case "06":
                stringFechaActualizacion = stringFechaActualizacion + "Junio";
                break;
            case "07":
                stringFechaActualizacion = stringFechaActualizacion + "Julio";
                break;
            case "08":
                stringFechaActualizacion = stringFechaActualizacion + "Agosto";
                break;
            case "09":
                stringFechaActualizacion = stringFechaActualizacion + "Septiembre";
                break;
            case "10":
                stringFechaActualizacion = stringFechaActualizacion + "Octubre";
                break;
            case "11":
                stringFechaActualizacion = stringFechaActualizacion + "Noviembre";
                break;
            case "12":
                stringFechaActualizacion = stringFechaActualizacion + "Diciembre";
                break;
        }
        stringFechaActualizacion = stringFechaActualizacion + " de ";
        stringFechaActualizacion = stringFechaActualizacion + arrayFechaActualizacion[2];
        document.getElementById("fechaactualizacion").textContent = stringFechaActualizacion;
        // Idioma voces
        document.getElementById("idiomavoces").textContent = juego.idiomavoces;
        // Idioma textos
        document.getElementById("idiomatextos").textContent = juego.idiomatextos;
        // Tamaños
        document.getElementById("tamanio").textContent = juego.tamanio;
        // Requisitos
        document.getElementById("requisitos").textContent = juego.requisitos;
        // Descripción
        document.getElementById("descripcion").textContent = juego.descripcion;
        // Version
        document.getElementById("version").textContent = juego.descargas["0"].version;
        // Descripcion version
        document.getElementById("descripcionversion").textContent = juego.descargas["0"].descripcionversion;
        // Enlaces
        document.getElementById("enlaces").textContent = juego.descargas["0"].enlaces["0"];
        document.getElementById("enlaces").setAttribute('href',juego.descargas["0"].enlaces["0"]);
    }


})
