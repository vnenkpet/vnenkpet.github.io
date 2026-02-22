<script setup lang="ts">
const milestones = [
  { year: '2019', label: 'GoodData, Politinn, Digitoo' },
  { year: '2021', label: 'Refsite' },
  { year: '2022', label: 'Tech Lead, Sakurabook, Investbay' },
  { year: '2023', label: 'Remangu, GDC' },
  { year: '2025', label: 'Deliciously Ella' },
]

function nodeStyle(i: number) {
  const n = milestones.length - 1
  const t = n === 0 ? 0 : i / n
  const left = 8 + t * 84
  const top = 12 + t * 76
  return {
    left: `${left}%`,
    top: `${top}%`,
    animationDelay: `${0.4 + i * 0.12}s`,
  }
}
</script>

<template>
  <div class="timeline-3d-scene">
    <div class="timeline-3d-camera">
      <div class="timeline-3d-track">
        <!-- SVG line from first to last node – guaranteed to connect all dots -->
        <svg class="timeline-line-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="timeline-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#a78bfa" />
              <stop offset="100%" stop-color="#6366f1" />
            </linearGradient>
          </defs>
          <line
            x1="8"
            y1="12"
            x2="92"
            y2="88"
            stroke="url(#timeline-line-grad)"
            stroke-width="3"
            stroke-linecap="round"
            fill="none"
            class="timeline-line-path"
          />
        </svg>
        <!-- Nodes with highlights along diagonal -->
        <div
          v-for="(m, i) in milestones"
          :key="m.year"
          class="timeline-node"
          :style="nodeStyle(i)"
        >
          <span class="timeline-node-glow" />
          <span class="timeline-node-dot" />
          <div class="timeline-node-label">
            <span class="timeline-node-year">{{ m.year }}</span>
            <span class="timeline-node-text">{{ m.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline-3d-scene {
  perspective: 1400px;
  padding: 0.5rem 0;
  min-height: 200px;
}

/* Camera movement: zoom in + fade in when slide appears */
.timeline-3d-camera {
  transform-style: preserve-3d;
  transform: translateZ(-80px) scale(0.88);
  opacity: 0;
  animation: timeline-camera-in 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes timeline-camera-in {
  to {
    transform: translateZ(0) scale(1);
    opacity: 1;
  }
}

/* Isometric bird view: diagonal track from top-left to bottom-right, slight tilt */
.timeline-3d-track {
  position: relative;
  width: 100%;
  height: 180px;
  transform: rotateX(12deg);
  transform-style: preserve-3d;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif;
}

/* SVG line: exact diagonal from first node (8,12) to last (92,88), draws in */
.timeline-line-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.timeline-line-path {
  filter: drop-shadow(0 0 6px rgba(99, 102, 241, 0.5));
  stroke-dasharray: 115;
  stroke-dashoffset: 115;
  animation: timeline-line-draw 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
}

@keyframes timeline-line-draw {
  to {
    stroke-dashoffset: 0;
  }
}

.timeline-node {
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  animation: timeline-node-in 0.5s ease-out forwards;
}

@keyframes timeline-node-in {
  to {
    opacity: 1;
  }
}

.timeline-node-glow {
  position: absolute;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%);
  filter: blur(6px);
}

.timeline-node-dot {
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #a78bfa, #6366f1);
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.6);
}

.timeline-node-label {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 8px;
  text-align: center;
  min-width: 100px;
  max-width: 140px;
}

.timeline-node-year {
  display: block;
  font-size: 0.8rem;
  font-weight: 700;
  color: #4f46e5;
  letter-spacing: 0.02em;
}

.timeline-node-text {
  display: block;
  font-size: 0.7rem;
  font-weight: 500;
  color: #111827;
  line-height: 1.35;
  margin-top: 2px;
}

/* Dark mode: keep labels readable */
@media (prefers-color-scheme: dark) {
  .timeline-node-year {
    color: #818cf8;
  }
  .timeline-node-text {
    color: #f3f4f6;
  }
}
</style>
