'use strict'

window.addEventListener('load', () => {


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
        poblarMenu(myObj);
        
    }

    /* LLENA LOS JUEGOS DEL MENU PRINCIPAL CON LOS JUEGOS QUE ESTAN EN LA BASE DE DATOS JSON */
    function poblarMenu(jsonObj){
        for(var i = 0; i < jsonObj.juegos.length; i++){
            var juego = document.getElementById("juegocontenido" + (i+1));
            juego.style.display = "inline-block";
            console.log(jsonObj.juegos[i]);
            document.getElementById("imagenjuegocontenido" + (i+1)).src=jsonObj.juegos[i].imagentapa;
        }
    }
    



})