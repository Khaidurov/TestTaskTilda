// Modal
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".header__city");
const closeModalBtn = document.querySelector(".modal__btn-close");

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

openModalBtn.addEventListener("click", openModal);

//Geolocation
const citiesArray = [
  { name: "Москва", phone: "8-800-555-35-35" },
  { name: "Санкт‑Петербург", phone: "8-800-444-43-43" },
  { name: "Екатеринбург", phone: "8-800-333-23-23" },
  { name: "Ростов-на-Дону", phone: "8-800-222-12-12" },
  { name: "Магадан", phone: "8-800-111-10-10" },
];

const defaultCity = { name: "Санкт‑Петербург", phone: "8-800-444-43-43" };

const modalCityText = document.querySelector(".modal__city-text");
const headerCity = document.querySelector(".header__city");
const headerPhoneLink = document.querySelector(".header__phone-link");
const footerPhoneLink = document.querySelector(".footer__phone-link");
const modalActionYes = document.querySelector(".modal__action-button-yes");
const modalActionNo = document.querySelector(".modal__action-button-no");
const modalActionGet = document.querySelector(".modal__action-button-get");
const modalForm = document.querySelector(".modal__form");
const modalFormSelect = document.querySelector(".modal__form-select");

const fillCityAndPhone = function (name, phone) {
  modalCityText.textContent = name;
  headerCity.textContent = name;
  headerPhoneLink.innerHTML = phone;
  headerPhoneLink.href = "tel:" + phone.match(/\d+/g).join("");
  footerPhoneLink.innerHTML = phone;
  footerPhoneLink.href = "tel:" + phone.match(/\d+/g).join("");
};

const findCityByName = function (name) {
  city = citiesArray.find((item) => item.name == name);
  if (typeof city === "undefined") {
    return defaultCity;
  }
  return city;
};

const runModalActionYes = function () {
  const city = findCityByName(modalCityText.textContent);
  fillCityAndPhone(city["name"], city["phone"]);
  closeModal();
};
modalActionYes.addEventListener("click", runModalActionYes);

const runModalActionNo = function () {
  modalForm.classList.remove("hidden");
  modalActionYes.classList.add("hidden");
  modalActionNo.classList.add("hidden");
  modalActionGet.classList.remove("hidden");
};
modalActionNo.addEventListener("click", runModalActionNo);

function successCurrentPosition(pos) {
  const coords = pos.coords;
  let cityName = "";

  const geocodeResult = ymaps.geocode([coords.latitude, coords.longitude]);
  geocodeResult.then(
    function (res) {
      cityName = res.geoObjects.get(0).properties.get("description");
      const city = findCityByName(cityName);
      fillCityAndPhone(city["name"], city["phone"]);
      closeModal();
    },
    function (err) {
      console.log("ERROR");
    }
  );
}
function errorCurrentPosition(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
const runModalActionGet = function () {
  navigator.geolocation.getCurrentPosition(
    successCurrentPosition,
    errorCurrentPosition,
    {
      enableHighAccuracy: true,
      timeout: 500,
    }
  );
};
modalActionGet.addEventListener("click", runModalActionGet);

const modalFormSelectChange = function () {
  const city = findCityByName(this.value);
  fillCityAndPhone(city["name"], city["phone"]);
  closeModal();
};
modalFormSelect.addEventListener("change", modalFormSelectChange);

const initGeolocationRequest = function () {
  const geolocation = ymaps.geolocation;
  console.log(geolocation.city);
  modalCityText.textContent = geolocation.city;
};

document.addEventListener("DOMContentLoaded", () => {
  fillCityAndPhone(defaultCity["name"], defaultCity["phone"]);
  citiesArray.map((city) => {
    let opt = document.createElement("option");
    opt.value = city["name"];
    opt.innerHTML = city["name"];
    modalFormSelect.append(opt);
  });
});

window.addEventListener("load", () => {
  ymaps.ready(initGeolocationRequest);
  openModal();
});
