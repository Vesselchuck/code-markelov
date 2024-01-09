// Initialize variables and elements for DOM manipulation
const aboutMe = document.getElementById("about-me");
const body = document.querySelector("body");
const footer = document.querySelector("footer");
const header = document.querySelector("header");
const logo = document.getElementById("logo");
const main = document.querySelector("main");
const myPhoto = document.getElementById("my-photo");
const navLink = document.getElementsByClassName("nav-link");
const navMenu = document.getElementById("nav-menu");
const skills = document.getElementById("skills");





// Function to get the current screen width
const getScreenWidth = () => {
  // Return the inner width of the window, fallback to document element, or body width
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
};

// Function to define devices based on screen width
const defineDevices = () => {
  // Get the current screen width
  const screenWidth = getScreenWidth();

  // Define devices based on screen width
  const devices = {
    extraLarge: screenWidth >= 1200,
    large: screenWidth >= 992 && screenWidth <= 1199,
    medium: screenWidth >= 768 && screenWidth <= 991,
    small: screenWidth >= 600 && screenWidth <= 767,
    extraSmall: screenWidth < 600
  };

  // Return the devices object
  return devices;
};

// Function to check if the element has a certain class
const hasClass = (element, className) => element.classList.contains(className);





// Function to create and append an element to a parent with optional class names
const createAndAppendElement = (tag, id, parent, classNames = []) => {
  const element = document.createElement(tag);
  element.id = id;
  parent.appendChild(element);
  element.classList.add(...classNames);
  return element;
};

// Function to handle the click event on the "myPhoto" element
const myPhotoClickHandler = () => {
  // Create and append the elements needed for the photo display
  const photoBackground = createAndAppendElement("section", "photo-background", aboutMe);
  const photoContainer = createAndAppendElement("section", "photo-container", photoBackground);
  const imgMe = createAndAppendElement("img", "me", photoContainer);
  
  // Set image source and alt text
  imgMe.src = "assets/me.webp";
  imgMe.alt = "The portrait of Arsenii Markelov wearing a white shirt and a red tie. He is standing in front of a building.";

  // Create and append button container with an X button and text
  const buttonContainer = createAndAppendElement("section", "button-container", photoContainer);
  setTimeout(() => {
    // Add a class after a delay for a visual effect
    buttonContainer.classList.add("colored");
  }, 500);

  const xMark = createAndAppendElement("i", "button", buttonContainer, ["fa-solid", "fa-xmark"]);
  const buttonText = createAndAppendElement("h3", "button-text", buttonContainer);
  buttonText.innerText = "Esc";

  // Function to reset the visual state when called
  const resetVisualState = () => {
    body.classList.remove("hide-scrollbar");
    buttonContainer.classList.remove("colored");
    imgMe.classList.remove("ninetyPercent", "hundredPercent");
    photoContainer.remove();
    photoBackground.classList.remove("active");
    photoBackground.remove();
  };

  // Function to handle the "Escape" key press
  const handleEscKeyPress = (event) => {
    if (event.key === "Escape") {
      resetVisualState();
    };
  };

  // Function to handle image load, setting up visual state
  const handleImageLoad = () => {
    body.classList.add("hide-scrollbar");
    photoBackground.classList.add("active");
    imgMe.classList.add(getScreenWidth() <= 767 ? "ninetyPercent" : "hundredPercent");
  };

  // Event listeners for resetting visual state, "Escape" key press, and image load
  photoBackground.addEventListener("click", resetVisualState);
  body.addEventListener("keydown", handleEscKeyPress);
  imgMe.addEventListener("load", handleImageLoad);
};

// Add click event listener to the "myPhoto" element, calling the click handler function
myPhoto.addEventListener("click", myPhotoClickHandler);





// Function to toggle the "cycle" class on an element
const cycleIcons = (elementId) => {
  const element = document.getElementById(elementId);

  // Check if the element exists before toggling the class
  if (element) {
    element.classList.toggle("cycle");
  };
};

// Function to apply a theme by toggling the "light" class on the root element
const applyTheme = () => {
  const root = document.documentElement;

  // Toggle the "light" class on the root element
  root.classList.toggle("light");
};

// Initially set to Dark Theme
let lightTheme = false;
const savedTheme = localStorage.getItem("theme");

