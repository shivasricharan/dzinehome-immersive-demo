import './styles.css';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = {
  hero: 'https://dzinehome.in/wp-content/uploads/2024/07/DZH_slider1.jpg',
  dark: 'https://dzinehome.in/wp-content/uploads/2020/05/slider2-home1-1-1536x760.jpg',
  bedroom: 'https://dzinehome.in/wp-content/uploads/2020/05/slider3-home1-1-1536x760.jpg',
  nsl1: 'https://dzinehome.in/wp-content/uploads/2024/09/7-720x720.png',
  nsl2: 'https://dzinehome.in/wp-content/uploads/2024/09/6-720x720.png',
  nsl3: 'https://dzinehome.in/wp-content/uploads/2024/09/8-720x720.png',
  nsl4: 'https://dzinehome.in/wp-content/uploads/2024/09/9-720x720.png',
  bion1: 'https://dzinehome.in/wp-content/uploads/2024/08/84-720x720.jpg',
  bion2: 'https://dzinehome.in/wp-content/uploads/2024/08/86-720x720.jpg',
  villa1: 'https://dzinehome.in/wp-content/uploads/2024/09/76.png',
  villa2: 'https://dzinehome.in/wp-content/uploads/2024/09/67.png'
};

const styleOptions = {
  contemporary: {
    label: 'Contemporary',
    title: 'Quiet confidence, shaped in clean lines.',
    description: 'A measured palette, open planning and sculptural details create a home that feels composed without feeling cold.',
    image: images.hero
  },
  earthy: {
    label: 'Modern Earthy',
    title: 'Natural textures. A softer way to live.',
    description: 'Wood, warm neutrals, plantation details and tactile surfaces bring calm, depth and an easy connection to nature.',
    image: images.nsl1
  },
  elegant: {
    label: 'Elegant',
    title: 'Refined spaces made for everyday life.',
    description: 'Thoughtful lighting, crafted furniture and rich finishes balance comfort with a distinctly elevated character.',
    image: images.bion1
  },
  villa: {
    label: 'Modern Villa',
    title: 'Scale, flow and detail in perfect rhythm.',
    description: 'Large-format spaces are made intimate through proportion, material transitions and carefully layered moments.',
    image: images.villa1
  }
};

const app = document.querySelector('#app');

