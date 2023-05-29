const DATA = [
  { name: "system-blank", img: "system_blank", alt: "Не выбран" },
  { name: "bank-blank", img: "bank_blank", alt: "Не выбрано" },
  { name: "СберБанк", img: "sberbank_logo", alt: "СберБанк" },
  { name: "ВТБ", img: "vtb_logo", alt: "ВТБ" },
  { name: "Альфа-Банк", img: "alfabank_logo", alt: "Альфа-Банк" },
  { name: "Россельхозбанк", img: "rosselhozbank_logo", alt: "Россельхозбанк" },
  { name: "Тинькофф", img: "tinkoff_logo", alt: "Тинькофф" },
  { name: "VISA", img: "visa_logo", alt: "VISA" },
  { name: "Maestro", img: "maestro_logo", alt: "Maestro" },
  { name: "Mastercard", img: "mastercard_logo", alt: "Mastercard" },
  { name: "МИР", img: "mir_logo", alt: "МИР" },
];

/* Элементы формы */
let card_form = document.getElementById("iForm");
let bank_select = document.getElementById("iBank");
let system_select = document.getElementById("iSystem");
let number_field = document.getElementById("iNumber");
let name_field = document.getElementById("iName");
let month_field = document.getElementById("iMonth");
let year_field = document.getElementById("iYear");

/* Элементы миниатюры банковской карточки */
let bank_logo = document.getElementsByClassName("card__bank-logo")[0];
let system_logo = document.getElementsByClassName("card__system-logo")[0];
let card_number = document.getElementsByClassName("card__number")[0];
let card_name = document.getElementsByClassName("card__name")[0];
let card_month = document.getElementsByClassName("card__month")[0];
let card_year = document.getElementsByClassName("card__year")[0];

/* Таблица */
let card_info = document.getElementsByClassName("card-info")[0];

/* Регистрируем обработчик события 'submit' на объекте card_form
   submit - отправка формы
*/
card_form.addEventListener("submit", function (event) {
  event.preventDefault();

  let isValid = validateSelect(bank_select) & validateSelect(system_select) & validateCardNumber(number_field) & validateName(name_field) & validateMonth(month_field);

  if (isValid) {
    fillInfo(card_info);
    card_form.reset();
    resetCard();
  } else {
    showModal("Проверьте правильность заполнения полей!");
  }
});

/* Регистрируем обработчики событий на полях ввода формы
   change - окончание изменения элемента (например, выбор option в select)
   keyup - клавиша была отпущена
   keydown - клавиша была нажата
*/
bank_select.addEventListener("change", function (event) {
  changeLogo(event, DATA, bank_logo);
});

system_select.addEventListener("change", function (event) {
  changeLogo(event, DATA, system_logo);
});

number_field.addEventListener("keydown", function (event) {
  changeNumber(event, card_number);
});

number_field.addEventListener("keyup", function (event) {
  changeNumber(event, card_number);
});

name_field.addEventListener("keydown", function (event) {
  changeName(event, card_name);
});

name_field.addEventListener("keyup", function (event) {
  changeName(event, card_name);
});

month_field.addEventListener("keydown", function (event) {
  changeDate(event, card_month);
});

month_field.addEventListener("keyup", function (event) {
  changeDate(event, card_month);
});

year_field.addEventListener("keydown", function (event) {
  changeDate(event, card_year);
});

year_field.addEventListener("keyup", function (event) {
  changeDate(event, card_year);
});

/* Функция для отображения логотипа банка на миниатюре */
function changeLogo(event, source, output) {
  let value = event.target.value;
  let logo = source.find(function (element) {
    return element["name"] == value;
  });

  output.src = `img/${logo["img"]}.png`;
  output.alt = logo["name"];
}

/* Функция для отображения имени держателя карты на миниатюре */
function changeName(event, output) {
  let value = event.target.value.replace(/[^a-zA-Z\s]/g, "");
  event.target.value = value.toUpperCase();
  if (value.length == 0) {
    output.textContent = event.target.dataset.placeholder;
    output.classList.add("blank");
  } else {
    output.textContent = value.toUpperCase();
    if (output.classList.contains) output.classList.remove("blank");
  }
}

/* Функция для отображения номера карты на миниатюре */
function changeNumber(event, output) {
  let value = event.target.value.replace(/[^0-9]/g, "");
  let formatValue = "";
  event.target.value = value;

  for (let i = 0; i <= value.length; i++) {
    if (value.length > 4) {
      formatValue += value.slice(0, 4) + " ";
      value = value.slice(4);
      i = 0;
    } else {
      formatValue += value;
      i = value.length;
    }
  }

  output.textContent = formatValue;
}

/* Функция для отображения месяца и года окончания на миниатюре */
function changeDate(event, output) {
  let value = event.target.value.replace(/[^0-9]/g, "");
  event.target.value = value;

  if (value.length == 1) {
    value = "0" + value;
  }

  output.textContent = value;
}

/* Функция переноса данных из формы в таблицу */
function fillInfo(output) {
  let system = DATA.find(function (element) {
    return element["name"] == system_select.value;
  });

  let bank = DATA.find(function (element) {
    return element["name"] == bank_select.value;
  });

  let month = month_field.value;
  let year = year_field.value;

  if (month.length == 1) {
    month = "0" + month;
  }

  if (year.length == 1) {
    year = "0" + year;
  }

  let tr = document.createElement("tr");
  tr.insertAdjacentHTML("beforeend", `<td>${bank["alt"]}</td> <td>${system["alt"]}</td> <td>${number_field.value}</td> <td>${name_field.value}</td> <td>${month}/${year}</td>`);
  output.childNodes[1].append(tr);
}

/* Функция проверки полей select
   false - если не выбран ни один из вариантов
*/
function validateSelect(field) {
  if (field.value.includes("blank")) return false;
  return true;
}

/* Функция проверки поля с номером карточки
   false - если номер не состоит из 16 символов
 */
function validateCardNumber(field) {
  if (field.value.length !== 16) return false;
  return true;
}

/* Функция проверки поля с именем держателя карточки
   false - если имя состоит из менее 2 символов
*/
function validateName(field) {
  if (field.value.length < 2) return false;
  return true;
}

/* Функция проверки поля с месяцем
   false - если номер месяца не лежит в отрезке [1; 12]
*/
function validateMonth(field) {
  if (field.value > 12 || field.value < 1) return false;
  return true;
}

/* Функция очистки миниатюры карточки */
function resetCard() {
  let bank = DATA.find(function (element) {
    return element["name"] == "bank-blank";
  });

  let system = DATA.find(function (element) {
    return element["name"] == "system-blank";
  });

  bank_logo.src = `img/${bank["img"]}.png`;
  bank_logo.alt = bank["name"];

  system_logo.src = `img/${system["img"]}.png`;
  system_logo.alt = system["name"];

  card_number.textContent = "";
  card_name.textContent = "";
  card_month.textContent = "";
  card_year.textContent = "";
}
