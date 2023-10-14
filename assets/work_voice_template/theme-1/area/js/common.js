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


$(window).on("load", function() {

  // トグルナビゲーション
  // $(".menuicon-btn").on("click", function() {
  //   if ($(".global-nav ul").is(":hidden")) {
  //     $(this).addClass("active").parents("#header").find(".global-nav ul").stop(true).hide(0).removeClass("pc-only").stop(true).slideDown(500);
  //   } else {
  //     $(this).removeClass("active").parents("#header").find(".global-nav ul").stop(true).slideUp(500, function () {
  //       $(this).addClass("pc-only").css("display", "");
  //     });
  //   }
  // });

  // haeder background color
  $(function() {
    var target    = $("#lay-container").parents("body").find("#lay-header"),
        self      = $("#lay-container"),
        offsetTop = self.offset().top;
    var headBackground = function() {
      if ($(window).scrollTop() > offsetTop) {
        target.addClass("js-is-scroll");
        target.removeClass("js-scroll-offset");
      } else {
        target.removeClass("js-is-scroll");
        target.addClass("js-scroll-offset");
      }
    }
    $(window).scroll(headBackground).trigger("scroll");
    $("body").bind("touchmove", headBackground);
  });

  // side nav
  $(function() {
    $(".js-toggle-nav-triger").on("click", function() {
      var self    = $(this).parents("body").find(".lay-global-nav"),
          button  = $(".js-toggle-nav-triger"),
          overlay = $(".js-overlay"),
          speed   = 250;

      if ($(".js-toggle-nav-triger.js-closed").length) {
        button.removeClass("js-closed");
        button.addClass("js-opened");
        self.stop(true).animate({
          left : "0",
        },speed);
        overlay.stop(true).fadeIn(speed);
        button.parents("body").find(".lay-menuicon-btn-wrap").addClass("js-slide-action");
      } else {
        button.removeClass("js-opened");
        button.addClass("js-closed");
        self.stop(true).animate({
          left : "-500px",
        },speed);
        overlay.fadeOut(speed);
        overlay.on("click", function() {
          overlay.stop(true).fadeOut();
          self.stop(true).animate({
            left : "-500px",
          },speed);
          button.removeClass("js-opened");
          button.addClass("js-closed");
        });
      }
      overlay.on("click", function() {
        overlay.stop(true).fadeOut();
        self.stop(true).animate({
          left : "-500px",
        },speed);
        button.removeClass("js-opened");
        button.addClass("js-closed");
      });
      $(".lay-menuicon-btn-closed, .js-overlay").on("click", function() {
        overlay.stop(true).fadeOut();
        self.stop(true).animate({
          left : "-500px",
        },speed);
        button.removeClass("js-opened");
        button.addClass("js-closed");
        button.parents("body").find(".lay-menuicon-btn-wrap").removeClass("js-slide-action");
      });
    });
  });

  // container action
  $(function(){
    var state = false,
        scrollpos;
    $(".js-toggle-nav-triger, .lay-menuicon-btn-closed, .js-overlay").on("click", function() {
      if(state == false) {
        scrollpos = $(window).scrollTop();
        $("#lay-container").addClass("js-main-is-fixed").css({"top": -scrollpos});
        state = true;
      } else {
        $("#lay-container").removeClass("js-main-is-fixed").css({"top": 0});
        window.scrollTo( 0 , scrollpos );
        state = false;
      }
    });
  });

  // side nav inner action
  $(".js-toggle-nav-triger").on("click", function() {
    var selfItem = $(".lay-global-nav .lay-main-nav-wrap li"),
        selfTitle = $(".lay-global-nav .lay-main-nav-title"),
        selfSideTitle = $(".lay-global-nav .lay-nav-title");

    // list item
    selfItem.css({
      "opacity" : 0,
      "left"    : "-40px"
    });
    selfItem.each(function(i) {
      $(this).delay(30 * i).animate({
        "opacity" : 1,
        "left"    : 0
      });
    });
    // title
    selfTitle.css({
      "opacity" : 0,
      "left"    : "-30px"
    });
    selfTitle.each(function(i) {
      $(this).delay(20 * i).animate({
        "opacity" : 1,
        "left"    : 0
      });
    });
    // side title
    selfSideTitle.css({
      "opacity" : 0,
      "left"    : "-50px"
    });
    selfSideTitle.each(function(i) {
      $(this).delay(10 * i).animate({
        "opacity" : 1,
        "left"    : 0
      });
    });
  });

  // loading
  $(".com-item-wrap").each(function(i) {
    $(this).delay(200 * i).animate({
      "opacity": 1
    });
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
    $(".js-slick-slider-picup").slick({
      dots     : true,
      arrows   : false,
      infinite : true,
      speed    : 500,
      fade     : false,
      cssEase  : "linear",
      autoplay : true
    });
    $(".js-section-detail-img-slider").slick({
      dots     : true,
      arrows   : true,
      infinite : true,
      speed    : 500,
      fade     : false,
      cssEase  : "linear",
      autoplay : true
    });
  }
  setTimeout(function() {
    $(".section-pickup, .js-section-detail-img-slider").stop(true).animate({
      "opacity" : 1
    });
  },50);


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

  //スクロールバー
  if ( !! $.fn.mCustomScrollbar){
    $(".js-scroll-box").mCustomScrollbar({
      mouseWheelPixels: 200,
      scrollButtons:{
        enable: true,
        scrollType: "continuous",
        scrollSpeed: 100,
        scrollAmount: 100
      },
      advanced: {
        updateOnContentResize: true,
        autoScrollOnFocus: true
      },
      callbacks:{
        onScroll: function(){
          $(window).resize();
        }
      },
      theme: "dark-3"
    });
  }

  // スムーススクロール
  $("a[href^=#]").not("[href^=#tab-]").click(function() {
    var speed = 500;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);
    if (target.length > 0) {
      var position = target.offset().top;
      $("body,html").animate({scrollTop:position}, speed);
      return false;
    }
  });
  $(document).ready(function() {
    $(".lay-page-top").hide();
    $(".side-contact-btn").hide();
    $(window).on("scroll", function() {
      if ($(this).scrollTop() > 200) {
        $(".lay-page-top, .side-contact-btn").fadeIn("fast");
      } else {
        $(".lay-page-top, .side-contact-btn").fadeOut("fast");
      }
      // footer 固定の場合
      // scrollHeight = $(document).height();
      // scrollPosition = $(window).height() + $(window).scrollTop();
      // footHeight = $("footer").innerHeight();
      // if (scrollHeight - scrollPosition <= footHeight) {
      //   $(".page-top").css({
      //     "position": "absolute",
      //     "bottom"  : "20px"
      //   });
      // } else {
      //   $(".page-top").css({
      //     "position": "fixed",
      //     "bottom"  : "20px"
      //   });
      // }
    });
    $(".lay-page-top").click(function() {
      $("body,html").animate({
        scrollTop: 0
      }, 400);
      return false;
    });
  });

  // 高さ揃え
  if ( !! $.fn.matchHeight){
    $(".js-lineup > *").matchHeight();
  }

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
