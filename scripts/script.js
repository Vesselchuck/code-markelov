// Initialize variables and elements for DOM manipulation
const body = document.querySelector("body");
const div1 = document.createElement("div");
const div2 = document.createElement("div");
const h3 = document.createElement("h3");
const i = document.createElement("i");
const img = document.createElement("img");
const myPhoto = document.getElementById("my-photo");

// Function to disable scrolling
function disableScroll() {
  // Get the current page scroll position
  const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  const scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;

  // If any scroll is attempted, set this to the previous value
  function handleScroll() {
    window.scrollTo(scrollLeft, scrollTop);
  }

  // Add the scroll event listener
  window.addEventListener("scroll", handleScroll);

  // Store the event handler function so it can be removed later
  // This is useful for re-enabling scrolling later
  window.disableScrollHandler = handleScroll;
}

// Function to enable scrolling
function enableScroll() {
  // Remove the scroll event listener added during disableScroll
  window.removeEventListener("scroll", window.disableScrollHandler);
}

myPhoto.addEventListener("click", function() {
  div1.id = "fullscreen-photo";
  myPhoto.after(div1);

  const fullscreenPhoto = document.getElementById("fullscreen-photo");
  img.src = "assets/me.webp";
  img.alt = "The portrait of Arsenii Markelov wearing a white shirt and a red tie. He is standing in front of a building.";
  img.id = "me";
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
    div1.classList.remove("active");
    fullscreenPhoto.remove();
    enableScroll();
  });

  body.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      div1.classList.remove("active");
      fullscreenPhoto.remove();
      enableScroll();
    };
  });

  // Create an image element
  const imgMe = document.getElementById("me");

  // Add a load event listener to the image
  imgMe.addEventListener("load", function() {
    // Force a reflow before adding the "active" class
    div1.offsetWidth; // This line triggers a reflow
    // Use requestAnimationFrame to ensure the next repaint
    requestAnimationFrame(function() {
      // Add the "active" class after the image has loaded and the next repaint has occurred
      div1.classList.add("active");
    });
  });
});

// Define CSS variables for both Dark and Light Themes
const themes = {
  dark: {
    "--accent": "rgb(173, 26, 75)",
    "--button-active": "rgb(115, 17, 50)",
    "--button-hover": "rgb(173, 26, 75)",
    "--close-button": "rgb(217, 217, 217)",
    "--dark-transparent": "rgba(0, 0, 0, .75)",
    "--moon": "none",
    "--primary": "rgb(23, 25, 28)",
    "--primary-alt": "rgb(16, 17, 20)",
    "--secondary": "rgb(217, 217, 217)",
    "--sun": "inline-block"
  },
  light: {}
};

// Function to apply a theme by setting or removing CSS variables
function applyTheme(theme) {
  const root = document.documentElement;

  for (const variable in themes.dark) {
    if (theme[variable]) {
      // Set the CSS variable with the theme value
      root.style.setProperty(variable, theme[variable]);
    } else {
      // Remove the CSS variable if the theme value is not defined
      root.style.removeProperty(variable);
    };
  };
};

// Initially set to Light Theme
let isDarkTheme = false;
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  isDarkTheme = true;
  applyTheme(themes.dark);
};

// Function to toggle the theme
function toggleTheme() {
  if (isDarkTheme) {
    applyTheme(themes.light);
    localStorage.setItem("theme", "light"); // Store the theme preference as light
  } else {
    applyTheme(themes.dark);
    localStorage.setItem("theme", "dark"); // Store the theme preference as dark
  };

  isDarkTheme = !isDarkTheme; // Toggle the theme flag
};

const themeButton = document.getElementById("theme-button");
themeButton.addEventListener("click", toggleTheme);