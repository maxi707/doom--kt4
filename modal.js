let modal = document.getElementsByClassName("modal")[0];
let modal_message = document.getElementsByClassName("modal__message")[0];
let modal_button = document.getElementById("iModalClose");

modal_button.addEventListener("click", function () {
  modal.classList.toggle("modal--shown");
});

function showModal(message) {
  modal_message.textContent = message;
  modal.classList.toggle("modal--shown");
}
