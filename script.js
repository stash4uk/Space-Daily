"use strict";

// SELECTORS

let image = document.querySelector(".image");
let imageTitle = document.querySelector(".image-title");
let imageAuthor = document.querySelector(".image-author");
let imageDescription = document.querySelector(".image-description");
let imageDate = document.querySelector(".image-date");
const btnToday = document.getElementById("btn-today");
const btnDate = document.getElementById("btn-date");
const modalOpen = document.querySelector(".modal-window");
const btnCloseModal = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");
const btnLike = document.querySelector(".btn-like");
const modalDate = document.querySelector(".modal-window-date");
const btnCloseCalendar = document.querySelector(".close-modal-date");
const btnView = document.querySelector(".btn-view");
const publicationDateEl = document.getElementById("publication-date");

// FUNCTION TO FETCH AN OBJECT FROM API

const fetchApi = function (url) {
  fetch(url).then((res) =>
    res.json().then((data) => {
      imageTitle.textContent = data.title;
      imageAuthor.textContent = data.copyright
        ? `by ${data.copyright}`
        : `Unknown Author`;
      imageDate.textContent = data.date;
      image.src = data.url;
      imageDescription.textContent = data.explanation;
    })
  );
};

// FUNCTION TO OPEN A MODAL WINDOW

const openModal = function (btn) {
  if (btn === btnToday) {
    modalOpen.classList.remove("hidden");
  } else if (btn === btnDate) {
    modalDate.classList.remove("hidden");
  }
  const urlToday =
    "https://api.nasa.gov/planetary/apod?api_key=2rVrn5dy4mknm9bxu9X6g0cXPHnGXOPVJBublREL";
  fetchApi(urlToday);
};

// FUNCTION TO CLOSE A MODAL WINDOW

const closeModal = function (btnClose) {
  if (btnClose === btnCloseModal) {
    modalOpen.classList.add("hidden");
  } else if (btnClose === btnCloseCalendar) {
    modalDate.classList.add("hidden");
  }
};

// FUNCTION TO TOGGLE LIKE BUTTON

let toggleLike = function () {
  if (btnLike.innerText === "Like") {
    btnLike.innerText = "Unlike";
  } else {
    btnLike.innerText = "Like";
  }
};

// FUNCTION TO VIEW A SELECTED DATE

const viewDate = function () {
  let publicationDate = publicationDateEl.value;
  let urlDate = `https://api.nasa.gov/planetary/apod?api_key=2rVrn5dy4mknm9bxu9X6g0cXPHnGXOPVJBublREL&date=${publicationDate}`;
  if (!publicationDate) {
    alert("Do not forget to pick a date!");
  } else {
    modalOpen.classList.remove("hidden");
    fetchApi(urlDate);
    closeModal(btnCloseCalendar);
    publicationDateEl.value = "";
  }
};

// EVENT LISTENERS

btnToday.addEventListener("click", function () {
  openModal(btnToday);
});
btnDate.addEventListener("click", function () {
  openModal(btnDate);
});
btnCloseModal.addEventListener("click", function () {
  closeModal(btnCloseModal);
});
btnCloseCalendar.addEventListener("click", function () {
  closeModal(btnCloseCalendar);
});
btnLike.addEventListener("click", toggleLike);
btnView.addEventListener("click", viewDate);
