import { initRoomExperience } from './room3d.js';

const roomMarkup = `
  <section class="room-experience" id="room-experience">
    <div class="room-shell">
      <div class="room-stage" id="room-stage" aria-label="Interactive 3D Dzinehome living room. Drag to explore the room.">
        <div class="room-loader"><span>Building your room</span></div>
        <div class="room-fallback">
          <p>Your device is showing the visual fallback. Open on a WebGL-capable browser for the full interactive room.</p>
        </div>
        <button class="room-hotspot" type="button" data-hotspot="lighting" aria-label="Explore layered lighting">+</button>
        <button class="room-hotspot" type="button" data-hotspot="storage" aria-label="Explore integrated storage">+</button>
        <button class="room-hotspot" type="button" data-hotspot="comfort" aria-label="Explore comfort and circulation">+</button>
        <div class="room-hint" aria-hidden="true"><span class="room-hint-dot"></span>Drag or swipe to explore</div>
      </div>
      <div class="room-panel">
        <div class="room-panel-copy">
          <p class="section-label">A living digital showroom</p>
          <h2>Step inside the design.</h2>
          <p>Move through a spatial Dzinehome concept, shift the atmosphere and explore how materials, light and proportion change the way a room feels.</p>
        </div>
        <div>
          <div class="room-control-group">
            <span class="room-control-label">Material direction</span>
            <div class="room-control-row" role="group" aria-label="Choose room material direction">
              <button class="room-control active" type="button" data-room-material="warm">Warm</button>
              <button class="room-control" type="button" data-room-material="minimal">Soft minimal</button>
              <button class="room-control" type="button" data-room-material="luxe">Modern luxe</button>
            </div>
          </div>
          <div class="room-control-group">
            <span class="room-control-label">Lighting</span>
            <div class="room-control-row" role="group" aria-label="Choose room lighting">
              <button class="room-control active" type="button" data-room-light="day">Daylight</button>
              <button class="room-control" type="button" data-room-light="evening">Evening</button>
            </div>
          </div>
          <div class="room-status" id="room-status" aria-live="polite">Warm contemporary combines natural timber, soft upholstery and calm neutral tones.</div>
        </div>
      </div>
    </div>
  </section>
`;

const cinematic = document.querySelector('.cinematic-panel');
if (cinematic) {
  cinematic.insertAdjacentHTML('afterend', roomMarkup);
  initRoomExperience();
}
