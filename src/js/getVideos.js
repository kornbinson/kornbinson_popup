var bg = chrome.extension.getBackgroundPage();
var bgUrl = bg.linkCompleto;
var bgName = bg.videoTitle;
// var video = videoLoader(bgUrl);
var bgIMG = bg.pathIMG;
var docu = videoLoader(bgIMG,bgName);

function videoLoader(bgIMG,bgName) {        
    document.write(bgIMG);
    document.write('<h2>'+bgName+'</h2>');
    setTimeout(function(){ varias() }, 5000);
}

$(function () {
    $(".link").click(function (e) {
        e.preventDefault();
        window.open(bgUrl, "popup", "width=640,height=360");
    });

    $(".settings").click(function (e) {
        e.preventDefault();
        window.open("src/settings.html", "popup", "width=640,height=360");
    });
});//fin de funcion

function varias() {
    eliminarCookies();
    cerrarVentana();
}

function cerrarVentana() {
    window.close();
}

function eliminarCookies() {

    chrome.cookies.getAll({ domain: ".youtube.com" }, function (cookies) {
        for (var i = 0; i < cookies.length; i++) {
            console.log(cookies[i]);
            chrome.cookies.remove({ url: "http://www.youtube.com" + cookies[i].domain + cookies[i].path, name: cookies[i].name });
        }
    });
}

function fijarCookie() {
    chrome.cookies.set({
        "sameSite": "no_restriction",
        "url": "http://youtube.com",
        "secure": true
        // "korn":"edinson"
    }, function (cookie) {
        console.log(JSON.stringify(cookie));
        console.log(chrome.extension.lastError);
        console.log(chrome.runtime.lastError);
    });

}

function otrasCookies() {

    chrome.cookies.set({
        "url": "https://www.youtube.com",
        "domain": "youtube.com",
        "httpOnly": true,
        "name": "user",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "storeId": "IDE",
        "value": "DESDE_DUO12"
    }, function (cookie) {
        console.log(JSON.stringify(cookie));
        console.log(chrome.extension.lastError);
        console.log(chrome.runtime.lastError);
    });

}

function sameSiteCookieMaker() {
    chrome.cookies.get({
        "url": "http://youtube.com",
        "name": "ASP.NET_SessionId"
    }, function (cookie) {
        // state = cookie.value
        var state = "U7WtN_qFDu0";
        chrome.cookies.remove({
            "url": "http://youtube.com",
            "name": "ASP.NET_SessionId"
        }, function (cookie2) {
            chrome.cookies.set({
                "url": "http://youtube.com",
                "domain": "youtube.com",
                "httpOnly": true,
                "name": "ASP.NET_SessionId",
                "path": "/",
                "sameSite": "no_restriction",
                "secure": true,
                "storeId": "YSC",
                "value": state
            })
        })
    })
}

var ID;

function getCookies(domain, name) {
    chrome.cookies.get({ "url": domain, "name": name }, function (cookie) {
        ID = cookie.value;
    });

    // alert(ID);
    // console.log(cookie.value);
}


function getCookies(domain, name, callback) {
    chrome.cookies.get({ "url": domain, "name": name }, function (cookie) {
        if (callback) {
            callback(cookie.value);
        }
    });
}

function a(){

    chrome.cookies.getAll({
        domain: "youtube.com"
      }, function (cookies) {
        for (var i = 0; i < cookies.length; i++) {
          console.log(cookies[i] + "deleted");
          chrome.cookies.remove({
            url: "http://youtube.com" + cookies[i].domain + cookies[i].path,
            name: cookies[i].name
          });
        }
      });

}
