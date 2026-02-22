<script setup lang="ts">
import LabeledLine from './LabeledLine.vue'
import type { LinePoint } from './LabeledLine.vue'

const milestones = [
  { year: '2019', label: 'GoodData, Politinn, Digitoo' },
  { year: '2021', label: 'Refsite' },
  { year: '2022', label: 'Tech Lead, Sakurabook, Investbay' },
  { year: '2023', label: 'Remangu, GDC' },
  { year: '2025', label: 'Deliciously Ella' },
]

const points: LinePoint[] = milestones.map((m) => ({
  position: 0,
  primaryLabel: m.year,
  secondaryLabel: m.label,
}))

const pointsWithPosition = points.map((p, i) => ({
  ...p,
  position: milestones.length <= 1 ? 0 : i / (milestones.length - 1),
}))
</script>

<template>
  <div class="timeline-3d-scene">
    <div class="timeline-3d-camera">
      <LabeledLine :points="pointsWithPosition" orientation="diagonal" />
    </div>
  </div>
</template>

<style scoped>
.timeline-3d-scene {
  padding: 0.5rem 0;
  min-height: 200px;
}

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
</style>
