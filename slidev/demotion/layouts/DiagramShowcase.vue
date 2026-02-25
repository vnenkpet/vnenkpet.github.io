<script setup lang="ts">
import { shallowRef } from 'vue'
import { VueFlow } from '@vue-flow/core'
import type { Node, Edge, VueFlowStore } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'

const nodes = shallowRef<Node[]>([
  { id: 'react', position: { x: 0, y: 100 }, data: { label: 'React Frontend' } },
  { id: 'nest', position: { x: 280, y: 100 }, data: { label: 'Nest Backend' } },
  { id: 'postgres', position: { x: 560, y: 100 }, data: { label: 'Postgres DB' } },
  { id: 'aws', position: { x: 200, y: 260 }, data: { label: 'AWS' } },
  { id: 'stripe', position: { x: 360, y: 260 }, data: { label: 'Stripe' } },
])

const defaultEdgeOptions = {
  labelShowBg: true,
  labelBgStyle: {
    fill: 'rgba(30, 41, 59, 0.92)',
    backgroundColor: 'rgba(30, 41, 59, 0.92)',
  },
  labelBgPadding: [8, 6] as [number, number],
  labelBgBorderRadius: 6,
  labelStyle: {
    fill: '#e2e8f0',
    color: '#e2e8f0',
    fontSize: 12,
    fontWeight: 500,
  },
}

const edges = shallowRef<Edge[]>([
  { id: 'e-react-nest', source: 'react', target: 'nest', label: 'GraphQL / REST' },
  { id: 'e-nest-postgres', source: 'nest', target: 'postgres', label: 'Prisma' },
  { id: 'e-nest-aws', source: 'nest', target: 'aws' },
  { id: 'e-nest-stripe', source: 'nest', target: 'stripe' },
])

const defaultViewport = { x: 0, y: 0, zoom: 0.6 }

const fitViewOptions = { padding: 0.25, duration: 500 }

const onPaneReady = (store: VueFlowStore) => {
  const runFit = () => store.fitView(fitViewOptions)
  setTimeout(runFit, 400)
  setTimeout(runFit, 1000)
}
</script>

<template>
  <div class="slidev-layout diagram-showcase grid grid-cols-2 gap-6 w-full h-full p-6">
    <svg class="diagram-sr-only" aria-hidden="true">
      <defs>
        <filter id="diagram-edge-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 1  0 1 0 0 1  0 0 1 0 1  0 0 0 0.6 0" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
    <!-- Left: 3D floating diagram with reflection -->
    <div class="diagram-3d-scene">
      <div class="diagram-frame">
        <div class="diagram-card">
          <div class="diagram-frame-inner">
            <VueFlow
              id="diagram-main"
              :nodes="nodes"
              :edges="edges"
              :default-edge-options="defaultEdgeOptions"
              :default-viewport="defaultViewport"
              :nodes-draggable="false"
              :nodes-connectable="false"
              :elements-selectable="false"
              :pan-on-drag="false"
              :zoom-on-scroll="false"
              :zoom-on-pinch="false"
              class="diagram-dark diagram-flow"
              @pane-ready="onPaneReady"
            />
          </div>
          <div class="diagram-reflection" aria-hidden="true">
            <div class="diagram-reflection-inner">
              <VueFlow
                id="diagram-reflection"
                :nodes="nodes"
                :edges="edges"
                :default-edge-options="defaultEdgeOptions"
                :default-viewport="defaultViewport"
                :nodes-draggable="false"
                :nodes-connectable="false"
                :elements-selectable="false"
                :pan-on-drag="false"
                :zoom-on-scroll="false"
                :zoom-on-pinch="false"
                class="diagram-dark diagram-flow diagram-flow-reflection"
                @pane-ready="onPaneReady"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Accomplishments with staggered animation -->
    <div class="accomplishments flex flex-col justify-center pl-4">
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* Left column and scene must have explicit height so flex children get space */
.diagram-showcase > .diagram-3d-scene {
  min-height: 0;
  height: 100%;
}

.diagram-3d-scene {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
  perspective: 1100px;
  transform-style: preserve-3d;
}

.diagram-frame {
  position: relative;
  width: 96%;
  max-width: 96%;
  height: 92%;
  max-height: 92%;
  border-radius: 12px;
  background: transparent;
  transform: perspective(1100px) rotateY(22deg);
  transform-style: preserve-3d;
  backface-visibility: visible;
  animation: diagram-3d-in 0.7s ease-out forwards;
}