// Check if there is a saved theme preference
if (savedTheme === "light") {
  // If the saved theme is "light", set the initial state to Light Theme
  lightTheme = true;
  applyTheme();
  cycleIcons("theme-button");
};

// Function to toggle the theme
const toggleTheme = () => {
  // Toggle the theme by applying or removing the "light" class
  applyTheme();

  // Store the updated theme preference in localStorage
  localStorage.setItem("theme", lightTheme ? "dark" : "light");

  // Toggle the "cycle" class on the theme buttons
  cycleIcons("theme-button");
  cycleIcons("theme-button-new");
  
  // Toggle the theme flag
  lightTheme = !lightTheme;
};

// Get the theme button element
const themeButton = document.getElementById("theme-button");
// Add click event listener to toggle the theme when the button is clicked
themeButton.addEventListener("click", toggleTheme);





// Function to toggle between the third paragraph and replacement paragraph
// based on screen width
const tuneParagraph = () => {
  // Create variables to check the screen width
  const devices = defineDevices();
  const appropriateScreenWidth = (devices.large || devices.medium);

  // Get references to the existing elements
  const replacementParagraph = document.getElementById("replacement-paragraph");
  const thirdParagraph = document.getElementById("third-paragraph");

  // Function to create a new replacement paragraph element
  const createReplacementParagraph = () => {
    const replacementParagraphNew = document.createElement("section");
    replacementParagraphNew.id = "replacement-paragraph";
    replacementParagraphNew.innerHTML = "<p>I value teamwork and effective communication when working with Back-End developers, designers, and clients. I'm excited about the endless possibilities in Front-End Development and look forward to contributing to user-centric web solutions!</p>";
    return replacementParagraphNew;
  };

  // Function to create a new third paragraph element
  const createThirdParagraph = () => {
    const thirdParagraphNew = document.createElement("p");
    thirdParagraphNew.id = "third-paragraph";
    thirdParagraphNew.innerText = "I value teamwork and effective communication when working with Back-End developers, designers, and clients. I'm excited about the endless possibilities in Front-End Development and look forward to contributing to user-centric web solutions!";
    return thirdParagraphNew;
  };

  // Check if the thirdParagraph exists and the replacementParagraph does not,
  // and the screen width is appropriate
  if (thirdParagraph && !replacementParagraph && appropriateScreenWidth) {
    // Remove the existing <p> element with the id "third-paragraph"
    thirdParagraph.remove();
    
    // Insert the new <section> element after the <article> element
    // with the id "about-me"
    aboutMe.insertAdjacentElement("afterend", createReplacementParagraph());
  } else if (!thirdParagraph && replacementParagraph && !appropriateScreenWidth) {
  // Check if the replacementParagraph exists and the thirdParagraph does not,
  // and the screen width is not appropriate
    // Remove the existing <section> element with the id "replacement-paragraph"
    replacementParagraph.remove();
    
    // Insert the new <p> element at the end of the <section> which is
    // a child of <article> element with the id "about-me"
    aboutMe.firstElementChild.appendChild(createThirdParagraph());
  };
};





