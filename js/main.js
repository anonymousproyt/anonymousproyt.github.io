'use strict'

window.addEventListener('load', () => {

    /* BARRA SUPERIOR */
    document.getElementById("irAInicio").setAttribute('href',location.pathname);





    /* CAROUSEL DESTACADOS */

    var percent = 0;
    var barraProgresoCarousel = document.querySelector("#barraProgresoCarousel");
    var crsl = $('#carouselDestacados');
    var mult = 1;

    function progressBarCarousel() {
        percent = percent + (mult/80);
        
        if(percent <= 50){
            mult = mult * 1.02;
        }else{
            mult = mult / 1.01956;
        }
        barraProgresoCarousel.style.width = percent + '%';
        if (percent>100) {
            mult = 1;
            percent=0;
            crsl.carousel('next');
        }      
    }
    crsl.carousel({
        interval: false,
        pause: true
    }).on('slid.bs.carousel', function () {});
    var barInterval = setInterval(progressBarCarousel, 15);
    crsl.hover(
        function(){
            crsl.css("cursor","pointer");
            clearInterval(barInterval);
        },
        function(){
            barInterval = setInterval(progressBarCarousel, 15);
    })
    $("#carouselAnterior").click(function() {
        percent=0;
        mult = 1;
        barraProgresoCarousel.style.width = percent + '%';
        crsl.carousel('prev');
    });
    $("#carouselSiguiente").click(function() {
        percent=0;
        mult = 1;
        barraProgresoCarousel.style.width = percent + '%';
        crsl.carousel('next');
    });



    /* FIN CAROUSEL DESTACADOS */





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
        cargarDestacados(myObj);
        poblarMenu(myObj);
        cargarPaginacion(myObj);
    }


    /* CARGAR MENU DESTACADOS */
    function cargarDestacados(jsonObj) {
        var contador = 0;
        for(var i = (jsonObj.juegos.length - 1);(i >= 0) && (contador < 3);i--){
            if(jsonObj.juegos[i].destacado == "si"){
                document.getElementById("juegoDestacado" + (contador+1)).src = jsonObj.juegos[i].imagenes[0];
                contador++;
            }
        }
    }

    /* LLENA LOS JUEGOS DEL MENU PRINCIPAL CON LOS JUEGOS QUE ESTAN EN LA BASE DE DATOS JSON */
    function poblarMenu(jsonObj){
        for(var i = 0; (i < 16) && (i < jsonObj.juegos.length) ; i++){
            document.getElementById("juegocontenido" + (i+1)).style.display = "inline-block";
            document.getElementById("imagenjuegocontenido" + (i+1)).src = jsonObj.juegos[(jsonObj.juegos.length - 1) - i].imagentapa;
            document.getElementById("textojuegocontenido" + (i+1)).textContent = jsonObj.juegos[(jsonObj.juegos.length - 1) - i].nombre;
        }
        
    }

    function cargarPaginacion(jsonObj) { 
        for(var i = 0; (i < ((Math.floor(jsonObj.juegos.length / 16)) + 1)) && (i < 5); i++){
            document.getElementById("pageopcion" + (i+1)).style.display = "list-item";
            document.getElementById("textopageopcion" + (i+1)).textContent = (i+1);
            document.getElementById("textopageopcion" + (i+1)).setAttribute('href', location.pathname.substring(0, location.pathname.lastIndexOf('/') + 1) +'subidos/'+(i+1)+".html");
            if(i == 1){
                document.getElementById("pageopciond").setAttribute('href', location.pathname.substring(0, location.pathname.lastIndexOf('/') + 1) +'subidos/'+(i+1)+".html");
            }
            if(i == 0){
                document.getElementById("textopageopcion" + (i+1)).setAttribute('href',location.pathname);
                document.getElementById("pageopciond").setAttribute('href',location.pathname);
            }
        }
        document.getElementById("pageopcioni").setAttribute('href',location.pathname);

    }


})


/* EVENTO QUE SE LLAMA AL HACER CLICK */
function irAJuego(idjuego) {
    window.location.href = "juego.html?name=" + document.getElementById("textojuegocontenido" + idjuego).textContent;
}