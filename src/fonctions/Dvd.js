 let box = document.getElementById('dvd');
 let imageUrls = [
    'img/Home/chacho.jpg',
    'img/Home/etg.jpg',
    'img/Home/fabio.jpg',
    'img/Home/gav.jpg',
    'img/Home/global.jpg',
    'img/Home/hir.jpg',
    'img/Home/hir2.jpg',
    'img/Home/LHC.jpg',
    'img/Home/slav1.jpg',
    'img/Home/slav2.jpg',
    'img/Home/sphere.jpg',
    'img/Home/timer.jpg',
    'img/Home/wejdance.jpg',
  ];

let  currentColor = Math.floor((Math.random() * 25) + 1);
 let  win = document.getElementById("containerDvd");
 let  ww = win.offsetWidth;
 let  wh = win.offsetHeight;
 let  translateX = Math.floor((Math.random() * ww) + 1);
 let  translateY = Math.floor((Math.random() * wh) + 1);
 let  boxWidth = box.offsetWidth;
 let  boxHeight = box.offsetHeight;
 let  boxTop = box.offsetTop;
 let  boxLeft = box.offsetLeft;
 let  xMin = -boxLeft;
 let  yMin = -boxTop;
 let  xMax = win.offsetWidth - boxLeft - boxWidth;
 let  yMax = win.offsetHeight - boxTop - boxHeight;
 let  request = null;
 let  direction = 'se';
 let  speed = 6;
 let  timeout = null;


// reset constraints on resize
window.addEventListener('resize', function(argument) {
  clearTimeout(timeout);
  timeout = setTimeout(update, 100);
}, false);

export function dvd() {
  request = requestAnimationFrame(dvd);
  move();
}

// reset constraints
function update() {
  xMin = -boxLeft;
  yMin = -boxTop;
  xMax = win.offsetWidth - boxLeft - boxWidth;
  yMax = win.offsetHeight - boxTop - boxHeight;
}

function move() {
  setDirection();
  setStyle(box, {
    transform: 'translate3d(' + translateX + 'px, ' + translateY + 'px, 0)',
  });
}

function setDirection() {
  switch (direction) {
    case 'ne':
      translateX += speed;
      translateY -= speed;
      break;
    case 'nw':
      translateX -= speed;
      translateY -= speed;
      break;
    case 'se':
      translateX += speed;
      translateY += speed;
      break;
    case 'sw':
      translateX -= speed;
      translateY += speed;
      break;
  }
  setLimits();
}

function setLimits() {
  if (translateY <= yMin) {
    if (direction == 'nw') {
      direction = 'sw';
    } else if (direction == 'ne') {
      direction = 'se';
    }
    switchImages();
  }
  if (translateY >= yMax) {
    if (direction == 'se') {
      direction = 'ne';
    } else if (direction == 'sw') {
      direction = 'nw';
    }
    switchImages();
  }
  if (translateX <= xMin) {
    if (direction == 'nw') {
      direction = 'ne';
    } else if (direction == 'sw') {
      direction = 'se';
    }
    switchImages();
  }
  if (translateX >= xMax) {
    if (direction == 'ne') {
      direction = 'nw';
    } else if (direction == 'se') {
      direction = 'sw';
    }
    switchImages();
  }
}
function switchImages() {
  let imageIndex = Math.floor(Math.random() * imageUrls.length);

  while (imageIndex == currentColor) {
    imageIndex = Math.floor(Math.random() * imageUrls.length);
  }

  // Assuming there is an <img> element inside the box div
  let imgElement = box.querySelector('img');
  if (imgElement) {
    imgElement.src = imageUrls[imageIndex];
  }

  currentColor = imageIndex;
}

function getVendor() {
  var ua = navigator.userAgent.toLowerCase(),
    match = /opera/.exec(ua) || /msie/.exec(ua) || /firefox/.exec(ua) || /(chrome|safari)/.exec(ua) || /trident/.exec(ua),
    vendors = {
      opera: '-o-',
      chrome: '-webkit-',
      safari: '-webkit-',
      firefox: '-moz-',
      trident: '-ms-',
      msie: '-ms-',
    };

  return vendors[match[0]];
};

function setStyle(element, properties) {
  var prefix = getVendor(),
    property, css = '';
  for (property in properties) {
    css += property + ': ' + properties[property] + ';';
    css += prefix + property + ': ' + properties[property] + ';';
  }
  element.style.cssText += css;
}