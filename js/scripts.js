window.addEventListener('load', loaded);
window.onresize = resize;

import { particles } from './particles.js';
import { form } from './form.js';

let nameBreak = false;
let bottomStick = false;
let defaultTheme = true;
let particleColor = '#d4d4dc';
let lightMode = localStorage.getItem('lightMode');

// function that runs every time the window is resized
function resize() {
    // add a <br> tag to #name when a certain window width is reached
    if (window.innerWidth < 700 && !nameBreak && document.getElementById('name')) {
        nameBreak = true;
        let updatedInnerHtml = document.getElementById('name').innerHTML.replace(' ', '<br>');
        document.getElementById('name').innerHTML = updatedInnerHtml;
    } else if (window.innerWidth >= 700 && nameBreak && document.getElementById('name')) {
        nameBreak = false;
        let updatedInnerHtml = document.getElementById('name').innerHTML.replace('<br>', ' ');
        document.getElementById('name').innerHTML = updatedInnerHtml;
    }
    // add .bottom-stick to #bottom-nav when a certain height is reached
    // add .home-space to #home-content when a certain height is reached
    if (((window.innerHeight > 699 && !document.getElementById('contact-form')) || (document.getElementById('contact-form') && window.innerHeight > 1015)) && !bottomStick && window.location.pathname.indexOf('projects') === -1) {
        bottomStick = true;
        document.getElementById('bottom-nav').classList.toggle('bottom-stick');
        if (document.getElementById('home-content')) {
            document.getElementById('home-content').classList.toggle('home-space');
        }
    } else if (((window.innerHeight <= 699 && !document.getElementById('contact-form')) || (document.getElementById('contact-form') && window.innerHeight <= 1015)) && bottomStick && window.location.pathname.indexOf('projects') === -1) {
        bottomStick = false;
        document.getElementById('bottom-nav').classList.toggle('bottom-stick');
        if (document.getElementById('home-content')) {
            document.getElementById('home-content').classList.toggle('home-space');
        }
    }
}

// function that is ran when the body is loaded
function loaded() {
    document.getElementById('loader').classList.add('fade-out');
    document.getElementById('spinner').classList.add('hide');
}

// toggles the theme
function toggleTheme() {
    const theme = ['.dark-mode', '.light-mode'];
    const particleOptions = ['#1d1e22', '#d4d4dc'];
    defaultTheme = !defaultTheme;
    particleColor = particleOptions[defaultTheme ? 1 : 0];
    particles(particleColor);
    localStorage.setItem('lightMode', defaultTheme === false);
    document.querySelectorAll(theme[defaultTheme ? 1 : 0]).forEach(value => {
        value.classList.toggle('dark-mode')
        value.classList.toggle('light-mode')
    })
    // add class(es) to elements with the special class when light mode is activated
    let elements = Array.from(document.getElementsByClassName('special'));
    elements.forEach(element => {
        element.classList.toggle('special-color');
    })
}

// change to light mode if variable in localstorage is 'true'
if (lightMode === 'true') toggleTheme()

// event listener for when the dark mode button is pressed
document.getElementById('dark-mode').addEventListener('click', () => toggleTheme());

// run once on start and every time the window size is changed
resize();

// load particles
particles(particleColor)

// load form
if (window.location.pathname.indexOf('contact') !== -1) form()

