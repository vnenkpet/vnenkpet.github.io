<script setup lang="ts">
import LabeledLine from "./LabeledLine.vue";
import type { LinePoint, LinePin } from "./LabeledLine.vue";

const MIN = 678;
const MAX = 950;
const RANGE = MAX - MIN;

function toPosition(value: number): number {
  return (value - MIN) / RANGE;
}

const points: LinePoint[] = [
  {
    position: toPosition(678),
    primaryLabel: "678",
    secondaryLabel: "Senior base",
  },
  {
    position: toPosition(750),
    primaryLabel: "750",
    secondaryLabel: "Senior cap",
  },
  {
    position: toPosition(850),
    primaryLabel: "850",
    secondaryLabel: "Tech lead cap",
  },
  {
    position: toPosition(950),
    primaryLabel: "950",
    secondaryLabel: "Architect cap",
  },
];

const pins: LinePin[] = [
  { position: toPosition(780), label: "Have 780", variant: "current" },
  { position: toPosition(750), label: "Asking for 750", variant: "target" },
];
</script>

<template>
  <div class="salary-line">
    <div class="salary-line-camera">
      <LabeledLine :points="points" :pins="pins" orientation="diagonal" />
    </div>
  </div>
</template>

<style scoped>
.salary-line {
  perspective: 1400px;
  min-height: 200px;
  padding: 0.5rem 0;
}

.salary-line-camera {
  transform-style: preserve-3d;
  transform: translateZ(-80px) scale(0.88);
  opacity: 0;
  animation: salary-camera-in 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes salary-camera-in {
  to {
    transform: translateZ(0) scale(1);
    opacity: 1;
  }
}
</style>
