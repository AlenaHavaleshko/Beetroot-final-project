(function initialScript() {
 const burgerButton = document.querySelector(".js-hamburger");

 burgerButton.addEventListener("click", () => {
   const containerMain = document.getElementsByClassName("container-main__nav")[0];
   containerMain.classList.toggle('is-active');
   burgerButton.classList.toggle("is-active");
 });
})();