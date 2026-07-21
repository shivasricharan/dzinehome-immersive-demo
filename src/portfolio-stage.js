import './portfolio-stage.css';

const projects = [
  {
    title: '212 NSL Residence',
    type: 'Apartment',
    mood: 'Modern Earthy',
    location: 'Hyderabad',
    image: 'https://dzinehome.in/wp-content/uploads/2024/09/7.png',
    href: 'https://dzinehome.in/portfolio/212-nsl-residence/',
    statement: 'Raw brick, warm timber and layered greens create a home that feels grounded and deeply personal.'
  },
  {
    title: 'Warangal Villa',
    type: 'Villa',
    mood: 'Modern Luxury',
    location: 'Warangal',
    image: 'https://dzinehome.in/wp-content/uploads/2024/09/76.png',
    href: 'https://dzinehome.in/portfolio/warangal-villa/',
    statement: 'A large-format residence shaped through proportion, light and seamless transitions.'
  },
  {
    title: '2412 Bollineni Bion',
    type: 'Apartment',
    mood: 'Warm & Woody',
    location: 'Hyderabad',
    image: 'https://dzinehome.in/wp-content/uploads/2024/08/17.jpg',
    href: 'https://dzinehome.in/portfolio/2412-bollineni-bion-residence/',
    statement: 'A refined material palette turns everyday movement into a composed, comfortable experience.'
  },
  {
    title: '2906 My Home Tridasa',
    type: 'Apartment',
    mood: 'Contemporary',
    location: 'Hyderabad',
    image: 'https://dzinehome.in/wp-content/uploads/2024/11/105.png',
    href: 'https://dzinehome.in/portfolio/2906-my-home-tridasa/',
    statement: 'Clean lines, crafted storage and calm colour create clarity without losing character.'
  },
  {
    title: '101 Orange Aurtha',
    type: 'Apartment',
    mood: 'Personal Expression',
    location: 'Hyderabad',
    image: 'https://dzinehome.in/wp-content/uploads/2024/11/145.png',
    href: 'https://dzinehome.in/portfolio/101-orange-aurtha-residence/',
    statement: 'A home built around individual expression, tactile detail and practical everyday rhythm.'
  },
  {
    title: 'Aultra Paints',
    type: 'Office',
    mood: 'Commercial',
    location: 'Hyderabad',
    image: 'https://dzinehome.in/wp-content/uploads/2024/08/84-720x720.jpg',
    href: 'https://dzinehome.in/our-portfolio/',
    statement: 'A workplace environment designed to support focus, collaboration and a confident brand presence.'
  }
];

const filters = ['All', 'Apartment', 'Villa', 'Office'];