app.innerHTML = `
  <div class="noise" aria-hidden="true"></div>
  <header class="site-header">
    <a class="brand" href="#top" aria-label="Dzinehome home">
      <span class="brand-mark">D</span>
      <span>Dzinehome</span>
    </a>
    <nav class="desktop-nav" aria-label="Primary navigation">
      <a href="#experience">Experience</a>
      <a href="#projects">Projects</a>
      <a href="#process">Process</a>
    </nav>
    <a class="header-cta" href="#consultation">Start your home</a>
  </header>

  <main>
    <section id="top" class="hero section-dark">
      <div class="hero-media" aria-hidden="true">
        <img src="${images.hero}" alt="" />
        <div class="hero-shade"></div>
      </div>
      <div class="hero-copy">
        <p class="hero-overline">INTERIORS · ARCHITECTURE · CONSTRUCTION</p>
        <h1>Don’t just imagine your home.<br><em>Experience it.</em></h1>
        <p class="hero-intro">Spaces designed around the way you live, brought to life with clarity, craft and care.</p>
        <a class="primary-button" href="#experience">Begin the experience <span aria-hidden="true">↘</span></a>
      </div>
      <div class="scroll-cue" aria-hidden="true"><span></span>Scroll to explore</div>
    </section>

    <section id="experience" class="manifesto section-light">
      <div class="manifesto-number">01</div>
      <div class="manifesto-copy reveal">
        <p class="section-label">A home, before it becomes one</p>
        <h2>Every space begins as a possibility.</h2>
        <p>We look beyond rooms and measurements. We listen to routines, aspirations and the feeling you want to come home to.</p>
      </div>
      <div class="manifesto-word" aria-hidden="true">LIVE</div>
    </section>

    <section class="cinematic-panel section-dark">
      <div class="cinematic-image parallax-image">
        <img src="${images.dark}" alt="A refined dining and kitchen interior by Dzinehome" />
      </div>
      <div class="cinematic-copy reveal">
        <p class="section-label">Composition over decoration</p>
        <h2>Light, material and movement — designed as one.</h2>
        <p>A considered interior does more than look beautiful. It guides how a space feels from morning to night.</p>
      </div>
    </section>

    <section class="style-explorer section-warm">
      <div class="style-intro reveal">
        <p class="section-label">Choose your atmosphere</p>
        <h2>What should your home feel like?</h2>
        <p>Explore a direction. The future experience can learn what you respond to before the first conversation begins.</p>
      </div>
      <div class="style-stage">
        <div class="style-image-wrap">
          <img id="style-image" src="${styleOptions.contemporary.image}" alt="Contemporary Dzinehome interior" />
          <div class="style-index">02</div>
        </div>
        <div class="style-content">
          <div class="style-tabs" role="tablist" aria-label="Interior style selector">
            ${Object.entries(styleOptions).map(([key, value], index) => `
              <button class="style-tab ${index === 0 ? 'active' : ''}" type="button" data-style="${key}" role="tab" aria-selected="${index === 0}">${value.label}</button>
            `).join('')}
          </div>
          <div class="style-copy" aria-live="polite">
            <h3 id="style-title">${styleOptions.contemporary.title}</h3>
            <p id="style-description">${styleOptions.contemporary.description}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="project-overview" class="project-story section-light">
      <div class="project-heading reveal">
        <div>
          <p class="section-label">Selected residence</p>
          <h2>212 NSL Residence</h2>
        </div>
        <div class="project-meta">
          <span>Modern–Earthy</span>
          <span>Interior Design</span>
          <span>Hyderabad</span>
        </div>
      </div>
      <div class="project-lead">
        <img src="${images.nsl1}" alt="Warm earthy living room from 212 NSL Residence" />
        <div class="project-note reveal">
          <span>01 / 04</span>
          <p>Raw textures, wood and muted earth tones create a home that feels grounded, warm and unmistakably personal.</p>
        </div>
      </div>
      <div class="project-grid">
        <figure class="project-tile tall"><img src="${images.nsl2}" alt="Earthy interior detail from 212 NSL Residence" /></figure>
        <figure class="project-tile"><img src="${images.nsl3}" alt="Interior space from 212 NSL Residence" /></figure>
        <figure class="project-tile"><img src="${images.nsl4}" alt="Warm modern interior from 212 NSL Residence" /></figure>
      </div>
    </section>

    <section id="projects" class="horizontal-showcase section-dark" aria-labelledby="showcase-title">
      <div class="showcase-controls" aria-label="Project gallery controls">
        <button type="button" data-gallery-direction="previous" aria-label="Previous project">←</button>
        <span>Explore projects</span>
        <button type="button" data-gallery-direction="next" aria-label="Next project">→</button>
      </div>
      <div class="horizontal-track">
        <article class="showcase-intro">
          <p class="section-label">More than one way to live</p>
          <h2 id="showcase-title">Different homes.<br>One standard of care.</h2>
          <p>From refined apartments to expansive villas, each project begins with the people who will live there.</p>
        </article>
        <article class="showcase-card">
          <img src="${images.bion1}" alt="Elegant Bollineni Bion residence interior" />
          <div><span>Elegant</span><h3>210 Bollineni Bion Residence</h3></div>
        </article>
        <article class="showcase-card">
          <img src="${images.bion2}" alt="Bollineni Bion interior detail" />
          <div><span>Crafted detail</span><h3>A harmony of comfort and luxury</h3></div>
        </article>
        <article class="showcase-card wide">
          <img src="${images.villa1}" alt="Modern Warangal villa interior" />
          <div><span>Modern Villa</span><h3>Warangal Villa</h3></div>
        </article>
      </div>
    </section>

    <section class="rest-section section-light">
      <div class="rest-media parallax-image"><img src="${images.bedroom}" alt="Calm modern bedroom interior" /></div>
      <div class="rest-copy reveal">
        <p class="section-label">The spaces between moments</p>
        <h2>A home should hold your pace — and your pause.</h2>
        <p>Bedrooms, private corners and quiet transitions are shaped with the same attention as the spaces everyone sees.</p>
      </div>
    </section>

    <section id="process" class="process-section section-warm">
      <div class="process-heading reveal">
        <p class="section-label">The 5D process</p>
        <h2>From first thought to first day at home.</h2>
      </div>
      <div class="process-list">
        ${[
          ['01', 'Discover', 'We understand your space, routines, priorities and aspirations.'],
          ['02', 'Decide', 'We align on direction, scope and the experience your home should create.'],
          ['03', 'Develop', 'Plans, materials and visualisations bring every decision into focus.'],
          ['04', 'Deploy', 'Execution moves on site with coordination, precision and clear progress.'],
          ['05', 'Deliver', 'Your finished space is handed over, ready for a new chapter to begin.']
        ].map(([number, title, copy]) => `
          <article class="process-item">
            <span>${number}</span>
            <h3>${title}</h3>
            <p>${copy}</p>
          </article>
        `).join('')}
      </div>
    </section>

    <section id="consultation" class="consultation section-dark">
      <div class="consultation-media"><img src="${images.villa2}" alt="Dzinehome villa interior" /></div>
      <div class="consultation-panel reveal">
        <p class="section-label">Your home story starts here</p>
        <h2>Tell us what you are imagining.</h2>
        <p>Share a few details and create a useful starting brief for the first design conversation.</p>
        <form class="consultation-form" id="consultation-form">
          <label><span>Your name</span><input name="name" autocomplete="name" required placeholder="Name"></label>
          <label><span>Phone number</span><input name="phone" autocomplete="tel" inputmode="tel" required placeholder="Phone"></label>
          <label><span>Property type</span><select name="property" required><option value="">Choose one</option><option>Apartment</option><option>Villa</option><option>Office</option></select></label>
          <label><span>Preferred timeline</span><select name="timeline" required><option value="">Choose one</option><option>Within 3 months</option><option>3–6 months</option><option>6–12 months</option><option>Exploring</option></select></label>
          <button class="primary-button light" type="submit">Create my home brief <span aria-hidden="true">→</span></button>
        </form>
        <div class="form-success" id="form-success" role="status" aria-live="polite" hidden>
          <strong>Your starting brief is ready.</strong>
          <p id="brief-summary"></p>
          <a href="https://dzinehome.in/contact-us/" target="_blank" rel="noreferrer">Continue to Dzinehome contact <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="footer-brand">Dzinehome</div>
    <p>Interiors · Architecture · Construction</p>
    <div class="footer-links">
      <a href="https://dzinehome.in/portfolio/" target="_blank" rel="noreferrer">Portfolio</a>
      <a href="https://dzinehome.in/our-process/" target="_blank" rel="noreferrer">Process</a>
      <a href="https://dzinehome.in/contact-us/" target="_blank" rel="noreferrer">Contact</a>
    </div>
    <small>Immersive concept experience by Fameboat · Images and project references from Dzinehome</small>
  </footer>
`;

