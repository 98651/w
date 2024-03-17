$(document).ready(function(){
    $('.fa-bars').click(function(){
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('load scroll',function(){
        $('.fa-bars').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if($(window).scrollTop()>35)
        {
            $('.header').css({'background':'#ffffff','box-shadow':'0 .2rem .5rem rgba(gry)'});
        }
        else
        {
            $('.header').css({'background':'#ffffff','box-shadow':'0 .2rem .5rem rgba(gry)'});
        }
    });

    const counters = document.querySelectorAll('.counter');
    const speed = 120;
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;
            if (count < target) {
                counter.innerText = count + inc;
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });


    $(function () {
        const slider = document.getElementsByClassName("slider").item(0);

        let isDrag = false,
            startPos = 0,
            curIndex = 0,
            curTranslate = 0,
            preTranslate = 0,
            animationId = null;

        $(".slider-item").on("mousedown mousemove mouseup mouseleave", (e) => {
            e.preventDefault();
        });

        slider.onmousedown = startSlide;
        slider.ontouchstart = startSlide;
        slider.onmousemove = moveSlide;
        slider.ontouchmove = moveSlide;
        slider.onmouseup = endSlide;
        slider.onmouseleave = endSlide;
        slider.ontouchend = endSlide;

        function getPositionX(event) {
            return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
        }
        function animation() {
            if (isDrag) requestAnimationFrame(animation);
            setSliderPosition();
        }
        function startSlide(event) {
            startPos = getPositionX(event);
            isDrag = true;
            animationId = requestAnimationFrame(animation);
            $(".slider").removeClass("animation").css("cursor", "grabbing");
        }
        function moveSlide() {
            if (isDrag) {
                const positionX = getPositionX(event);
                curTranslate = preTranslate + positionX - startPos;
            }
        }
        function endSlide() {
            isDrag = false;
            cancelAnimationFrame(animation);
            const Moved = curTranslate - preTranslate;
            if (Moved < -100 && curIndex < $(".slider-item").length - 1 - 2) curIndex++;
            if (Moved > 100 && curIndex > 0) curIndex--;
            setSliderPosition();
            $(".slider").addClass("animation").css("cursor", "grab");
        }
        function setPositionByIndex() {
            curTranslate = ($(".slider-item").width() + 40) * curIndex * -1;
            preTranslate = curTranslate;
            setSliderPosition();
        }
        function setSliderPosition() {
            $(".slider-container .slider").css(
                "transform",
                `translateX(${curTranslate}px)`
            );
        }
        $(".btn-right").click(() => {
            curIndex =
                ++curIndex < $(".slider-item").length - 1 - 2
                    ? curIndex
                    : $(".slider-item").length - 1 - 2;
            endSlide();
        });
        $(".btn-left").click(() => {
            curIndex = --curIndex > 0 ? curIndex : 0;
            endSlide();
        });
    });


    (function ($) {
        "use strict";

        $(".clients-carousel").owlCarousel({
            autoplay: true,
            dots: true,
            loop: true,
            responsive: { 0: {items: 2}, 768: {items: 4}, 900: {items: 6} }
        });

        $(".testimonials-carousel").owlCarousel({
            autoplay: true,
            dots: true,
            loop: true,
            responsive: { 0: {items: 1}, 576: {items: 2}, 768: {items: 3}, 992: {items: 4} }
        });

    })(jQuery);

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    $('.accordion-header').click(function(){
        $('.accordion .accordion-body').slideUp(500);
        $(this).next('.accordion-body').slideDown(500);
        $('.accordion .accordion-header span').text('+');
        $(this).children('span').text('-');
    });
});
