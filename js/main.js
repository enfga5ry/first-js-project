// check if there is local storage color option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color_option")
  );

  document.querySelectorAll(".colors-list li").forEach((el) => {
    el.classList.remove("active");
    if (el.dataset.color === mainColors) {
      el.classList.add("active");
    }
  });
}
//
let backgroundOption = true;
let backgroundInterval;
//check if there is local storage random background option
let backgroundLocalItem = localStorage.getItem("background_option");

if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  document.querySelectorAll(".random-bg span").forEach((el) => {
    el.classList.remove("active");
    if (backgroundLocalItem === "true") {
      document.querySelector(".random-bg .yes").classList.add("active");
    } else {
      document.querySelector(".random-bg .no").classList.add("active");
    }
  });
}

//toggle spin class on icon
let showHide = document.querySelector(".setting-box");
document.querySelector(".setting-box .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  showHide.classList.toggle("open");
};

//Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    localStorage.setItem("color_option", e.target.dataset.color);

    // e.target.parentElement.querySelectorAll(".active").forEach((el) => {
    //   el.classList.remove("active");
    // });
    // e.target.classList.add("active");

    handleActive(e);
  });
});
// random background on or off
const yn = document.querySelectorAll(".random-bg span");
yn.forEach((e) => {
  e.addEventListener("click", (el) => {
    // el.target.parentElement.querySelectorAll(".active").forEach((e) => {
    //   e.classList.remove("active");
    // });
    // el.target.classList.add("active");
    handleActive(el);

    if (el.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImg();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});
//select landing page element
let landPage = document.querySelector(".landing-page");
let imgArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
// random background Option

function randomizeImg() {
  if (backgroundOption) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgArray.length);
      landPage.style.backgroundImage =
        "url('./img/" + imgArray[randomNumber] + "')";
    }, 10000);
  }
}
randomizeImg();
// switching pressed button color for menu

// const menuLi = document.querySelectorAll(".links li a");
// menuLi.forEach((li) => {
//   li.addEventListener("click", (el) => {
//     el.target.parentElement.parentElement
//       .querySelectorAll(".active")
//       .forEach((e) => {
//         e.classList.remove("active");
//       });
//     el.target.classList.add("active");
//   });
// });

//select skills selector

let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  let skillsOffestTop = ourSkills.offsetTop;

  let skillsOuterHeight = ourSkills.offsetHeight;

  let windowHeight = this.innerHeight;

  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffestTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
  // this.console.log(skillsOffestTop);
  // this.console.log(skillsOuterHeight);
  // this.console.log(windowHeight);
  // this.console.log(windowScrollTop);
};

//create popup with the image
let ourGallery = document.querySelectorAll(".our-gallery img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      let imageHeading = document.createElement("h3");
      let imgText = document.createTextNode(img.alt);
      imageHeading.appendChild(imgText);
      popupBox.appendChild(imageHeading);
    }

    let popupImage = document.createElement("img");

    popupImage.src = img.src;

    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);

    let exit = document.createElement("span");
    exit.className = "exit";
    exit.innerText = "X";
    document.body.appendChild(exit);

    exit.onclick = function () {
      document.querySelector(".popup-overlay").remove();
      document.body.removeChild(popupBox);
      document.body.removeChild(exit);
    };
  });
});
//select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
allBullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});

//handle active state

function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((el) => {
    el.classList.remove("active");
  });
  ev.target.classList.add("active");
}

//show hide bullets

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalitem = localStorage.getItem("bullets_option");

if (bulletLocalitem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalitem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e);
  });
});

//reset button

document.querySelector(".reset-options").onclick = function () {
  // localStorage.clear();
  localStorage.removeItem("bullets_option");
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  window.location.reload();
};

//toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tlinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  tlinks.classList.toggle("open");
  e.stopPropagation();
};

// click anywhere outside menu and toggle button to close it

document.addEventListener("click", (e)=> {
  if(e.target !== toggleBtn && e.target !== tlinks ) {
    if(tlinks.classList.contains("open")){
      tlinks.classList.toggle("open");
    }
  }
})

tlinks.onclick = function(e) {
  e.stopPropagation();

}
