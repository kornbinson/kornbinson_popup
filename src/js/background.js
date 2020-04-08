var STRINGS = {
  a: '/watch?v=',
  b: '",',
  c: '"simpleText":"',
  d: '"}',
  e: 'https://www.youtube.com/embed/',
  img: '<img src="https://i.ytimg.com/vi/',
  fin_img: '">'
}

var url = "https://www.youtube.com/channel/UC55-mxUj5Nj3niXFReG44OQ/videos";
var videoLink = 'ERROR NAME';
var videoTitle = 'Nuevo Video';
var linkCompleto = 'ERROR LINK COMPLETO';
var pathIMG = 'ERROR IMG';
var sonido = true;

function busquedaIMG(response) {
  var index1, index2, rutaIMG;
  index1 = response.indexOf(STRINGS.img) + STRINGS.img.length;
  index2 = response.indexOf(STRINGS.fin_img, index1);
  rutaIMG = response.substring(index2, index1);
  pathIMG = STRINGS.img.concat(rutaIMG, STRINGS.fin_img);
  // console.log(pathIMG);
}

function busquedaTitle(response) {
  var index1, index2, videoTitleString;
  index1 = response.indexOf(STRINGS.c) + STRINGS.c.length;
  index2 = response.indexOf(STRINGS.d, index1);
  videoTitleString = response.substring(index2, index1);
  videoTitle = videoTitleString;
  // console.log(videoTitle);
}

function busquedaLink(response) {
  var index1, index2,videoNameString;
  index1 = response.indexOf(STRINGS.a) + STRINGS.a.length;
  index2 = response.indexOf(STRINGS.b, index1);
  videoNameString = response.substring(index2, index1);
  videoLink = videoNameString;
  linkCompleto = STRINGS.e + videoLink;
  if (!localStorage.lastVideo) {
    localStorage.lastVideo = linkCompleto;
  } else {
    if (linkCompleto != localStorage.lastVideo) {      
      notify(linkCompleto, videoTitle);
      localStorage.lastVideo = linkCompleto;
    }
  }
}

function notify(linkCompleto, videoTitle) {  
  if (Notification) {    
    sonidoNotify(sonido);
    if (Notification.permission !== "granted") {
      Notification.requestPermission()
    }
    var title = "NUEVO VIDEO !";
    var extra = {
      icon: "icon48.png",
      body: videoTitle
    }
    var noti = new Notification(title,extra);
    noti.onclick = function () {
      window.open(linkCompleto, "popup", "width=640,height=360");
    }
    setTimeout(function () { noti.close() }, 10000);
  }
}

function sonidoNotify(sound) {
  let context = null;
  if(sound){
    const beep = (freq = 550, duration = 100, vol = 100) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.connect(gain);
      oscillator.frequency.value = freq;
      oscillator.type = "sine";
      gain.connect(context.destination);
      gain.gain.value = vol * 0.001;
      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + duration * 0.003);
    }
    context = new AudioContext();
    beep();
  }  
}

function check() {
  if (localStorage.youtubechannel) url = localStorage.youtubechannel;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      busquedaTitle(xmlhttp.responseText)
      busquedaLink(xmlhttp.responseText);
      busquedaIMG(xmlhttp.responseText);
    }
  }
  xmlhttp.open("GET", url, true);
  xmlhttp.send(null);
  interval = setTimeout(check, 2000);
  // console.log(' funcion check ');
}

check();
