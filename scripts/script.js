const div = document.createElement("div");
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
  div.id = "fullscreen-photo";
  myPhoto.after(div);
  const fullscreenPhoto = document.getElementById("fullscreen-photo");
  img.src = "assets/me.webp";
  img.alt = "The portrait of Arsenii Markelov wearing a white shirt and a red tie. He is standing in front of a building.";
  fullscreenPhoto.appendChild(img);
  disableScroll();

  fullscreenPhoto.addEventListener("click", function() {
    fullscreenPhoto.remove();
    enableScroll();
  });
});