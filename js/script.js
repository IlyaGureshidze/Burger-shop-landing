$(document).ready(function() {
    $('.team__item').click(function() {
        //$('.team__item').removeClass('team__item_active');
       if(!$(this).hasClass('team__item_active')) {                                    $(this).addClass('team__item_active').siblings().removeClass('team__item_active');
        }
        else {
            $(this).removeClass('team__item_active');
        }
    });
    $('.menu-list__item').click(function() {
        if(!$(this).hasClass('menu-list__item_active')) {
          $(this).addClass('menu-list__item_active').siblings().removeClass('menu-list__item_active');
        }
        else {
            $(this).removeClass('menu-list__item_active');
        }
    });
    $('.fullscreen-menu__close').click(function(){
        $('.fullscreen-menu').fadeOut(300);
    });
    $('.hamburger').click(function(){
        $('.fullscreen-menu').fadeIn(300);
    });
    
    /*---- Слайдер ----*/
    $(".owl-carousel").owlCarousel({
        loop: $('.slider_container').size > 1? true: false,
        items: 1,
        dots: false,
        nav: $('.slider_container').size > 1? true: false
    });
    
    /*---One Page Scroll---*/
    
$(function() {
    //Определим переменные для работы
    var sections = $('.section'),//коллекция всех секций лендинга
    frame = $('.maincontent'),//видимая секция лендинга
    inScroll = false;//флаг для контроля над инерцией манипуляторов
    
    //Определим, какой клиент у пользователя
    var md = new MobileDetect(window.navigator.userAgent),
    isMobile = md.mobile();
    
    //Функция для выполнения перехода к секции, номер которой указан в аргументе
      var performTransition = function (sectionEq) {
        if (!inScroll){
        inScroll = true;
            var position = (sectionEq * (-100)) + '%';
            frame.css({
              'transform': 'translateY(' + position + ')',
              '-webkit-transform': 'translateY(' + position + ')'
            })
            
            sections.eq(sectionEq).addClass('active')
              .siblings().removeClass('active');

            setTimeout(function () {
              inScroll = false;
             $('.nav-bar__item').eq(sectionEq).addClass('nav-bar__item_active')
                .siblings().removeClass('nav-bar__item_active');
            }, 800);
        }
      }
    
      // Определим окружение текущей секции
      var defineSections = function (sections) {
        var activeSection = sections.filter('.active');
        return {
          activeSection: activeSection,
          nextSection: activeSection.next(),
          prevSection: activeSection.prev()
        }
      }

    // Функция для автоматического перехода по лендингу, в зависимости от направления движения манипулятора
      var scrollToSection = function (direction) {
        var section = defineSections(sections);
        if (direction == 'up' && section.nextSection.length) { // секции поднимаются вверх
          performTransition(section.nextSection.index());
        }

        if (direction == 'down' && section.prevSection.length) { //секции опускаются сверху
          performTransition(section.prevSection.index());
        }
      }
      //Ловим события Скролл мышью, нажатие клавиши на клавиатуре, свайп пальцем
       $('.wrapper').on({
            'wheel': function(e) {
                var deltaY = e.originalEvent.deltaY,
                direction = "";

                var direction = deltaY > 0 
                ? direction = 'up'
                : direction = 'down';
                scrollToSection(direction);
            },

            touchmove: function(e) {
                e.preventDefault();
            }
       });
        $(document).on('keydown', function (e) {
            var section = defineSections(sections);
            switch (e.keyCode) {
                case 38: // стрелка вверх
                    if (section.prevSection.length) {
                        performTransition(section.prevSection.index());
                    }
                    break;
                case 40: //стрелка вниз
                    if (section.nextSection.length) {
                        performTransition(section.nextSection.index());
                    }
                    break;
            }

        });
        if (isMobile) {
            $(window).swipe({
                swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
                    scrollToSection(direction);
                }
            });            
        }
    //Навешиваем переходы к нужным слайдам по клику,тачу на ссылки в меню и кнопки
        $('[data-target]').on('click', function (e) {
            e.preventDefault();
            var item = $(this),
            itemEq = item.data('target');
            $('.fullscreen-menu').fadeOut(300);
            performTransition(itemEq);   
        });
        $('.about__arrow').on('click', function(e) {
            e.preventDefault();
            performTransition(1);
        });
        $('.order-link').on('click', function(e) {
            e.preventDefault();
            performTransition(6);  
        });
    });   
    /* ------- Интерактивная карта Питера --------*/
    $(function(){

        ymaps.ready(init);
        var myMap;

        function init(){     
            myMap = new ymaps.Map("map", {
                center: [59.92606548, 30.32610869],
                zoom: 12
            });

            myPlacemark = new ymaps.Placemark([59.940700, 30.277555], {
                 hintContent: 'на Васильевском острове', 
                 balloonContent: '9 линия Васильевского отсрова, 30'
            }, {
                iconLayout: 'default#image',
                iconImageHref: 'img/icons/map-marker.svg',
                iconImageSize: [46, 57],
                iconImageOffset: [-15, -50]
            });

            myPlacemark2 = new ymaps.Placemark([59.936246, 30.321114], {
                 hintContent: 'на Невском', 
                 balloonContent: 'Невский проспект, 20'
            }, {
                iconLayout: 'default#image',
                iconImageHref: 'img/icons/map-marker.svg',
                iconImageSize: [46, 57],
                iconImageOffset: [-15, -50]
            });

            myPlacemark3 = new ymaps.Placemark([59.925723, 30.315913], {
                 hintContent: 'на Садовой', 
                 balloonContent: 'Московский проспект, 103к2'
            }, {
                iconLayout: 'default#image',
                iconImageHref: 'img/icons/map-marker.svg',
                iconImageSize: [46, 57],
                iconImageOffset: [-15, -50]
            });

            myMap.geoObjects
            .add(myPlacemark)
            .add(myPlacemark2)
            .add(myPlacemark3);

            myMap.behaviors
            .disable('scrollZoom')
            .disable('drag')
            

        }

    });
    /*--------Обработка формы заказа---------*/
    var submitForm = function (ev) {
    ev.preventDefault();

    var form = $('#orderForm');
        
    var request = ajaxForm(form);

    request.done(function(msg) {
        var mes = msg.message,
            status = msg.status;
        if (status === 'OK') {
            $('.modal__text').html('');
            $('.modal__text').text(mes).wrap('<p class="success"></p>');
            $('.modal').show();
        } else{
            $('.modal__text').html('');
            $('.modal__text').text(mes).wrap('<p class="error"></p>');
            $('.modal').show();
        }
    });

    request.fail(function(jqXHR, textStatus) {
        alert("Ошибка запроса: " + textStatus);
    });
}

var ajaxForm = function (form) {

    var url = form.attr('action'),
        data = form.serialize();

    return $.ajax({
        type: 'POST',
        url: url,
        data: data,
        dataType: 'JSON'
    });

}
$('#orderForm .order-link').on('click', submitForm);
$('.modal__button').click(function(){
    $(this).closest('.modal').hide();
    $('#orderForm .form__reset').trigger('click');
});
});