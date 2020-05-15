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
        cargarPaginacion(myObj);
    }


    /* LLENA LOS JUEGOS DEL MENU PRINCIPAL CON LOS JUEGOS QUE ESTAN EN LA BASE DE DATOS JSON */
    function poblarMenu(jsonObj){
        var genero = location.pathname.substring((location.pathname.substring(0, location.pathname.lastIndexOf('/'))).lastIndexOf('/')+1, location.pathname.lastIndexOf('/'));
        var numPagina = location.pathname.substring(location.pathname.lastIndexOf('/') + 1, location.pathname.lastIndexOf('.'));
        var contador = 0;
        var contieneGenero = false;
        for(var i = 0; (contador < 16) && (i < (jsonObj.juegos.length-(16*(numPagina - 1)))) ; i++){
            for(var j=0;j < jsonObj.juegos[(jsonObj.juegos.length - (16*(numPagina - 1))) - i - 1].genero.length;j++){
                if((jsonObj.juegos[(jsonObj.juegos.length - (16*(numPagina - 1))) - i - 1].genero[j]).toLowerCase().includes(genero)){
                    contieneGenero = true;
                }
            }
            if(contieneGenero){
                contador++;
                document.getElementById("juegocontenido" + contador).style.display = "inline-block";
                document.getElementById("imagenjuegocontenido" + contador).src = "../." + jsonObj.juegos[(jsonObj.juegos.length - (16*(numPagina - 1))) - i - 1].imagentapa;
                document.getElementById("textojuegocontenido" + contador).textContent = jsonObj.juegos[(jsonObj.juegos.length - (16*(numPagina - 1))) - i - 1].nombre;
                contieneGenero = false;
            }
        }
        
    }

    function cargarPaginacion(jsonObj) { 
        var numPagina = location.pathname.substring(location.pathname.lastIndexOf('/') + 1, location.pathname.lastIndexOf('.'));
        var genero = location.pathname.substring((location.pathname.substring(0, location.pathname.lastIndexOf('/'))).lastIndexOf('/')+1, location.pathname.lastIndexOf('/'));
        document.getElementById("pageopciond").setAttribute('href',location.pathname);
        document.getElementById("pageopcioni").setAttribute('href',location.pathname);
        var contadorCantidadGenero = 0;
        var contieneGenero = false;
        for(var j = 0;j < jsonObj.juegos.length;j++){
            for(var k = 0;k < (jsonObj.juegos[j].genero.length-1);k++){
                if(jsonObj.juegos[j].genero[k] == genero){
                    contieneGenero = true;
                }
            }
            if(contieneGenero){
                contadorCantidadGenero++;
                contieneGenero = false;
            }
        }
        for(var i = 0; (((numPagina - (2-i))-1) < ((Math.floor(contadorCantidadGenero / 16)) + 1)) && (i < 5); i++){
            if((numPagina - (2-i)) > 0){
                document.getElementById("pageopcion" + (i+1)).style.display = "list-item";
                document.getElementById("textopageopcion" + (i+1)).textContent = (numPagina - (2-i));
                if((numPagina - (2-i)) == 1){
                    document.getElementById("textopageopcion" + (i+1)).setAttribute('href',(location.pathname.substring(0, location.pathname.lastIndexOf('/'))).substring(0 ,(location.pathname.substring(0, location.pathname.lastIndexOf('/'))).lastIndexOf('/')+1) + "index.html");
                    if(i == 1){
                        document.getElementById("pageopcioni").setAttribute('href',(location.pathname.substring(0, location.pathname.lastIndexOf('/'))).substring(0 ,(location.pathname.substring(0, location.pathname.lastIndexOf('/'))).lastIndexOf('/')+1) + "index.html");
                        document.getElementById("pageopcioni").style.display = "list-item";
                    }
                }else{
                    document.getElementById("textopageopcion" + (i+1)).setAttribute('href', location.pathname.substring(0, location.pathname.lastIndexOf('/') + 1) +(numPagina - (2-i))+".html");
                    if(i == 1){
                        document.getElementById("pageopcioni").setAttribute('href',location.pathname.substring(0, location.pathname.lastIndexOf('/') + 1) +(numPagina - (2-i))+".html");
                        document.getElementById("pageopcioni").style.display = "list-item";
                    }
                }
                if(i == 2){
                    document.getElementById("pageopcion" + (i+1)).className += " active";
                }
                if(i == 3){
                    document.getElementById("pageopciond").setAttribute('href',location.pathname.substring(0, location.pathname.lastIndexOf('/') + 1) +(numPagina - (2-i))+".html");
                    document.getElementById("pageopciond").style.display = "list-item";
                }
            }
        }
    }


})


/* EVENTO QUE SE LLAMA AL HACER CLICK EN UN JUEGO */
function irAJuego(idjuego) {
    window.location.href = location.pathname.substring(0,location.pathname.substring(0 ,(location.pathname.substring(0, location.pathname.lastIndexOf('/'))).lastIndexOf('/')).lastIndexOf('/')+1) + "juego.html?name=" + document.getElementById("textojuegocontenido" + idjuego).textContent;
}

/* EVENTO QUE SE LLAMA AL HACER CLICK EN BUSCAR JUEGO */
function buscar() {
    window.location.href = location.pathname.substring(0,location.pathname.substring(0 ,(location.pathname.substring(0, location.pathname.lastIndexOf('/'))).lastIndexOf('/')).lastIndexOf('/')+1) + "buscar.html?tag=" + document.getElementById("textoBuscarJuego").value;
    document.getElementById("textoBuscarJuego").value = "";
}