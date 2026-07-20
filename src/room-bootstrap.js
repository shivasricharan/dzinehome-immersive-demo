const references = [
  ['https://dzinehome.in/wp-content/uploads/2024/09/7.png', 'Living room reference from 212 NSL Residence', 'Living · layered timber and terracotta'],
  ['https://dzinehome.in/wp-content/uploads/2024/09/6.png', 'Dining reference from 212 NSL Residence', 'Dining · warm material rhythm'],
  ['https://dzinehome.in/wp-content/uploads/2024/09/8.png', 'Interior reference from 212 NSL Residence', 'Details · crafted for daily life'],
  ['https://dzinehome.in/wp-content/uploads/2024/09/9.png', 'Warm modern interior from 212 NSL Residence', 'Transition · light, texture and flow'],
  ['https://dzinehome.in/wp-content/uploads/2024/09/36.png', 'Private space from 212 NSL Residence', 'Private spaces · calm and grounded'],
  ['https://dzinehome.in/wp-content/uploads/2024/11/104.png', 'Project detail from 212 NSL Residence', 'Material story · a closer look']
];

const roomMarkup = `
  <section class="room-experience" id="room-experience" aria-labelledby="room-title">
    <div class="room-shell">
      <div class="room-stage" id="room-stage" data-testid="project-room" aria-label="Interactive stylized 3D interpretation of the 212 NSL Residence. Drag to look around.">
        <div class="room-loader"><span>Preparing the residence</span><i></i></div>
        <div class="room-fallback">
          <div><span>212 NSL Residence</span><p>A cinematic project preview is shown on this device. The interactive 3D study is available on WebGL-capable browsers.</p></div>
        </div>
        <div class="room-tour" aria-label="Guided tour progress"><span>Guided tour</span><b id="tour-count">01 / 03</b><i><em id="tour-progress"></em></i></div>
        <div class="room-hint" aria-hidden="true"><span class="room-hint-icon">↔</span>Drag to look around</div>
        <a class="room-photo-button" href="#project-photography" data-jump-project-photos>Explore real project <span aria-hidden="true">↓</span></a>
      </div>

      <aside class="room-panel">
        <div class="room-panel-copy">
          <h2 id="room-title">Explore the <em>212 NSL Residence.</em></h2>
          <p>A stylized 3D interpretation inspired by Dzinehome portfolio imagery — not an exact architectural replica.</p>
          <ul class="room-meta" aria-label="Project details">
            <li>Modern Earthy</li><li>Hyderabad</li><li>Interactive study</li>
          </ul>
        </div>

        <div class="room-controls">
          <div class="room-control-group">
            <span class="room-control-label">Viewpoints</span>
            <div class="viewpoint-list" role="group" aria-label="Choose a guided viewpoint">
              <button class="viewpoint active" type="button" data-view="living"><span>01</span><strong>Living</strong><small>Current view</small></button>
              <button class="viewpoint" type="button" data-view="dining"><span>02</span><strong>Dining</strong><small>View →</small></button>
              <button class="viewpoint" type="button" data-view="material"><span>03</span><strong>Material story</strong><small>View →</small></button>
            </div>
          </div>
          <div class="room-control-group lighting-group">
            <span class="room-control-label">Lighting</span>
            <div class="room-control-row" role="group" aria-label="Choose room lighting">
              <button class="room-control active" type="button" data-room-light="day">☼&nbsp; Daylight</button>
              <button class="room-control" type="button" data-room-light="evening">☾&nbsp; Evening</button>
            </div>
          </div>
          <p class="room-status" id="room-status" aria-live="polite">Living room · layered timber, linen and warm terracotta.</p>
          <a class="room-cta" href="#consultation" data-open-consultation>Discuss your home <span aria-hidden="true">→</span></a>
        </div>
      </aside>

      <div class="room-reference" id="project-photography">
        <div class="reference-intro">
          <span>Real project photography</span>
          <h3>Walk through the completed residence.</h3>
          <p>The 3D scene above is a stylized interpretation. These photographs show Dzinehome’s completed 212 NSL Residence.</p>
        </div>
        <div class="reference-viewer">
          <button class="reference-main" type="button" data-expand-project-photo aria-label="Expand selected project photograph">
            <img id="reference-main-image" src="${references[0][0]}" alt="${references[0][1]}">
            <span>Open full screen ↗</span>
          </button>
          <div class="reference-caption"><strong id="reference-caption">${references[0][2]}</strong><b id="reference-count">01 / 06</b></div>
          <div class="reference-filmstrip" aria-label="Choose a project photograph">
            ${references.map(([src, alt], index) => `<button class="${index === 0 ? 'active' : ''}" type="button" data-select-project-photo="${index}" aria-label="Show ${alt}" aria-pressed="${index === 0}"><img src="${src}" alt="" loading="${index < 3 ? 'eager' : 'lazy'}"><span>0${index + 1}</span></button>`).join('')}
          </div>
          <div class="reference-actions"><button type="button" data-reference-direction="previous" aria-label="Previous project photograph">← Previous</button><button type="button" data-reference-direction="next" aria-label="Next project photograph">Next →</button></div>
        </div>
      </div>
    </div>
    <dialog class="project-lightbox" id="project-lightbox" aria-labelledby="lightbox-title">
      <button class="lightbox-close" type="button" aria-label="Close project photos">×</button>
      <div class="lightbox-media"><img id="lightbox-image" src="${references[0][0]}" alt="${references[0][1]}"></div>
      <div class="lightbox-caption"><div><span>212 NSL Residence</span><strong id="lightbox-title">Real project reference</strong></div><b id="lightbox-count">01 / 03</b><div class="lightbox-nav"><button type="button" data-lightbox-direction="previous" aria-label="Previous photo">←</button><button type="button" data-lightbox-direction="next" aria-label="Next photo">→</button></div></div>
    </dialog>
  </section>
`;

