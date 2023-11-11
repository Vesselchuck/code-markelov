const body = document.querySelector("body");
const div1 = document.createElement("div");
const div2 = document.createElement("div");
const h3 = document.createElement("h3");
const i = document.createElement("i");
const img = document.createElement("img");
const myPhoto = document.getElementById("my-photo");

function disableScroll() {
// Get the current page scroll position
  scrollTop = window.scrollY || document.documentElement.scrollTop;
  scrollLeft = window.scrollX || document.documentElement.scrollLeft,

// if any scroll is attempted, set this to the previous value
      window.onscroll = function() {
          window.scrollTo(scrollLeft, scrollTop);
      };
};

function enableScroll() {
  window.onscroll = function() {};
};

myPhoto.addEventListener("click", function() {
  div1.id = "fullscreen-photo";
  myPhoto.after(div1);

  const fullscreenPhoto = document.getElementById("fullscreen-photo");
  img.src = "assets/me.webp";
  img.alt = "The portrait of Arsenii Markelov wearing a white shirt and a red tie. He is standing in front of a building.";
  fullscreenPhoto.appendChild(img);

  div2.id = "button-container";
  fullscreenPhoto.appendChild(div2);

  const buttonContainer = document.getElementById("button-container");
  i.id = "close-button";
  i.classList.add("fa-solid");
  i.classList.add("fa-xmark");
  buttonContainer.appendChild(i);
  h3.id = "button-text";
  h3.innerHTML = "Esc";
  buttonContainer.appendChild(h3)

  disableScroll();

  fullscreenPhoto.addEventListener("click", function() {
    fullscreenPhoto.remove();
    enableScroll();
  });

  body.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      fullscreenPhoto.remove();
      enableScroll();
    };
  });
});