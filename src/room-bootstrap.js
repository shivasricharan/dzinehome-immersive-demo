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
          <a class="room-cta" href="#consultation">Discuss your home <span aria-hidden="true">→</span></a>
        </div>
      </aside>

      <div class="room-reference">
        <div class="reference-note"><span>Reference imagery</span><p>From the 212 NSL Residence project</p></div>
        <div class="reference-filmstrip">
          ${references.map(([src, alt]) => `<figure><img src="${src}" alt="${alt}" loading="lazy"></figure>`).join('')}
        </div>
      </div>
    </div>
  </section>
`;

const existingStory = document.querySelector('.project-story');
if (existingStory) {
  existingStory.insertAdjacentHTML('beforebegin', roomMarkup);
  existingStory.remove();

  const stage = document.querySelector('#room-stage');
  const loader = stage?.querySelector('.room-loader');
  const fallback = stage?.querySelector('.room-fallback');
  let started = false;

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
  }, { rootMargin: '700px 0px' });

  if (stage) preload.observe(stage);
}
