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

})