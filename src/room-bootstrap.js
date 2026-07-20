const references = [
  ['https://dzinehome.in/wp-content/uploads/2024/09/7-720x720.png', 'Living room reference from 212 NSL Residence'],
  ['https://dzinehome.in/wp-content/uploads/2024/09/6-720x720.png', 'Interior reference from 212 NSL Residence'],
  ['https://dzinehome.in/wp-content/uploads/2024/09/8-720x720.png', 'Material reference from 212 NSL Residence']
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
        <button class="room-photo-button" type="button" data-project-photo="0">View project photos <span aria-hidden="true">↗</span></button>
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

      <div class="room-reference">
        <div class="reference-note"><span>Reference imagery</span><p>From the 212 NSL Residence project</p></div>
        <div class="reference-filmstrip">
          ${references.map(([src, alt], index) => `<button type="button" data-project-photo="${index}" aria-label="Open ${alt}"><img src="${src}" alt="${alt}" loading="lazy"><span>Reference</span></button>`).join('')}
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
  let activePhoto = 0;
  let started = false;

  const showPhoto = (index) => {
    activePhoto = (index + references.length) % references.length;
    const [src, alt] = references[activePhoto];
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightboxCount.textContent = `0${activePhoto + 1} / 0${references.length}`;
  };

  document.querySelectorAll('[data-project-photo]').forEach((button) => button.addEventListener('click', () => {
    showPhoto(Number(button.dataset.projectPhoto));
    lightbox?.showModal();
  }));
  document.querySelectorAll('[data-lightbox-direction]').forEach((button) => button.addEventListener('click', () => {
    showPhoto(activePhoto + (button.dataset.lightboxDirection === 'next' ? 1 : -1));
  }));
  document.querySelector('.lightbox-close')?.addEventListener('click', () => lightbox?.close());
  lightbox?.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });

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
