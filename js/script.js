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
});