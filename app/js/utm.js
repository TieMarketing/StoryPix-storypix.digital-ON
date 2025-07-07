(function () {
  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function getUtmifyParams() {
    var params = {};
    var allowedExtras = ["gclid", "gad_source", "click_id"];
    var query = window.location.search.substring(1);
    if (query) {
      var pairs = query.split("&");
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split("=");
        var key = decodeURIComponent(pair[0]);
        var value = decodeURIComponent(pair[1] || "");
        if (key.indexOf("utm_") === 0 || allowedExtras.indexOf(key) > -1) {
          params[key] = value;
        }
      }
    }
    return params;
  }

  var utmifyParams = getUtmifyParams();
  if (Object.keys(utmifyParams).length > 0) {
    setCookie("utmify_params", JSON.stringify(utmifyParams), 30);
  }

  function ensureURLHasParams() {
    var cookieValue = getCookie("utmify_params");
    if (!cookieValue) return;
    var params = JSON.parse(cookieValue);
    var currentSearch = window.location.search;
    var needAppend = false;
    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        if (currentSearch.indexOf(key + "=") === -1) {
          needAppend = true;
          break;
        }
      }
    }
    if (needAppend) {
      var paramString = Object.keys(params)
        .map(function (key) {
          return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
        })
        .join("&");
      var newURL;
      if (window.location.search) {
        newURL = window.location.href + "&" + paramString;
      } else {
        newURL = window.location.href + "?" + paramString;
      }
      window.history.replaceState({}, "", newURL);
    }
  }

  function appendUtmifyParamsToLinks() {
    var cookieValue = getCookie("utmify_params");
    if (!cookieValue) return;
    var params = JSON.parse(cookieValue);
    var paramString = Object.keys(params)
      .map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
      })
      .join("&");

    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      var href = link.getAttribute("href");
      if (href && href.indexOf("#") !== 0) {
        if (
          href.indexOf("utm_") === -1 &&
          href.indexOf("gclid=") === -1 &&
          href.indexOf("gad_source=") === -1
        ) {
          if (href.indexOf("?") > -1) {
            link.setAttribute("href", href + "&" + paramString);
          } else {
            link.setAttribute("href", href + "?" + paramString);
          }
        }
      }
    }
  }

  window.addEventListener("DOMContentLoaded", function () {
    ensureURLHasParams();
    appendUtmifyParamsToLinks();
  });
})();