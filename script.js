function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + encodeURIComponent(cvalue) + ";" + expires + ";path=/";
}

function getCookie(cname) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function deleteCookie(cname) {
  document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function updatePage() {
  const cookieData = getCookie("userData");
  const displayArea = document.getElementById("displayArea");
  if (cookieData) {
    try {
      const user = JSON.parse(cookieData);
      displayArea.textContent = "Welcome back, " + user.name + "!";
      document.body.style.backgroundColor = user.color;
    } catch (e) {
      displayArea.textContent = "Welcome back, " + cookieData + "!";
    }
  } else {
    displayArea.textContent = "Welcome new visitor!";
    document.body.style.backgroundColor = "";
  }
}

function startCookieAnimation() {
  const cookieAnimationContainer = document.getElementById('cookie-animation');
  const numCookies = 70;
  for (let i = 0; i < numCookies; i++) {
    const cookie = document.createElement('div');
    cookie.classList.add('cookie');
    cookie.textContent = '🍪';
    cookie.style.left = Math.random() * 100 + 'vw';

    const duration = 3 + Math.random() * 4;
    cookie.style.animationDuration = duration + 's';

    const delay = Math.random() * 2;
    cookie.style.animationDelay = delay + 's';
    cookieAnimationContainer.appendChild(cookie);

    setTimeout(() => {
      cookie.remove();
    }, (duration + delay) * 1000);
  }

  setTimeout(() => {
    cookieAnimationContainer.innerHTML = '';
  }, 10000);
}

window.onload = function () {
  startCookieAnimation();
  updatePage();
};

function setCookieData() {
  const name = prompt("Enter your name:");
  if (name && name.trim() !== "") {
    let color = prompt("Enter your favorite color (for background):");
    if (!color || color.trim() === "") {
      color = "white";
    }
    const userData = {
      name: name,
      color: color
    };
    setCookie("userData", JSON.stringify(userData), 1);
    updatePage();
  }
}

function removeCookieData() {
  deleteCookie("userData");
  updatePage();
}
