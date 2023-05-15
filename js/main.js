$(document).ready(function(){


    /* Slow Scroll */
    SmoothScroll({
        // Время скролла 400 = 0.4 секунды
        animationTime    : 700,
        // Размер шага в пикселях 
        stepSize         : 75,

        // Дополнительные настройки:
        
        // Ускорение 
        accelerationDelta : 20,  
        // Максимальное ускорение
        accelerationMax   : 2,   

        // Поддержка клавиатуры
        keyboardSupport   : true,  
        // Шаг скролла стрелками на клавиатуре в пикселях
        arrowScroll       : 70,

        // Pulse (less tweakable)
        // ratio of "tail" to "acceleration"
        pulseAlgorithm   : true,
        pulseScale       : 4,
        pulseNormalize   : 1,

        // Поддержка тачпада
        touchpadSupport   : true,
    })


    /* Offer Parallax */
    var scene = document.getElementById('parallax_scene');
    var parallax = new Parallax(scene);


    /* Menu Active Section */
    $(function() {
      /* Выделение активных пунктов меню */
      var last_id;
      var $top_menu = $('.side_bar__menu');
      var menu_height = $top_menu.outerHeight(true);
      var $menu_items = $top_menu.find('a');
      var $scroll_items = $menu_items.map(function() {
        var item = $($(this).attr('href'));
        if (item.length) {
          return item;
        }
      });

      $(window).scroll(function() {
        var from_top = $(this).scrollTop() + menu_height;
        var mar = parseInt($top_menu.css('margin-bottom'));
        var cur = $scroll_items.map(function() {
          if ($(this).offset().top < from_top + mar) {
            return this;
          }
        });
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : '';
        if (last_id !== id) {
          last_id = id;
          $menu_items.parent()
            .removeClass('side_bar__menu_active_link')
            .end()
            .filter("[href='#" + id + "']")
            .parent()
            .addClass('side_bar__menu_active_link');
        }
      });
    });


    /* Hamburger Menu */
    $(function() {
        $('.check').click(function(){
           $('.side_bar').toggleClass("active");
        });
        $("#menu").on("click","a", function(){
            if($(window).width() <= 1310) {
                $('.side_bar').toggleClass("active");
                $('[name^="menu"]').prop({'checked': false});
            }
        });
    });


    /* Smooth Scroll on click */
    $("#menu").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1200);
    });

    $("#offer").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1200);
    });


    /* Copy Server Ip */
    $(function() {
      function copyToClipboard(element) {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(element).text()).select();
        document.execCommand("copy");
        $temp.remove();
      }
     
      $(".header__server").on("click", function() {
        copyToClipboard("#server_ip");
        $(".header__server_ip_copy_alert").animate({opacity: 1},'slow');
        $(".header__server_ip_copy_alert").animate({opacity: 0},'slow');
      });
    });


    /* Side Bar Menu Logo */
    var target = $('.about__content_title');
    var targetPos = target.offset().top;
    var winHeight = $(window).height();
    var scrollToElem = targetPos - winHeight;
    $(window).scroll(function(){
      var winScrollTop = $(this).scrollTop();
      if(winScrollTop > scrollToElem){
        $(".side_bar__logo").css("transform", "translateX(0%)");
        $(".side_bar__logo").css("opacity", "1");
      }
      else {
       $(".side_bar__logo").css("transform", "translateX(-160%)");
       $(".side_bar__logo").css("opacity", "0");
      }
    });


    /* Server Online */
    var xhr = new XMLHttpRequest();
    var url = "https://api.minetools.eu/ping/mc.masedworld.net";
                  
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var jsonData = JSON.parse(xhr.responseText); 
            showOnline(jsonData);
        }
    };

    xhr.open("GET", url, true);
    xhr.send();

    function showOnline(data) {
        var output = "Онлайн: " + data.players.online + "/" + data.players.max; 
                  
        document.getElementById("server_online").innerHTML = output;
    }


    /* Bottom Alert */
    $(function () {
      $('.bottom_alert_button').click(function() {
        document.getElementById("bottom_alert").style.display = 'none';
      })
    })
    $(window).scroll(function() {
    if ($(this).scrollTop()>900) {
      document.getElementById("bottom_alert").style.bottom = '2%';
    }
    });


    /* FAQ Spoiler */
    $(document).ready(function(){
            $(".faq__content_question_spoiler .block").show();
            $(".close .block").hide();
            $(".faq__content_question_spoiler h2").click(function(){  
                $(this).toggleClass("icon").next().slideToggle(400);
        });         
    });


    /* Animations */
    function reveal() {
      var reveals = document.querySelectorAll(".reveal");

      for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 120;

        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active");
        } else {
          reveals[i].classList.remove("active");
        }
      }
    }

    window.addEventListener("scroll", reveal);


    /* Modal Window */
    var modal = document.getElementById('modal_window');
    var survival = document.getElementById('survival_modal_button');
    var economy = document.getElementById('economy_modal_button');
    var dungeons = document.getElementById('dungeons_modal_button');
    var battlepass = document.getElementById('events_modal_button');
    var agreement = document.getElementById('agreement_modal_button')
    var close = document.getElementsByClassName("close_modal")[0];
    const prevent = ev => ev.preventDefault();

    survival.onclick = function() {
        $(".funs__content_overlay_info_box h2").html("Выживание");
        $(".funs__content_overlay_info_box p").html("На нашем сервере вы можете отлично провести время на увлекательном выживании.<br><br> Оптимизированный игровой процесс, интересные игровые механики, никаких креативок, опок и прочего отребья, которое искажает изначальный смысл выживания");
        $('.funs__content_overlay').fadeIn();
        $(".funs__content_overlay_info").addClass("modal-show-animation");
    }

    economy.onclick = function() {
        $(".funs__content_overlay_info_box h2").html("Экономика");
        $(".funs__content_overlay_info_box p").html("Слаженная система экономики. Выполняйте квесты, торгуйтесь с игроками в магазине и на аукционе, зарабатывайте игровую валюту и коины.<br><br>Заработанное можно потратить на приобретение ресурсов, уникальных вещей и приятных возможностей");
        $('.funs__content_overlay').fadeIn();
        $(".funs__content_overlay_info").addClass("modal-show-animation");
    }

    dungeons.onclick = function() {
        $(".funs__content_overlay_info_box h2").html("Данжи");
        $(".funs__content_overlay_info_box p").html("Посещайте опасные данжи, изучайте местность, находите бочки с ценным лутом. Будьте осторожны! Здесь спавнятся мобы, а также разрешено PvP<br><br>Доступ к данжам открывается ежедневно в 20:00 по МСК. Следите за объявлениями на сервере");
        $('.funs__content_overlay').fadeIn();
        $(".funs__content_overlay_info").addClass("modal-show-animation");
    }

    battlepass.onclick = function() {
        $(".funs__content_overlay_info_box h2").html("Батл Пасс");
        $(".funs__content_overlay_info_box p").html("Выполняйте еженедельные и ежедневные квесты «BattlePass» и продвигайтесь по ступеням с полезными наградами!<br><br>Сезоны с квестами запускаются регулярно. Следите за сообществом сервера!");
        $('.funs__content_overlay').fadeIn();
        $(".funs__content_overlay_info").addClass("modal-show-animation");
    }

    agreement.onclick = function() {
        $(".funs__content_overlay_info_box h2").html("Соглашение");
        $(".funs__content_overlay_info_box p").html("Покупка доната является исключительно вашей инициативой. Возврат потраченных средств не предоставляется ни при каких условиях. Покупая донат вы автоматически подписываетесь под данным соглашением.<br><br>При грубом нарушении правил (многочисленные оскорбления, читы, гриферство и т.п.) донатер может лишиться своей привилегии без возможности вовзрата потраченных средств.");
        $('.funs__content_overlay').fadeIn();
        $(".funs__content_overlay_info").addClass("modal-show-animation");
    }

    close.onclick = function() {
        $('.funs__content_overlay').fadeOut('fast');
        $(".funs__content_overlay_info").removeClass("modal-show-animation");
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            $('.funs__content_overlay').fadeOut('fast');
            $(".funs__content_overlay_info").removeClass("modal-show-animation");
        }
    }


});