.diagram-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;
  border-radius: 12px;
}

.diagram-frame-inner {
  border-radius: 12px 12px 0 0;
  overflow: hidden;
  width: 100%;
  flex: 1 1 0;
  min-height: 200px;
  position: relative;
}

.diagram-reflection {
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 32%;
  max-height: 160px;
  overflow: hidden;
  border-radius: 0 0 12px 12px;
  -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0) 55%);
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0) 55%);
}

.diagram-reflection-inner {
  width: 100%;
  height: 280px;
  transform: scaleY(-1);
  filter: blur(3px);
  opacity: 0.5;
  pointer-events: none;
}

.diagram-reflection-inner :deep(.vue-flow) {
  height: 100% !important;
  pointer-events: none;
}

@keyframes diagram-3d-in {
  from {
    opacity: 0;
    transform: perspective(1100px) rotateY(38deg) scale(0.92);
  }
  to {
    opacity: 1;
    transform: perspective(1100px) rotateY(22deg) scale(1);
  }
}

.diagram-sr-only {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  pointer-events: none;
}

/* Dark theme: transparent to match slide; nodes on top of edges */
.diagram-dark :deep(.vue-flow) {
  background: transparent;
}

.diagram-dark :deep(.vue-flow__nodes) {
  z-index: 2;
}

.diagram-dark :deep(.vue-flow__edges) {
  z-index: 1;
}

.diagram-dark :deep(.vue-flow__node) {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: #e2e8f0;
  border-radius: 10px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.02em;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.06);
}

.diagram-dark :deep(.vue-flow__edge-path) {
  stroke: rgba(255, 255, 255, 0.28);
  stroke-width: 2;
  stroke-dasharray: 8 6;
  animation: diagram-edge-dash 0.8s linear infinite;
  filter: url(#diagram-edge-glow);
}

/* Edge labels: dark pill background + visible text (override default white rect) */
.diagram-dark :deep(.vue-flow__edge-text) {
  font-size: 12px;
  font-weight: 500;
  fill: #e2e8f0;
}

.diagram-dark :deep(.vue-flow__edge rect) {
  fill: rgba(30, 41, 59, 0.92);
}

.diagram-dark :deep(.vue-flow__edge text) {
  fill: #e2e8f0;
}

/* If label is rendered in HTML (foreignObject) */
.diagram-dark :deep(.vue-flow__edge [class*="label"]) {
  background: rgba(30, 41, 59, 0.92) !important;
  color: #e2e8f0 !important;
}

@keyframes diagram-edge-dash {
  to {
    stroke-dashoffset: -14;
  }
}

.diagram-flow {
  width: 100%;
  height: 100%;
}

/* Vue Flow root must fill the frame-inner; ensure it has dimensions */
.diagram-frame-inner :deep(.vue-flow) {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

/* Accomplishments: same as ProjectShowcase */
.accomplishments :deep(ul) {
  list-style: disc;
  padding-left: 1.5em;
  margin: 0.5em 0;
}

.accomplishments :deep(li) {
  opacity: 0;
  transform: translateX(20px);
  animation: accomplishStagger 0.5s ease-out forwards;
  margin-bottom: 0.6em;
}

.accomplishments :deep(li:last-child) {
  margin-bottom: 0;
}

.accomplishments :deep(li:nth-child(1)) { animation-delay: 0.15s; }
.accomplishments :deep(li:nth-child(2)) { animation-delay: 0.28s; }
.accomplishments :deep(li:nth-child(3)) { animation-delay: 0.41s; }
.accomplishments :deep(li:nth-child(4)) { animation-delay: 0.54s; }
.accomplishments :deep(li:nth-child(5)) { animation-delay: 0.67s; }
.accomplishments :deep(li:nth-child(6)) { animation-delay: 0.8s; }
.accomplishments :deep(li:nth-child(7)) { animation-delay: 0.93s; }
.accomplishments :deep(li:nth-child(8)) { animation-delay: 1.06s; }
.accomplishments :deep(li:nth-child(9)) { animation-delay: 1.19s; }
.accomplishments :deep(li:nth-child(10)) { animation-delay: 1.32s; }

@keyframes accomplishStagger {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.accomplishments :deep(h2) {
  margin-bottom: 0.15em;
  font-size: 1.5em;
}

.accomplishments :deep(h3) {
  font-size: 0.95em;
  font-weight: 500;
  opacity: 0.85;
  margin-top: 0;
  margin-bottom: 0.75em;
  letter-spacing: 0.02em;
}
</style>
