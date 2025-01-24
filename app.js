let prevBtn = document.getElementById('prev');
let nextBtn = document.getElementById('next');
let carousel = document.querySelector('.carousel');
let items = carousel.querySelectorAll('.list .item');
let indicator = carousel.querySelector('.indicators');
let dots = indicator.querySelectorAll('.indicators ul li');

const specCircles = document.querySelectorAll('.specCircle');
// Referencias al título y descripción de la columna izquierda
const specTitleElem = document.querySelector('.specLeft .specTitle');
const specDescElem  = document.querySelector('.specLeft .specDescription');

let active = 0;
let firstPosition = 0;
let lastPosition = items.length - 1;
let autoPlay;

const startAutoPlay = () => {
  clearInterval(autoPlay); 
  autoPlay = setInterval(() => {
      nextBtn.click();
  }, 5000);
}
startAutoPlay();

const setSlider = () => {
  let itemActiveOld = carousel.querySelector('.list .item.active');
  if(itemActiveOld) itemActiveOld.classList.remove('active');
  items[active].classList.add('active');

  let dotActiveOld = indicator.querySelector('.indicators ul li.active');
  if(dotActiveOld) dotActiveOld.classList.remove('active');
  dots[active].classList.add('active');

  indicator.querySelector('.number').innerText = 'OPPO' ;
  startAutoPlay();
}
setSlider();

// Recorremos cada círculo y añadimos el evento
specCircles.forEach(circle => {
  circle.addEventListener('click', () => {
    // 1. Quita la clase "selected" de todos los círculos
    specCircles.forEach(c => c.classList.remove('selected'));

    // 2. Añade la clase "selected" al círculo clicado
    circle.classList.add('selected');

    // 3. Actualiza el texto en la columna izquierda
    const newTitle = circle.getAttribute('data-title');
    const newDesc = circle.getAttribute('data-description');
    specTitleElem.textContent = newTitle;
    specDescElem.textContent  = newDesc;
  });
});

nextBtn.onclick = () => {
    active = active + 1 > lastPosition ? 0 : active + 1;
    carousel.style.setProperty('--calculation', 1);
    setSlider();
}
prev.onclick = () => {
    active = active - 1 < firstPosition ? lastPosition : active - 1;
    carousel.style.setProperty('--calculation', -1);
    setSlider();
    clearInterval(autoPlay);
    autoPlay = setInterval(() => {
        nextBtn.click();
    }, 5000);
}
dots.forEach((item, position) => {
    item.onclick = () => {
        active = position;
        setSlider();
    }
})


// ========== NUEVO CÓDIGO PARA EL MODAL DE VIDEO ==========
const modal = document.getElementById('videoModal');
const closeBtn = document.querySelector('.close');
const iframe = document.getElementById('modalVideoIframe');

// Si solo tienes un botón "See More":
const seeMoreBtn = document.querySelector('.btn-see-more'); 

// Si tienes varios, podrías usar:
// const seeMoreBtns = document.querySelectorAll('.btn-see-more'); 
// y luego iterar con seeMoreBtns.forEach(...)

// Al hacer clic en "See More", abrimos la modal con el video
seeMoreBtn.addEventListener('click', () => {
  // Mostramos la ventana modal
  modal.classList.add('show');

  // Establecemos la URL del video con autoplay
  // (Opcional: puedes dejarlo sin autoplay=1 si no quieres reproducción automática)
  iframe.src = 'https://www.youtube.com/embed/MzM3-P46m1I?autoplay=1&mute=0&controls=1';


});

// Cerrar la modal
closeBtn.addEventListener('click', () => {
  modal.classList.remove('show');
  // Limpiamos el src para pausar/evitar que se siga reproduciendo
  iframe.src = '';
});

// También podrías cerrar al hacer clic fuera de la caja modal
modal.addEventListener('click', (e) => {
  // Si el clic es en el fondo, y no dentro del .modal-content, cierra
  if (e.target === modal) {
    modal.classList.remove('show');
    iframe.src = '';
  }
});


window.addEventListener('DOMContentLoaded', () => {
  // Asegúrate de que "active" sea el index del slide inicial
  active = 0;

  // Forzamos la dirección de la animación desde la derecha
  carousel.style.setProperty('--calculation', 1);

  // Mostramos el primer slide con animación
  setSlider();
});
