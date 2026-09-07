(function () {
'use strict';

/* ================================
ELEMENTS
================================ */

const nav = document.getElementById('templatemo-nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('.parallax-section');
const parallaxBgs = document.querySelectorAll('.parallax-bg');
const revealElements = document.querySelectorAll('.section-content');


/* ================================
SMOOTH SCROLL
================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


/* ================================
SUPER SMOOTH PARALLAX
================================ */

let ticking = false;

function updateParallax() {

    if (window.innerWidth <= 768) {
        parallaxBgs.forEach(bg => {
            bg.style.transform = '';
        });
        ticking = false;
        return;
    }

    const scrollTop = window.pageYOffset;

    parallaxBgs.forEach(bg => {

        const section = bg.parentElement;
        const speed = parseFloat(bg.dataset.speed) || 0.5;

        const offset = (scrollTop - section.offsetTop) * speed;

        bg.style.transform = `translate3d(0, ${offset}px, 0)`;
    });

    ticking = false;
}

function onScroll() {

    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener("scroll", onScroll, { passive: true });


/* ================================
NAVBAR BLUR EFFECT
================================ */

function handleNavScroll() {

    if (window.scrollY > 50) {

        nav.classList.add("scrolled", "nav-blur");

    } else {

        nav.classList.remove("scrolled", "nav-blur");

    }
}

window.addEventListener("scroll", handleNavScroll, { passive: true });


/* ================================
ACTIVE LINK UPDATE
================================ */

function updateActiveLink() {

    const scrollPos = window.scrollY + window.innerHeight / 3;

    sections.forEach(section => {

        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.id;

        if (scrollPos >= top && scrollPos < top + height) {

            navItems.forEach(link => {

                link.classList.remove("active");

                if (link.getAttribute("href") === "#" + id) {

                    link.classList.add("active");

                }

            });

        }

    });
}

window.addEventListener("scroll", updateActiveLink, { passive: true });


/* ================================
SCROLL REVEAL ANIMATION
================================ */

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("visible");

        }

    });

},{
    threshold:0.2
});

revealElements.forEach(el=>{
    el.classList.add("reveal");
    observer.observe(el);
});


/* ================================
MOBILE MENU
================================ */

if (navToggle && navLinks) {
    navToggle.addEventListener("click", ()=>{

        navToggle.classList.toggle("active");
        navLinks.classList.toggle("open");

    });

    navItems.forEach(link=>{
        link.addEventListener("click", ()=>{

            navToggle.classList.remove("active");
            navLinks.classList.remove("open");

        });
    });
}

})();
