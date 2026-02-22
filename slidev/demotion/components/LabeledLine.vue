<script setup lang="ts">
import { useId } from 'vue'

export type LinePoint = {
  position: number
  primaryLabel: string
  secondaryLabel?: string
}

export type LinePin = {
  position: number
  label: string
  variant?: 'current' | 'target'
}

const gradientIdDiagonal = useId()
const gradientIdHorizontal = useId()

const props = withDefaults(
  defineProps<{
    points: LinePoint[]
    pins?: LinePin[]
    orientation?: 'horizontal' | 'diagonal'
  }>(),
  { pins: () => [], orientation: 'diagonal' }
)

function pointStyle(i: number): Record<string, string> {
  const p = props.points[i]
  const t = p ? Math.max(0, Math.min(1, p.position)) : 0
  if (props.orientation === 'diagonal') {
    const left = 8 + t * 84
    const top = 12 + t * 76
    return {
      left: `${left}%`,
      top: `${top}%`,
      animationDelay: `${0.4 + i * 0.12}s`,
    }
  }
  return {
    left: `${t * 100}%`,
    top: '50%',
    animationDelay: `${0.4 + i * 0.1}s`,
  }
}

function pinStyle(pin: LinePin): Record<string, string> {
  const t = Math.max(0, Math.min(1, pin.position))
  if (props.orientation === 'diagonal') {
    const left = 8 + t * 84
    const top = 12 + t * 76
    return { left: `${left}%`, top: `${top}%` }
  }
  return { left: `${t * 100}%`, top: '50%' }
}
</script>

<template>
  <div class="labeled-line" :class="[`labeled-line--${orientation}`]">
    <div class="labeled-line-track">
      <svg
        v-if="orientation === 'diagonal'"
        class="labeled-line-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient :id="gradientIdDiagonal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#a78bfa" />
            <stop offset="100%" stop-color="#6366f1" />
          </linearGradient>
        </defs>
          <line
            x1="8"
            y1="12"
            x2="92"
            y2="88"
            :stroke="`url(#${gradientIdDiagonal})`"
            stroke-width="4"
            stroke-linecap="round"
            fill="none"
            class="labeled-line-path"
          />
      </svg>
      <svg
        v-else
        class="labeled-line-svg labeled-line-svg--horizontal"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient :id="gradientIdHorizontal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#a78bfa" />
            <stop offset="100%" stop-color="#6366f1" />
          </linearGradient>
        </defs>
        <line
          x1="4"
          y1="50"
          x2="96"
          y2="50"
          :stroke="`url(#${gradientIdHorizontal})`"
          stroke-width="3"
          stroke-linecap="round"
          fill="none"
          class="labeled-line-path"
        />
      </svg>
      <div
        v-for="(p, i) in points"
        :key="`point-${i}-${p.primaryLabel}`"
        class="labeled-line-node"
        :style="pointStyle(i)"
      >
        <span class="labeled-line-node-glow" />
        <span class="labeled-line-node-dot" />
        <div class="labeled-line-node-label">
          <span class="labeled-line-node-primary">{{ p.primaryLabel }}</span>
          <span v-if="p.secondaryLabel" class="labeled-line-node-secondary">{{ p.secondaryLabel }}</span>
        </div>
      </div>
      <div
        v-for="(pin, i) in pins"
        :key="`pin-${i}-${pin.label}`"
        class="labeled-line-pin"
        :class="{ 'labeled-line-pin--current': pin.variant === 'current', 'labeled-line-pin--target': pin.variant === 'target' }"
        :style="pinStyle(pin)"
      >
        <span class="labeled-line-pin-marker" />
        <span class="labeled-line-pin-label">{{ pin.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.labeled-line {
  perspective: 1400px;
  padding: 0.5rem 0;
}

.labeled-line--diagonal .labeled-line-track {
  min-height: 180px;
  transform: rotateX(12deg);
  transform-style: preserve-3d;
}

.labeled-line--horizontal .labeled-line-track {
  min-height: 120px;
  position: relative;
}

.labeled-line-track {
  position: relative;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif;
}

.labeled-line-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.labeled-line-svg--horizontal {
  viewBox: 0 0 100 100;
}

.labeled-line-path {
  stroke-dasharray: 115;
  stroke-dashoffset: 115;
  animation: labeled-line-draw 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
}

.labeled-line--horizontal .labeled-line-path {
  stroke-dasharray: 92;
  stroke-dashoffset: 92;
}

@keyframes labeled-line-draw {
  to {
    stroke-dashoffset: 0;
  }
}

.labeled-line-node {
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  animation: labeled-line-node-in 0.5s ease-out forwards;
}

.labeled-line--horizontal .labeled-line-node .labeled-line-node-label {
  top: 100%;
  bottom: auto;
}

@keyframes labeled-line-node-in {
  to {
    opacity: 1;
  }
}

.labeled-line-node-glow {
  position: absolute;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: transparent;
  pointer-events: none;
}

.labeled-line-node-dot {
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #a78bfa, #6366f1);
}

.labeled-line-node-label {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 8px;
  text-align: center;
  min-width: 80px;
  max-width: 140px;
}

.labeled-line-node-primary {
  display: block;
  font-size: 0.8rem;
  font-weight: 700;
  color: #4f46e5;
  letter-spacing: 0.02em;
}

.labeled-line-node-secondary {
  display: block;
  font-size: 0.7rem;
  font-weight: 500;
  color: #111827;
  line-height: 1.35;
  margin-top: 2px;
}

.labeled-line-pin {
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  animation: labeled-line-node-in 0.5s ease-out 0.6s forwards;
}

.labeled-line--horizontal .labeled-line-pin {
  width: auto;
  height: auto;
  flex-direction: column-reverse;
}

.labeled-line-pin-marker {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #94a3b8;
}

.labeled-line--diagonal .labeled-line-pin-marker {
  position: absolute;
  inset: 0;
}

.labeled-line-pin--current .labeled-line-pin-marker {
  color: #eab308;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.95), #eab308 65%);
  animation: labeled-line-pin-glow 1.5s ease-in-out infinite;
}

.labeled-line-pin--target .labeled-line-pin-marker {
  color: #22c55e;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.95), #22c55e 65%);
  animation: labeled-line-pin-glow 1.5s ease-in-out infinite;
}

@keyframes labeled-line-pin-glow {
  0%, 100% {
    box-shadow: 0 0 4px 1px currentColor;
  }
  50% {
    box-shadow: 0 0 14px 4px currentColor;
  }
}

.labeled-line-pin-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: #b45309;
  white-space: nowrap;
}

/* Diagonal: label above the marker (same position as purple dots) */
.labeled-line--diagonal .labeled-line-pin-label {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 4px;
}

.labeled-line-pin--current .labeled-line-pin-label {
  color: #a16207;
}

.labeled-line-pin--target .labeled-line-pin-label {
  color: #15803d;
}

.labeled-line--horizontal .labeled-line-pin-label {
  margin-bottom: 4px;
}

@media (prefers-color-scheme: dark) {
  .labeled-line-node-primary {
    color: #818cf8;
  }
  .labeled-line-node-secondary {
    color: #f3f4f6;
  }
  .labeled-line-pin-label {
    color: #fbbf24;
  }
  .labeled-line-pin--current .labeled-line-pin-label {
    color: #facc15;
  }
  .labeled-line-pin--target .labeled-line-pin-label {
    color: #4ade80;
  }
}
</style>
