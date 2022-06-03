const body = document.querySelector("body");
const doRemoveHeight = body.getBoundingClientRect().y === 0;

window.addEventListener("scroll", onBodyScroll);
function onBodyScroll() {
  const navbar = document.getElementById("navbar");
  const rect = body.getBoundingClientRect();
  const bodyTopPosition = doRemoveHeight
    ? rect.top
    : rect.top - document.querySelector("#navbar").clientHeight;
  if (bodyTopPosition < -1) {
    navbar.classList.add("black");
  } else {
    navbar.classList.remove("black");
  }
}

//place footer at bottom if not enough content
ajustFooter();

function ajustFooter() {
  const footer = document.querySelector("footer");
  const margin = window.innerHeight - footer.getBoundingClientRect().height;
  let lastElIndex = -1;

  for (child of body.children) {
    if (child == footer) break;
    lastElIndex++;
  }
  const lastEl = body.children[lastElIndex];
  const elementsHeight =
    lastEl.getBoundingClientRect().top + lastEl.getBoundingClientRect().height;

  if (margin > elementsHeight) {
    footer.style.position = "absolute";
    footer.style.bottom = "0";
  } else {
    footer.style.position = "relative";
  }
}
