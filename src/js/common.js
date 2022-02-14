let element = document.querySelector('.dron');
let elementBody = document.querySelector('.dron__body');
let moveBy = 20;
let engineStarter = false;
const Keys = {
   up: false,
   down: false,
   left: false,
   right: false
};
const borderRange = element.offsetWidth;
const startBtn = document.querySelector('.bottom-panel__btn');
let coordination = null;

startBtn.addEventListener('click', (e) => {
   e.preventDefault();
   element.classList.add('start-engine');
   startBtn.parentElement.classList.add('scroll-down');
   engineStarter = true
})

window.addEventListener('load', () => {
   element.style.left = window.innerWidth / 2 + 'px';
   element.style.top = window.innerHeight / 2 + 'px';
});

window.addEventListener('keydown', (e) => {
   if(engineStarter){
      switch (e.key) {
         case 'ArrowLeft':
            Keys.left = true;
            coordination = parseInt(element.style.left) - moveBy;
            if( coordination > borderRange) { element.style.left = coordination + 'px'; }
            elementBody.classList.add('dron__body-inertia-left');
            break;
         case 'ArrowRight':
            Keys.right = true;
            coordination = parseInt(element.style.left) + moveBy;
            if( coordination < window.innerWidth - borderRange) { element.style.left = coordination + 'px'; }
            elementBody.classList.add('dron__body-inertia-right');
            break;
         case 'ArrowUp':
            Keys.up = true;
            coordination = parseInt(element.style.top) - moveBy;
            if( coordination > borderRange) { element.style.top = coordination + 'px'; }
            elementBody.classList.add('dron__body-inertia-top');
            break;
         case 'ArrowDown':
            Keys.down = true;
            coordination = parseInt(element.style.top) + moveBy;
            if( coordination < window.innerHeight - borderRange) { element.style.top = coordination + 'px'; }
            elementBody.classList.add('dron__body-inertia-bottom');
            break;
      }
   }
});

window.addEventListener('keyup', (e) => {
   switch (e.key) {
      case 'ArrowLeft':
         elementBody.classList.remove('dron__body-inertia-left');
         elementBody.classList.add('dron__body-inertia-right');
         Keys.left = false;
         setTimeout(() => {
            elementBody.classList.remove('dron__body-inertia-right');
         }, 300)
         break;
      case 'ArrowRight':
         elementBody.classList.remove('dron__body-inertia-right');
         elementBody.classList.add('dron__body-inertia-left');
         Keys.right = false;
         setTimeout(() => {
            elementBody.classList.remove('dron__body-inertia-left');
         }, 300)
         break;
      case 'ArrowUp':
         elementBody.classList.remove('dron__body-inertia-top');
         elementBody.classList.add('dron__body-inertia-bottom');
         Keys.up = false;
         setTimeout(() => {
            elementBody.classList.remove('dron__body-inertia-bottom');
         }, 300)
         break;
      case 'ArrowDown':
         elementBody.classList.remove('dron__body-inertia-bottom');
         elementBody.classList.add('dron__body-inertia-top');
         Keys.down = false;
         setTimeout(() => {
            elementBody.classList.remove('dron__body-inertia-top');
         }, 300)
         break;
   }
});