if (window.innerWidth < 550) {
  document.querySelector("#navbar .left").remove();
}

const results = document.querySelector("#results");

async function getGeocode(q) {
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${q}&limit=3&key=1c98dab0742c4436935e48a704cb73c5`
    );
    while (results.firstChild) {
      results.removeChild(results.firstChild);
    }
    if (response.data.results.length) {
      for (let i = 0; i < Math.min(response.data.results.length, 3); i++) {
        const aTag = document.createElement("a");
        const result = response.data.results[i];
        aTag.appendChild(document.createTextNode(result.formatted));
        aTag.href = `/meteo?place=${result.formatted}&lat=${result.geometry.lat}&lng=${result.geometry.lng}`;
        results.appendChild(aTag);
      }
      trapFocus(document.querySelector("section"));
      for (element of results.children) {
        element.addEventListener("blur", () => {
          setTimeout(() => {
            if (document.activeElement.parentNode !== results) {
              results.classList.remove("show");
            }
          }, 200);
        });
      }
    } else {
      const aTag = document.createElement("a");
      aTag.appendChild(document.createTextNode(`Pas de résultat pour "${q}"`));
      results.appendChild(aTag);
    }
  } catch (error) {
    alertMsg(error.name, error.message);
  }
}
const input = document.querySelector("input");
input.addEventListener("input", async function () {
  if (this.value.length > 2) {
    await getGeocode(this.value);
    results.classList = "show";
    ajustFooter();
  } else {
    results.classList.remove("show");
    setTimeout(() => {
      while (results.firstChild) {
        results.removeChild(results.firstChild);
      }
      ajustFooter();
    }, 300);
  }
});
input.addEventListener("focus", function () {
  if (this.value.length > 2) {
    results.classList = "show";
    ajustFooter();
  }
});
input.addEventListener("blur", function () {
  if (window.innerWidth > 500) {
    setTimeout(() => {
      if (document.activeElement.parentNode !== results) {
        results.classList.remove("show");
        ajustFooter();
      }
    }, 200);
  }
});

input.addEventListener("keyup", function (event) {
  if ((event.key === "Enter" || event.keyCode === 13) && results.firstChild) {
    if (window.innerWidth > 500) {
      results.firstChild.click();
    } else {
      input.blur();
    }
  }
});

addEventListener("click", function (event) {
  if (event.target !== results && event.target !== input) {
    if (window.innerWidth <= 500 && results.classList.contains("show")) {
      setTimeout(() => {
        if (document.activeElement.parentNode !== results) {
          results.classList.remove("show");
          ajustFooter();
        }
      }, 200);
    }
  }
});

function trapFocus(element) {
  var focusableEls = element.querySelectorAll("a[href]:not([disabled])");
  var firstFocusableEl = focusableEls[0];
  var lastFocusableEl = focusableEls[focusableEls.length - 1];
  var KEYCODE_TAB = 9;

  element.addEventListener("keydown", function (e) {
    var isTabPressed = e.key === "Tab" || e.keyCode === KEYCODE_TAB;

    if (!isTabPressed) {
      return;
    }
    results.classList = "show";

    if (e.shiftKey) {
      /* shift + tab */ if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        e.preventDefault();
      }
    } /* tab */ else {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        e.preventDefault();
      }
    }
  });
}
