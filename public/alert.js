function alertMsg(name, msg) {
  if (!name) name = "Erreur";
  if (!msg) msg = "Une erreur est survenue. Veuillez réessayer plus tard.";
  const overlay = document.createElement("div");
  overlay.classList = "overlay";
  document.body.appendChild(overlay);

  const popup = document.createElement("div");
  popup.classList = "popup";
  overlay.appendChild(popup);

  const heading = document.createElement("h3");
  heading.innerText = name;
  popup.appendChild(heading);

  const close = document.createElement("span");
  close.classList = "close";
  close.innerText = "×";
  close.addEventListener("click", function () {
    overlay.remove();
  });
  popup.appendChild(close);

  const content = document.createElement("div");
  content.classList = "content";
  content.innerText = msg;
  popup.appendChild(content);
}