const lenis = new Lenis({
  duration: 1.15,
  smoothWheel: true,
  wheelMultiplier: 0.9
});

const syncHashPosition = () => {
  if (!window.location.hash || !document.querySelector(window.location.hash)) return;
  lenis.scrollTo(window.location.hash, { immediate: true, offset: -64 });
};
window.addEventListener('hashchange', syncHashPosition);
window.requestAnimationFrame(syncHashPosition);

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

const header = document.querySelector('.site-header');
let previousScroll = 0;
lenis.on('scroll', ({ scroll }) => {
  header.classList.toggle('scrolled', scroll > 40);
  header.classList.toggle('hidden', scroll > previousScroll && scroll > 420);
  previousScroll = scroll;
});

gsap.from('.hero-copy > *', {
  y: 34,
  opacity: 0,
  duration: 1.15,
  stagger: 0.13,
  ease: 'power3.out',
  delay: 0.25
});

gsap.to('.hero-media img', {
  scale: 1.12,
  yPercent: 7,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});

gsap.utils.toArray('.reveal').forEach((element) => {
  gsap.from(element, {
    y: 56,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 84%',
      once: true
    }
  });
});

gsap.utils.toArray('.parallax-image img').forEach((image) => {
  gsap.fromTo(image, { yPercent: -7, scale: 1.08 }, {
    yPercent: 7,
    ease: 'none',
    scrollTrigger: {
      trigger: image.parentElement,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
});

gsap.from('.project-tile', {
  y: 70,
  opacity: 0,
  stagger: 0.15,
  duration: 1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.project-grid',
    start: 'top 80%',
    once: true
  }
});

const horizontalTrack = document.querySelector('.horizontal-track');
document.querySelectorAll('[data-gallery-direction]').forEach((button) => {
  button.addEventListener('click', () => {
    const direction = button.dataset.galleryDirection === 'next' ? 1 : -1;
    horizontalTrack.scrollBy({ left: direction * Math.min(window.innerWidth * .78, 920), behavior: 'smooth' });
  });
});

const styleImage = document.querySelector('#style-image');
const styleTitle = document.querySelector('#style-title');
const styleDescription = document.querySelector('#style-description');
const styleTabs = document.querySelectorAll('.style-tab');

styleTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const next = styleOptions[tab.dataset.style];
    styleTabs.forEach((button) => {
      const isActive = button === tab;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-selected', String(isActive));
    });

    gsap.to(styleImage, {
      opacity: 0,
      scale: 1.025,
      duration: 0.25,
      onComplete: () => {
        styleImage.src = next.image;
        styleImage.alt = `${next.label} Dzinehome interior`;
        styleTitle.textContent = next.title;
        styleDescription.textContent = next.description;
        gsap.fromTo(styleImage, { opacity: 0, scale: 1.025 }, { opacity: 1, scale: 1, duration: 0.65, ease: 'power2.out' });
        gsap.fromTo([styleTitle, styleDescription], { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.08 });
      }
    });
  });
});

const consultationForm = document.querySelector('#consultation-form');
const formSuccess = document.querySelector('#form-success');
consultationForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(consultationForm);
  const property = String(data.get('property')).toLowerCase();
  const article = /^[aeiou]/.test(property) ? 'an' : 'a';
  document.querySelector('#brief-summary').textContent = `${data.get('name')} is planning ${article} ${property} project with a ${String(data.get('timeline')).toLowerCase()} timeline. Dzinehome can continue this conversation with the right context.`;
  consultationForm.hidden = true;
  formSuccess.hidden = false;
});

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-open-consultation]');
  if (!trigger) return;
  event.preventDefault();
  document.querySelector('#consultation-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  window.setTimeout(() => document.querySelector('#consultation-form input')?.focus({ preventScroll: true }), 700);
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (reducedMotion.matches) {
  lenis.destroy();
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

window.addEventListener('load', () => ScrollTrigger.refresh());
