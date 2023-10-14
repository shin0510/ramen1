//UA取得
var ua = navigator.userAgent;
var isSP = ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0);
var isTab = ua.indexOf('iPad') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') === -1) || ua.indexOf('A1_07') > 0 || ua.indexOf('SC-01C') > 0;

$(function() {
  //SP否定
  if(!isSP) {
    $(".sp-link").on("click", function() {
      return false;
    });
  }
  //SP時
  if(isSP) {}
  //tablet時
  if(isTab) {}
});

// header fix
$(window).on('scroll', function() {
  var w = $(window).width();
  var x = 811;
  if(w >= x) { //811pxより大きい場合のみ
    if($(this).scrollTop() > 500) {
      $('#header').addClass('header-fixed').find('.header__content__upper').slideUp(300);
    } else {
      $('#header').removeClass('header-fixed').find('.header__content__upper').slideDown(300);
    }
  }
});


$(window).on("load", function() {

  //背景固定
  var state = false;
  var scrollpos;
  $('.menuicon-btn').on('click', function(){
    if(state == false) {
      scrollpos = $(window).scrollTop();
      $('body').addClass('fixed').css({'top': -scrollpos});
      state = true;
    } else {
      $('body').removeClass('fixed').css({'top': 0});
      window.scrollTo( 0 , scrollpos );
      state = false;
    }
  });

  // header language dd
  $(".header__lang__trigger").on("click", function() {
    $(".header__content__lang ul").toggleClass("active")
  });

  // footer language dd
  $(".footer__lang__trigger").on("click", function() {
    $(".footer__content__lang").toggleClass("active")
  });

  // current
  $('.header__nav li a').each(function(){
    var $href = $(this).attr('href');
    if(location.href.match($href)) {
      $(this).parent('li').addClass('current');
    } else {
      $(this).parent('li').removeClass('current');
    }
  });

  // トグルナビゲーション
  $(".menuicon-btn").on("click", function() {
    if ($(".header__fixednav").is(":hidden")) {
      $(this).addClass("active").parents("#header").find(".header__fixednav").stop(true).hide(0).removeClass("pc-only").stop(true).slideDown(300);
    } else {
      $(this).removeClass("active").parents("#header").find(".header__fixednav").stop(true).slideUp(300, function () {
        $(this).addClass("pc-only").css("display", "");
      });
    }
  });

  // アコーディオン
  $(".accordion").each(function() {
    var self = $(this);
    self.on("click",function(){
      if (self.next(".accordion-target").is(":hidden")) {
        self.addClass("active").next().stop(true).slideDown(250);
      } else {
        self.removeClass("active").next().stop(true).slideUp(250);
      }
    });
    $(".accordion-close-btn").on("click", function() {
      $(this).parents(".accordion-list li").find(".active").removeClass("active").next().stop(true).slideUp(250);
    });
  });

  // スムーススクロール
  $("a[href^='#']").not("[href^='#tab-'],[href^='#inline-']").on("click", function() {
    var speed = 500;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);
    if (target.length > 0) {
      var position = target.offset().top;
      $("body,html").animate({scrollTop:position}, speed);
      return false;
    }
  });

  //slick スライダー
  if ( !! $.fn.slick){
    var w = $(window).width();
    var x = 415;
    if(w <= x) {
      $(".sp-slider").slick({
        dots    : true,
        infinite: true,
        speed   : 500,
        fade    : false,
        cssEase : "linear",
        autoplay: true
      });
    }
  }

  //colorbox ポップアップ
  if ( !! $.fn.colorbox){
    //画像一枚
    $(".js-popup-box").colorbox({
      maxWidth   : "90%",
      maxHeight  : "90%",
      transition : "fade",
      returnFocus: true,
      close      : "close",
      opacity    : 0.7,
      onComplete: function() {
        $("#cboxClose").css({
          "opacity": 1
        });
      },
      onClosed: function() {
        $("#cboxClose").css({
          "opacity": 0
        });
      }
    });
    //スライダー付
    $(".js-popup-box-slider").colorbox({
      rel           : "slideshow",
      slideshow     : false,
      slideshowSpeed: 3000,
      maxWidth      : "90%",
      maxHeight     : "90%",
      transition    : "fade",
      returnFocus   : true,
      close         : "close",
      opacity       : 0.7,
      onComplete: function() {
        $("#cboxClose").css({
          "opacity": 1
        });
      },
      onClosed: function() {
        $("#cboxClose").css({
          "opacity": 0
        });
      }
    });
    //インライン
    $(".js-popup-box-inline").colorbox({
      inline     : true,
      maxWidth   : "90%",
      maxHeight  : "90%",
      transition : "fade",
      returnFocus: true,
      close      : "close",
      opacity    : 0.7,
      onComplete: function() {
        $("#cboxClose").css({
          "opacity": 1
        });
      },
      onClosed: function() {
        $("#cboxClose").css({
          "opacity": 0
        });
      }
    });
    $(".js-popup-cancel").on("click" ,function(){
      parent.$.fn.colorbox.close();
      return false;
    });
  }

  // 高さ揃え
  if ( !! $.fn.matchHeight){
    $(".js-lineup > *").matchHeight();
  }


  //page-top 固定
  $(document).ready(function() {
    $(".page-top-wrap").hide();
    var w = $(window).width();
    var x = 811;
    $(window).on("scroll", function() {
      if ($(this).scrollTop() > 100) {
        $(".page-top-wrap").fadeIn("fast");
      } else {
        $(".page-top-wrap").fadeOut("fast");
      }
      scrollHeight = $(document).height();
      scrollPosition = $(window).height() + $(window).scrollTop();
      footHeight = $("footer").innerHeight();
      if (scrollHeight - scrollPosition <= 50) {
        $(".page-top-wrap").css({
          "position": "absolute",
          "bottom": 90
        });
      } else {
        if(w >= x) { //811pxより大きい場合のみ
          $(".page-top-wrap").css({
            "position": "fixed",
            "bottom": "40px"
          });
        } else {
          $(".page-top-wrap").css({
            "position": "fixed",
            "bottom": "20px"
          });
        }
      }
    });
    $('.page-top').click(function() {
      $('body,html').animate({
        scrollTop: 0
      }, 400);
      return false;
    });
  });


});// load function