// Function to tune skills and contacts layout based on screen width
const tuneSkillsAndContacts = () => {
  // Get references to the existing elements
  const skillsCollection = skills.getElementsByClassName("brands");
  const firstSkillsSection = skillsCollection[0];
  const contactLinks = document.getElementById("contact-links");

  // Create variable to check the screen width
  const devices = defineDevices();

  // Create second and third skills sections
  const secondSkillsSection = document.createElement("section");
  const thirdSkillsSection = document.createElement("section");
  secondSkillsSection.classList = "brands";
  thirdSkillsSection.classList = "brands";

  const oneRow = !skillsCollection[1] && !skillsCollection[2];
  const twoRows = skillsCollection[1] && !skillsCollection[2];
  const threeRows = skillsCollection[1] && skillsCollection[2];

  // Define default HTML content for one, two, and three rows
  const firstRowDefaultHTML = `<i class="fa-brands fa-chrome"></i>
  <i class="fa-brands fa-css3-alt"></i>
  <i class="fa-brands fa-git"></i>
  <i class="fa-brands fa-github"></i>
  <i class="fa-brands fa-html5"></i>
  <i class="fa-brands fa-js"></i>
  <i class="fa-solid fa-terminal"></i>`;
  const contactsDefaultHTML = `<a href="https://discordapp.com/users/277533560213209098/" target="_blank"><i class="fa-brands fa-discord"></i></a>
  <a href="https://t.me/Vesselchuck" target="_blank"><i class="fa-brands fa-telegram"></i></a>
  <a href="mailto:vesselchuck.prime@gmail.com" target="_blank"><i class="fa-solid fa-envelope"></i></a>
  <i></i>
  <i></i>
  <i></i>
  <i></i>`;
  const contactsConciseHTML = `<a href="https://discordapp.com/users/277533560213209098/" target="_blank"><i class="fa-brands fa-discord"></i></a>
  <a href="https://t.me/Vesselchuck" target="_blank"><i class="fa-brands fa-telegram"></i></a>
  <a href="mailto:vesselchuck.prime@gmail.com" target="_blank"><i class="fa-solid fa-envelope"></i></a>`;

  // Define functions to handle skills layout for one, two, and three rows
  const skillsOneRow = () => {
    firstSkillsSection.innerHTML = firstRowDefaultHTML;

    if (twoRows) {
      skillsCollection[1].remove();
    } else if (threeRows) {
      skillsCollection[1].remove();
      skillsCollection[1].remove();
    };
    contactLinks.innerHTML = contactsDefaultHTML;
  };

  const skillsTwoRows = () => {
    const firstRowHTML = `<i class="fa-brands fa-chrome"></i>
    <i class="fa-brands fa-css3-alt"></i>
    <i class="fa-brands fa-git"></i>
    <i class="fa-brands fa-github"></i>`;
    const secondRowHTML = `<i class="fa-brands fa-html5"></i>
    <i class="fa-brands fa-js"></i>
    <i class="fa-solid fa-terminal"></i>`;

    if (oneRow) {
      firstSkillsSection.innerHTML = firstRowHTML;
      secondSkillsSection.innerHTML = secondRowHTML;

      skills.appendChild(secondSkillsSection);
    } else if (threeRows) {
      firstSkillsSection.innerHTML = firstRowHTML;
      skillsCollection[1].innerHTML = secondRowHTML;

      skillsCollection[2].remove();
    };
    contactLinks.innerHTML = contactsConciseHTML;
  };

  const skillsThreeRows = () => {
    const firstRowHTML = `<i class="fa-brands fa-chrome"></i>
    <i class="fa-brands fa-css3-alt"></i>
    <i class="fa-brands fa-git"></i>`;
    const secondRowHTML = `<i class="fa-brands fa-github"></i>
    <i class="fa-brands fa-html5"></i>`;
    const thirdRowHTML = `<i class="fa-brands fa-js"></i>
    <i class="fa-solid fa-terminal"></i>`;

    if (oneRow) {
      firstSkillsSection.innerHTML = firstRowHTML;
      secondSkillsSection.innerHTML = secondRowHTML;
      thirdSkillsSection.innerHTML = thirdRowHTML;

      skills.appendChild(secondSkillsSection);
      skills.appendChild(thirdSkillsSection);
    } else if (twoRows) {
      firstSkillsSection.innerHTML = firstRowHTML;
      skillsCollection[1].innerHTML = secondRowHTML;
      thirdSkillsSection.innerHTML = thirdRowHTML;

      skills.appendChild(thirdSkillsSection);
    };
    contactLinks.innerHTML = contactsConciseHTML;
  };

  // Function to adjust rows by adding or removing a specific class
  const adjustRows = (className) => {
    const rowsToRemove = ["medium-two-rows", "small-two-rows", "extra-small-three-rows"];

    // Remove all existing row-related classes
    if (skillsCollection[2]) {
      skillsCollection[1].classList.remove(...rowsToRemove);
      skillsCollection[2].classList.remove(...rowsToRemove);
    } else if (skillsCollection[1]) {
      skillsCollection[1].classList.remove(...rowsToRemove);
    };
    contactLinks.classList.remove(...rowsToRemove);

    if ((skillsCollection[2] && devices.extraSmall && className === rowsToRemove[2]) || skillsCollection[1] && skillsCollection[2]) {
      skillsCollection[1].classList.add(className);
      skillsCollection[2].classList.add(className);
      contactLinks.classList.add(className);
    } else if (skillsCollection[1]) {
      skillsCollection[1].classList.add(className);
      contactLinks.classList.add(className);
    };
  };

  // Function to add or remove rows based on the device size
  const adjustRowsByDeviceSize = () => {
    if (devices.medium) {
      skillsTwoRows();
      adjustRows("medium-two-rows");
    } else if (devices.small) {
      skillsTwoRows();
      adjustRows("small-two-rows");
    } else if (devices.extraSmall) {
      skillsThreeRows();
      adjustRows("extra-small-three-rows");
    } else {
      skillsOneRow();
      adjustRows();
    };
  };

  // Call the function to adjust rows based on device size
  adjustRowsByDeviceSize();
};