const existingStory = document.querySelector('.project-story');
if (existingStory) {
  existingStory.insertAdjacentHTML('beforebegin', roomMarkup);
  existingStory.remove();

  const stage = document.querySelector('#room-stage');
  const loader = stage?.querySelector('.room-loader');
  const fallback = stage?.querySelector('.room-fallback');
  const lightbox = document.querySelector('#project-lightbox');
  const lightboxImage = document.querySelector('#lightbox-image');
  const lightboxCount = document.querySelector('#lightbox-count');
  const referenceMainImage = document.querySelector('#reference-main-image');
  const referenceCaption = document.querySelector('#reference-caption');
  const referenceCount = document.querySelector('#reference-count');
  let activePhoto = 0;
  let started = false;

  const showPhoto = (index) => {
    activePhoto = (index + references.length) % references.length;
    const [src, alt, caption] = references[activePhoto];
    referenceMainImage.src = src;
    referenceMainImage.alt = alt;
    referenceCaption.textContent = caption;
    referenceCount.textContent = `0${activePhoto + 1} / 0${references.length}`;
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightboxCount.textContent = `0${activePhoto + 1} / 0${references.length}`;
    document.querySelectorAll('[data-select-project-photo]').forEach((button) => {
      const active = Number(button.dataset.selectProjectPhoto) === activePhoto;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  };

  document.querySelectorAll('[data-select-project-photo]').forEach((button) => button.addEventListener('click', () => {
    showPhoto(Number(button.dataset.selectProjectPhoto));
  }));
  document.querySelector('[data-expand-project-photo]')?.addEventListener('click', () => lightbox?.showModal());
  document.querySelectorAll('[data-reference-direction]').forEach((button) => button.addEventListener('click', () => {
    showPhoto(activePhoto + (button.dataset.referenceDirection === 'next' ? 1 : -1));
  }));
  document.querySelectorAll('[data-lightbox-direction]').forEach((button) => button.addEventListener('click', () => {
    showPhoto(activePhoto + (button.dataset.lightboxDirection === 'next' ? 1 : -1));
  }));
  document.querySelector('.lightbox-close')?.addEventListener('click', () => lightbox?.close());
  lightbox?.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });
  document.querySelector('[data-jump-project-photos]')?.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('#project-photography')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  const startRoom = async () => {
    if (started) return;
    started = true;
    try {
      const { initRoomExperience } = await import('./room3d.js');
      initRoomExperience();
    } catch (error) {
      console.warn('Interactive room unavailable; showing project preview.', error);
      fallback?.classList.add('visible');
      loader?.classList.add('ready');
    }
  };

  const preload = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    preload.disconnect();
    startRoom();
  }, { rootMargin: '1800px 0px' });

  if (stage) preload.observe(stage);
}
