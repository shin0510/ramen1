document.write();

  var _UA = navigator.userAgent;
  if ((_UA.indexOf('Android') > 0 && _UA.indexOf('Mobile') > 0)) {
    document.write('<meta name="viewport" content="width=device-width,user-scalable=yes,maximum-scale=1">');
  } else if ((_UA.indexOf('Android') > 0 && _UA.indexOf('Mobile') == -1)) {
    $("body").addClass("is-tablet");
  } else if (_UA.indexOf('iPhone') > 0) {
    document.write('<meta name="viewport" content="width=device-width,user-scalable=yes,maximum-scale=1">');
  } else if (_UA.indexOf('iPad') > 0) {
    $("body").addClass("is-tablet");
  } else if (_UA.indexOf('iPod') > 0) {
    document.write('<meta name="viewport" content="width=device-width,user-scalable=yes,maximum-scale=1">');
  } else {
    document.write('<meta name="viewport" content="width=1300">');
  }