function mountPortfolioStage() {
  const anchor = document.querySelector('#project-overview');
  if (!anchor || document.querySelector('#portfolio-stage')) return false;

  const section = document.createElement('section');
  section.id = 'portfolio-stage';
  section.className = 'portfolio-stage';
  section.innerHTML = `
    <div class="portfolio-stage__intro">
      <div>
        <span class="portfolio-stage__number">200+</span>
        <span class="portfolio-stage__number-label">projects and concepts</span>
      </div>
      <div class="portfolio-stage__headline">
        <p>Selected portfolio</p>
        <h2>Not a gallery.<br><em>A living archive of spaces.</em></h2>
      </div>
      <p class="portfolio-stage__intro-copy">Explore Dzinehome by the kind of space you are planning. Every project becomes a doorway into a different way of living, working and feeling at home.</p>
    </div>

    <div class="portfolio-stage__filters" role="tablist" aria-label="Filter portfolio projects">
      ${filters.map((filter, index) => `<button type="button" class="portfolio-filter ${index === 0 ? 'active' : ''}" data-filter="${filter}" role="tab" aria-selected="${index === 0}">${filter}</button>`).join('')}
    </div>

    <div class="portfolio-stage__viewer">
      <div class="portfolio-stage__media">
        <img id="portfolio-feature-image" src="${projects[0].image}" alt="${projects[0].title} interior by Dzinehome">
        <div class="portfolio-stage__media-shade"></div>
        <div class="portfolio-stage__counter"><span id="portfolio-current">01</span><i></i><span id="portfolio-total">0${projects.length}</span></div>
        <div class="portfolio-stage__gesture">Drag or swipe to explore</div>
      </div>

      <div class="portfolio-stage__details" aria-live="polite">
        <div class="portfolio-stage__meta"><span id="portfolio-type">${projects[0].type}</span><span id="portfolio-location">${projects[0].location}</span></div>
        <h3 id="portfolio-title">${projects[0].title}</h3>
        <p id="portfolio-mood">${projects[0].mood}</p>
        <p id="portfolio-statement">${projects[0].statement}</p>
        <div class="portfolio-stage__actions">
          <a id="portfolio-link" href="${projects[0].href}" target="_blank" rel="noreferrer">Enter project <span>↗</span></a>
          <button type="button" data-open-consultation>Start with this direction <span>→</span></button>
        </div>
      </div>
    </div>

    <div class="portfolio-stage__rail" aria-label="Choose a featured project"></div>

    <div class="portfolio-stage__proof">
      <div><strong>40+</strong><span>specialists across design and execution</span></div>
      <div><strong>10 years</strong><span>warranty commitment on materials and fittings</span></div>
      <div><strong>6–8 weeks</strong><span>stated journey from design clarity to delivery</span></div>
      <div><strong>One team</strong><span>interiors, architecture and construction</span></div>
    </div>
  `;

  anchor.before(section);

  const rail = section.querySelector('.portfolio-stage__rail');
  const featureImage = section.querySelector('#portfolio-feature-image');
  const title = section.querySelector('#portfolio-title');
  const type = section.querySelector('#portfolio-type');
  const location = section.querySelector('#portfolio-location');
  const mood = section.querySelector('#portfolio-mood');
  const statement = section.querySelector('#portfolio-statement');
  const link = section.querySelector('#portfolio-link');
  const current = section.querySelector('#portfolio-current');
  let filteredProjects = [...projects];
  let activeIndex = 0;
  let startX = null;

  const renderRail = () => {
    rail.innerHTML = filteredProjects.map((project, index) => `
      <button type="button" class="portfolio-thumb ${index === activeIndex ? 'active' : ''}" data-project-index="${index}" aria-label="View ${project.title}" aria-pressed="${index === activeIndex}">
        <img src="${project.image}" alt="" loading="${index < 3 ? 'eager' : 'lazy'}">
        <span>0${index + 1}</span>
        <strong>${project.title}</strong>
      </button>
    `).join('');
  };

  const showProject = (index, direction = 1) => {
    if (!filteredProjects.length) return;
    activeIndex = (index + filteredProjects.length) % filteredProjects.length;
    const project = filteredProjects[activeIndex];

    featureImage.animate([
      { opacity: 1, transform: 'scale(1.02) translateX(0)' },
      { opacity: 0, transform: `scale(1.05) translateX(${-18 * direction}px)` }
    ], { duration: 260, easing: 'ease-in', fill: 'forwards' }).finished.then(() => {
      featureImage.src = project.image;
      featureImage.alt = `${project.title} interior by Dzinehome`;
      featureImage.animate([
        { opacity: 0, transform: `scale(1.06) translateX(${20 * direction}px)` },
        { opacity: 1, transform: 'scale(1.02) translateX(0)' }
      ], { duration: 720, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'forwards' });
    });

    [title, type, location, mood, statement].forEach((element) => {
      element.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 520, delay: 110, easing: 'ease-out' });
    });

    title.textContent = project.title;
    type.textContent = project.type;
    location.textContent = project.location;
    mood.textContent = project.mood;
    statement.textContent = project.statement;
    link.href = project.href;
    current.textContent = String(activeIndex + 1).padStart(2, '0');
    section.querySelector('#portfolio-total').textContent = String(filteredProjects.length).padStart(2, '0');
    renderRail();
  };

  renderRail();

  section.addEventListener('click', (event) => {
    const thumb = event.target.closest('[data-project-index]');
    if (thumb) showProject(Number(thumb.dataset.projectIndex), Number(thumb.dataset.projectIndex) >= activeIndex ? 1 : -1);

    const filter = event.target.closest('[data-filter]');
    if (filter) {
      section.querySelectorAll('.portfolio-filter').forEach((button) => {
        const active = button === filter;
        button.classList.toggle('active', active);
        button.setAttribute('aria-selected', String(active));
      });
      filteredProjects = filter.dataset.filter === 'All' ? [...projects] : projects.filter((project) => project.type === filter.dataset.filter);
      activeIndex = 0;
      showProject(0);
    }
  });

  const media = section.querySelector('.portfolio-stage__media');
  media.addEventListener('pointerdown', (event) => { startX = event.clientX; media.setPointerCapture?.(event.pointerId); });
  media.addEventListener('pointerup', (event) => {
    if (startX === null) return;
    const delta = event.clientX - startX;
    if (Math.abs(delta) > 42) showProject(activeIndex + (delta < 0 ? 1 : -1), delta < 0 ? 1 : -1);
    startX = null;
  });

  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    section.classList.add('is-visible');
    observer.disconnect();
  }, { threshold: 0.12 });
  observer.observe(section);

  return true;
}

function boot() {
  if (mountPortfolioStage()) return;
  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    if (mountPortfolioStage() || attempts > 30) window.clearInterval(timer);
  }, 100);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