// Function to toggle the navigation menu
const toggleNavMenu = () => {
  // Check if the "smooth" class is not already present
  const smooth = hasClass(navMenu, "smooth");
  if (!smooth) {
    // Add the "smooth" class to enable smooth transitions
    navMenu.classList.add("smooth");
  };

  // Toggle the "open" class to show/hide the navigation menu
  navMenu.classList.toggle("open");

  // Check if the "open" class is not present after toggling
  const open = hasClass(navMenu, "open");
  if (!open) {
    // Define a function to remove the "smooth" class after the transition ends
    const removeSmoothClass = () => {
      // Remove the "smooth" class
      navMenu.classList.remove("smooth");
      // Remove the event listener to avoid multiple calls
      navMenu.removeEventListener("transitionend", removeSmoothClass);
    };

    // Add an event listener for the "transitionend" event to call the function
    navMenu.addEventListener("transitionend", removeSmoothClass, { once: true });
  };
};





// Function to toggle the navigation bar based on screen width and current state
const tuneNavBar = () => {
  // Create variables to check the screen width
  const devices = defineDevices();
  const appropriateScreenWidth = (devices.small || devices.extraSmall);

  // Get the current state of certain classes in the document
  const hamburger = hasClass(header, "hamburger");
  const concise = hasClass(main, "concise");
  const hidden = hasClass(themeButton, "hidden");

  // Function to toggle specific classes on certain elements
  const toggleClasses = () => {
    header.classList.toggle("hamburger");
    main.classList.toggle("concise");
    themeButton.classList.toggle("hidden");
  };

  // Function to add event listeners to the element with the "logo" id
  // and the elements with the "nav-link" class
  const addEventListeners = () => {
    logo.addEventListener("mousedown", toggleNavMenu);
    for (let index = 0; index < navLink.length; index++) {
      const element = navLink[index];
      element.querySelector("a").addEventListener("mousedown", toggleNavMenu);
    };
  };

  // Function to remove event listeners from the element with the "logo" id
  // and the elements with the "nav-link" class
  const removeEventListeners = () => {
    logo.removeEventListener("mousedown", toggleNavMenu);
    for (let index = 0; index < navLink.length; index++) {
      const element = navLink[index];
      element.querySelector("a").removeEventListener("mousedown", toggleNavMenu);
    };
  };

  // Function to add a new button to switch themes to the navigation menu
  const addThemeButtonNew = () => {
    const themeButtonNew = document.createElement("button");
    themeButtonNew.id = "theme-button-new";
    themeButtonNew.innerHTML = `<i class="fa-solid fa-moon"></i>
    <i class="fa-solid fa-sun"></i><span>Switch Theme</span>`
    navMenu.appendChild(themeButtonNew);
    themeButtonNew.addEventListener("click", toggleTheme);
    themeButtonNew.addEventListener("mousedown", toggleNavMenu);
  };

  // Function to remove the new button to switch themes from the navigation menu
  const removeThemeButtonNew = () => {
    const themeButtonNew = document.getElementById("theme-button-new");
    themeButtonNew.remove();

    themeButtonNew.removeEventListener("click", toggleTheme);
    themeButtonNew.removeEventListener("mousedown", toggleNavMenu);
  };

  // Determine whether to change or revert the navigation bar based on conditions
  const shouldChangeNavBar = (!(hamburger && concise && hidden) && appropriateScreenWidth);
  const shouldRevertNavBar = ((hamburger && concise && hidden) && !appropriateScreenWidth);

  // Perform actions based on the conditions above
  if (shouldChangeNavBar) {
    toggleClasses();
    addEventListeners();
    addThemeButtonNew();
  } else if (shouldRevertNavBar) {
    toggleClasses();
    removeEventListeners();
    removeThemeButtonNew();
  };

  // If the current theme is Light, cycle sun and moon icons
  if (lightTheme) {
    cycleIcons("theme-button-new");
  };
};





