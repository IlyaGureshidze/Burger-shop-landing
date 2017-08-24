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
   /* $(".slider").owlCarousel({
            loop: true,
            items: 1,
            dots: false,
            nav: true//$(this).find('.slider_container').size() > 1? true: false
            
    });*/
    
    /*---One Page Scroll---*/
    
$(function() {
    var sections = $('.section'),
    frame = $('.maincontent'),
    inScroll = false;
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

      var defineSections = function (sections) {
        var activeSection = sections.filter('.active');
        return {
          activeSection: activeSection,
          nextSection: activeSection.next(),
          prevSection: activeSection.prev()
        }
      }

      var scrollToSection = function (direction) {
        var section = defineSections(sections);
        if (direction == 'up' && section.nextSection.length) { // секции поднимаются вверх
          performTransition(section.nextSection.index());
        }

        if (direction == 'down' && section.prevSection.length) { //секции опускаются сверху
          performTransition(section.prevSection.index());
        }
      }
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
    
        $('[data-target]').on('click', function (e) {
            
            e.preventDefault();

            var item = $(this),
            itemEq = item.data('target');
            $('.fullscreen-menu').fadeOut(300);
            performTransition(itemEq);  
            
        });
        
        /* move to section */

        $('.about__arrow').on('click', function(e) {
            e.preventDefault();
            performTransition(1);
        });

        $('.order-link').on('click', function(e) {
            e.preventDefault();
            performTransition(6); /*Index starts counting from 0, eq from 1. First link is second screen*/ 

        });

        /*if (isMobile) {
            $(window).swipe({
                swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
                    scrollToSection(direction);
                }
            });            
        }*/
    });
    /* --- Map -----*/
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

    })
});