// タブ切り替え
;(function($) {
  var urlParam = location.search.substring(1);
  if (urlParam) {
    var param = urlParam.split("&");
    var paramArray = [];
    for (i = 0; i < param.length; i++) {
      var paramItem = param[i].split("=");
      paramArray[paramItem[0]] = paramItem[1];
    }
  }
  var urlHash = location.hash;
  $(window).load(function() {
    if (urlParam) {
      var targetTabParam = $('.mod-tab-nav li a[href$="#' + paramArray.id + '"]');
      if(targetTabParam.length > 0) {
        $(".mod-tab-nav li a").removeClass("active");
        targetTabParam.addClass("active");
      }
    }
    if (urlHash) {
      var targetTabHash = $('.mod-tab-nav li a[href$="' + urlHash + '"]');
      if (targetTabHash.length > 0) {
        $(".mod-tab-nav li a").removeClass("active");
        targetTabHash.addClass("active");
      }
    }
    // タブ切り替えを実行
    $('.mod-tab-detail > *:not('+$('.mod-tab-nav li a.active').attr('href')+')').hide();
    $(".mod-tab-nav li a").on("click", function() {
      $(".mod-tab-nav li a").removeClass("active");
      $(this).addClass("active");
      $(".mod-tab-detail > *").hide();
      $($(this).attr("href")).fadeIn();
      return false;
    });
  });
})(jQuery);

// Android style
$(function () {
  if (navigator.userAgent.indexOf("Android") > 0) {
    $("html").addClass("android");
  }
});

// display:none or display:block
$(function() {
  $("body").find(".no-js").removeClass("no-js");
});