// Function to toggle the flex properties of the element with the "about-me" id
const tuneAboutMe = () => {
  // Create variables to check the screen width
  const devices = defineDevices();
  const appropriateScreenWidth = (devices.small || devices.extraSmall);

  // Check if the element with the "about-me" id has the "column" class
  const column = hasClass(aboutMe, "column");

  // Toggle the "column" class based on its presence and the appropriate screen width
  if ((column && !appropriateScreenWidth) || (!column && appropriateScreenWidth)) {
    aboutMe.classList.toggle("column");
  };
};





// Function to tune the logo and footer based on device size
const tuneLogoAndFooter = () => {
  // Get device information
  const devices = defineDevices();

  // Define construction parts and related functions
  const constructionParts = () => {
    // Define initial construction parts
    const cp = {
      title: ", B.Sc.",
      mediumLogo: "Arsenii Markelov",
      hamburgerBeginning: `<i class="fa-solid fa-bars"></i><span>`,
      hamburgerEnding: `</span>`,
      copyrightBeginning: `<h3 id="copyright">&#169; 2023-2024 `,
      copyrightEnding: `All Rights Reserved.</h3>`,
      copyrightDivider: ". ",
      copyrightLineBreak: `.<br>`
    };

    // Function to replace spaces with ". " in a string
    const replaceSpace = (text) => {
      const characters = Array.from(text);
      characters.forEach((element, index) => {
        if (element === " ") {
          characters[index] = ". ";
           // Remove unnecessary characters
          characters.splice(1, index-1);
        };
      });
      return characters.join("");
    };

    // Add new properties
    cp.longLogo = cp.mediumLogo + cp.title;
    cp.shortLogo = replaceSpace(cp.mediumLogo);
    cp.longHamburgerLogo = cp.hamburgerBeginning + cp.longLogo + cp.hamburgerEnding;
    cp.mediumHamburgerLogo = cp.hamburgerBeginning + cp.mediumLogo + cp.hamburgerEnding;
    cp.oneLineCopyright = cp.copyrightBeginning + cp.shortLogo + cp.copyrightDivider + cp.copyrightEnding;
    cp.twoLinesCopyright = cp.copyrightBeginning + cp.shortLogo + cp.copyrightLineBreak + cp.copyrightEnding;

    // Remove deprecated properties
    delete cp.title;
    delete cp.hamburgerBeginning;
    delete cp.hamburgerEnding;
    delete cp.copyrightBeginning;
    delete cp.copyrightEnding;
    delete cp.copyrightDivider;
    delete cp.copyrightLineBreak;

    return cp;
  };

  // Create building blocks using construction parts
  const buildingBlocks = constructionParts();

  // Set the footer content
  footer.innerHTML = buildingBlocks.oneLineCopyright;

  // Change the text of the "logo" element based on device size
  if (devices.large) {
    logo.innerText = buildingBlocks.mediumLogo;
  } else if (devices.medium) {
    logo.innerText = buildingBlocks.shortLogo;
  } else if (devices.small) {
    logo.innerHTML = buildingBlocks.longHamburgerLogo;
  } else if (devices.extraSmall) {
    logo.innerHTML = buildingBlocks.mediumHamburgerLogo;
    footer.innerHTML = buildingBlocks.twoLinesCopyright;
  } else {
    // Reset to default text if the screen width is outside the specified range
    logo.innerText = buildingBlocks.longLogo;
  };
};





// Function to apply responsive changes to various elements
const responsiveChanges = () => {
  // Call functions to adjust specific elements
  tuneAboutMe();
  tuneNavBar();
  tuneParagraph();
  tuneSkillsAndContacts();
  tuneLogoAndFooter();
};

// Initial call to set elements based on the current screen width
responsiveChanges();

// Event listener for window resize to trigger responsive changes
window.addEventListener("resize", responsiveChanges);
