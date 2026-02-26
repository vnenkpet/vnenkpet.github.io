<script setup lang="ts">
import { shallowRef } from 'vue'
import { VueFlow } from '@vue-flow/core'
import type { Node, Edge, VueFlowStore } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'

/**
 * Full deployment diagram from specs/uml/deployment.puml (after/desired state).
 * Three top-level groups: Deliciously Ella, Third-Party Services, Mobile Payment Providers.
 * Nested: Mobile Apps (iOS, Android), Cloud Services (Storage, Video, Queue), Shopify (Store).
 */
/** Reserve ~28px at top of each group for the label; children start below. */
const LABEL_HEIGHT = 32

/** Random stagger delays (0–3.5s) so the graph builds over a few seconds. */
const STAGGER_DELAY_MAX = 3.5
const randomDelay = () => Math.random() * STAGGER_DELAY_MAX
const nodeDelays: number[] = []
const edgeDelays: number[] = []

const nodeList: Node[] = [
  // --- Deliciously Ella (main container): 480×420, label at top, children from y=36 ---
  {
    id: 'dela',
    type: 'default',
    position: { x: 0, y: 0 },
    data: { label: 'Deliciously Ella' },
    class: 'deployment-group',
    style: {
      width: '480px',
      height: '420px',
      backgroundColor: 'rgba(30, 41, 59, 0.4)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '8px',
    },
  },
  { id: 'nest', position: { x: 175, y: 105 }, data: { label: 'NestJS Backend' }, parentNode: 'dela', extent: 'parent' },
  { id: 'webclient', position: { x: 15, y: 40 }, data: { label: 'Web Client' }, parentNode: 'dela', extent: 'parent' },
  { id: 'admindash', position: { x: 15, y: 95 }, data: { label: 'Admin Dashboard' }, parentNode: 'dela', extent: 'parent' },
  { id: 'userdb', position: { x: 355, y: 40 }, data: { label: 'User Database' }, parentNode: 'dela', extent: 'parent' },
  { id: 'contentdb', position: { x: 355, y: 95 }, data: { label: 'Content Database' }, parentNode: 'dela', extent: 'parent' },
  { id: 'payload', position: { x: 355, y: 150 }, data: { label: 'Payload CMS' }, parentNode: 'dela', extent: 'parent' },
  // Mobile Apps (nested): label at top, apps stacked with clear gap (~28px per row)
  {
    id: 'mobile',
    type: 'default',
    position: { x: 15, y: 215 },
    data: { label: 'Mobile Apps' },
    class: 'deployment-group',
    parentNode: 'dela',
    extent: 'parent',
    style: { width: '200px', height: '92px', backgroundColor: 'rgba(30, 41, 59, 0.5)', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.15)' },
  },
  { id: 'ios', position: { x: 8, y: LABEL_HEIGHT }, data: { label: 'iOS App' }, parentNode: 'mobile', extent: 'parent' },
  { id: 'android', position: { x: 8, y: 62 }, data: { label: 'Android App' }, parentNode: 'mobile', extent: 'parent' },
  // Cloud Services: label at top, three nodes stacked with clear gap (~28px per row)
  {
    id: 'cloud',
    type: 'default',
    position: { x: 230, y: 315 },
    data: { label: 'Cloud Services' },
    class: 'deployment-group',
    parentNode: 'dela',
    extent: 'parent',
    style: { width: '200px', height: '118px', backgroundColor: 'rgba(30, 41, 59, 0.5)', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.15)' },
  },
  { id: 'cloudstorage', position: { x: 8, y: LABEL_HEIGHT }, data: { label: 'Cloud Storage' }, parentNode: 'cloud', extent: 'parent' },
  { id: 'videoprocessing', position: { x: 8, y: 60 }, data: { label: 'Video Processing' }, parentNode: 'cloud', extent: 'parent' },
  { id: 'messagequeue', position: { x: 8, y: 88 }, data: { label: 'Message Queue' }, parentNode: 'cloud', extent: 'parent' },

  // --- Third-Party Services: 300×350, children from y=36 with 48px vertical gap ---
  {
    id: 'thirdparty',
    type: 'default',
    position: { x: 500, y: 0 },
    data: { label: 'Third-Party Services' },
    class: 'deployment-group',
    style: {
      width: '300px',
      height: '350px',
      backgroundColor: 'rgba(30, 41, 59, 0.4)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '8px',
    },
  },
  { id: 'klaviyo', position: { x: 15, y: 36 }, data: { label: 'Klaviyo' }, parentNode: 'thirdparty', extent: 'parent' },
  { id: 'sendgrid', position: { x: 15, y: 84 }, data: { label: 'SendGrid' }, parentNode: 'thirdparty', extent: 'parent' },
  { id: 'stripe', position: { x: 15, y: 132 }, data: { label: 'Stripe' }, parentNode: 'thirdparty', extent: 'parent' },
  { id: 'recharge', position: { x: 15, y: 180 }, data: { label: 'Recharge' }, parentNode: 'thirdparty', extent: 'parent' },
  { id: 'openai', position: { x: 15, y: 228 }, data: { label: 'OpenAI' }, parentNode: 'thirdparty', extent: 'parent' },
  {
    id: 'shopify',
    type: 'default',
    position: { x: 15, y: 276 },
    data: { label: 'Shopify' },
    class: 'deployment-group',
    parentNode: 'thirdparty',
    extent: 'parent',
    style: { width: '270px', height: '58px', backgroundColor: 'rgba(30, 41, 59, 0.5)', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.15)' },
  },
  { id: 'shopifystore', position: { x: 8, y: LABEL_HEIGHT }, data: { label: 'Shopify Store' }, parentNode: 'shopify', extent: 'parent' },

  // --- Mobile Payment Providers: 300×130, label at top, two nodes below ---
  {
    id: 'mobilepay',
    type: 'default',
    position: { x: 500, y: 365 },
    data: { label: 'Mobile Payment Providers' },
    class: 'deployment-group',
    style: {
      width: '300px',
      height: '130px',
      backgroundColor: 'rgba(30, 41, 59, 0.4)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '8px',
    },
  },
  { id: 'applestorekit', position: { x: 15, y: 36 }, data: { label: 'Apple StoreKit' }, parentNode: 'mobilepay', extent: 'parent' },
  { id: 'googleplaybilling', position: { x: 15, y: 78 }, data: { label: 'Google Play Billing' }, parentNode: 'mobilepay', extent: 'parent' },
]

while (nodeDelays.length < nodeList.length) nodeDelays.push(randomDelay())
const nodes = shallowRef<Node[]>(
  nodeList.map((n, i) => ({
    ...n,
    style: { ...(n.style && typeof n.style === 'object' ? n.style : {}), animationDelay: `${nodeDelays[i]}s` },
  }))
)

const defaultEdgeOptions = {
  labelShowBg: true,
  labelBgStyle: {
    fill: 'rgba(30, 41, 59, 0.92)',
    backgroundColor: 'rgba(30, 41, 59, 0.92)',
  },
  labelBgPadding: [6, 4] as [number, number],
  labelBgBorderRadius: 4,
  labelStyle: {
    fill: '#e2e8f0',
    color: '#e2e8f0',
    fontSize: 10,
    fontWeight: 500,
  },
}

const edgeList: Edge[] = [
  // Core backend
  { id: 'e-web-nest', source: 'webclient', target: 'nest' },
  { id: 'e-admin-nest', source: 'admindash', target: 'nest' },
  { id: 'e-nest-userdb', source: 'nest', target: 'userdb' },
  { id: 'e-nest-payload', source: 'nest', target: 'payload' },
  { id: 'e-nest-cloudstorage', source: 'nest', target: 'cloudstorage' },
  { id: 'e-nest-messagequeue', source: 'nest', target: 'messagequeue' },
  { id: 'e-payload-contentdb', source: 'payload', target: 'contentdb' },
  // Video pipeline
  { id: 'e-payload-storage', source: 'payload', target: 'cloudstorage' },
  { id: 'e-storage-video', source: 'cloudstorage', target: 'videoprocessing' },
  { id: 'e-video-storage', source: 'videoprocessing', target: 'cloudstorage' },
  // Third-party (NestJS → each)
  { id: 'e-nest-klaviyo', source: 'nest', target: 'klaviyo' },
  { id: 'e-nest-sendgrid', source: 'nest', target: 'sendgrid' },
  { id: 'e-nest-stripe', source: 'nest', target: 'stripe' },
  { id: 'e-nest-recharge', source: 'nest', target: 'recharge' },
  { id: 'e-nest-openai', source: 'nest', target: 'openai' },
  { id: 'e-nest-shopify', source: 'nest', target: 'shopifystore' },
  // Mobile apps
  { id: 'e-ios-nest', source: 'ios', target: 'nest' },
  { id: 'e-android-nest', source: 'android', target: 'nest' },
  { id: 'e-ios-apple', source: 'ios', target: 'applestorekit' },
  { id: 'e-android-google', source: 'android', target: 'googleplaybilling' },
  // Payment webhooks
  { id: 'e-apple-nest', source: 'applestorekit', target: 'nest' },
  { id: 'e-google-nest', source: 'googleplaybilling', target: 'nest' },
  { id: 'e-apple-queue', source: 'applestorekit', target: 'messagequeue' },
  { id: 'e-google-queue', source: 'googleplaybilling', target: 'messagequeue' },
  { id: 'e-queue-nest', source: 'messagequeue', target: 'nest' },
  // Subscription
  { id: 'e-recharge-shopify', source: 'recharge', target: 'shopifystore' },
]

while (edgeDelays.length < edgeList.length) edgeDelays.push(randomDelay())
const edges = shallowRef<Edge[]>(
  edgeList.map((e, i) => ({
    ...e,
    style: { animationDelay: `${edgeDelays[i]}s` },
    domAttributes: { 'data-id': e.id },
  }))
)

/** Per-edge animation-delay CSS (scoped to diagram, targets data-id for reflection instance). */
const edgeStaggerCss = edgeList
  .map((e, i) => `.diagram-deployment-full .vue-flow__edge[data-id="${e.id}"] { animation-delay: ${edgeDelays[i]}s; }`)
  .join('\n')

const defaultViewport = { x: 0, y: 0, zoom: 0.65 }

const fitViewOptions = { padding: 0.15, duration: 500 }

const onPaneReady = (store: VueFlowStore) => {
  const runFit = () => store.fitView(fitViewOptions)
  setTimeout(runFit, 400)
  setTimeout(runFit, 1000)
}
</script>

<template>
  <div class="slidev-layout diagram-showcase diagram-showcase-deployment grid grid-cols-2 gap-6 w-full h-full p-6">
    <component :is="'style'">{{ edgeStaggerCss }}</component>
    <svg class="diagram-sr-only" aria-hidden="true">
      <defs>
        <filter id="diagram-deployment-edge-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 1  0 1 0 0 1  0 0 1 0 1  0 0 0 0.6 0" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
    <div class="diagram-3d-scene">
      <div class="diagram-frame">
        <div class="diagram-card">
          <div class="diagram-frame-inner">
            <VueFlow
              id="diagram-deployment-main"
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
              class="diagram-dark diagram-flow diagram-deployment-full"
              @pane-ready="onPaneReady"
            />
          </div>
          <div class="diagram-reflection" aria-hidden="true">
            <div class="diagram-reflection-inner">
              <VueFlow
                id="diagram-deployment-reflection"
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
                class="diagram-dark diagram-flow diagram-flow-reflection diagram-deployment-full"
                @pane-ready="onPaneReady"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="accomplishments flex flex-col justify-center pl-4">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.diagram-showcase-deployment > .diagram-3d-scene {
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

.diagram-dark :deep(.vue-flow) {
  background: transparent;
}

.diagram-dark :deep(.vue-flow__nodes) {
  z-index: 2;
}

.diagram-dark :deep(.vue-flow__edges) {
  z-index: 1;
}

/* Group/parent nodes: keep border, allow custom background from node style */
.diagram-deployment-full :deep(.vue-flow__node) {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: #e2e8f0;
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.06);
}

/* Group nodes: reserve top strip for label so children below don’t overlap */
.diagram-deployment-full :deep(.vue-flow__node.deployment-group) {
  padding-top: 6px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.diagram-deployment-full :deep(.vue-flow__node.deployment-group.vue-flow__node-default) {
  min-height: 26px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.06), inset 0 26px 0 -25px rgba(255, 255, 255, 0.06);
}

/* Stagger alpha (opacity only) on appear for nodes and edges */
@keyframes diagram-stagger-alpha {
  from { opacity: 0; }
  to { opacity: 1; }
}

.diagram-deployment-full :deep(.vue-flow__node) {
  opacity: 0;
  animation: diagram-stagger-alpha 0.7s ease-out forwards;
}

.diagram-deployment-full :deep(.vue-flow__edge) {
  opacity: 0;
  animation: diagram-stagger-alpha 0.7s ease-out forwards;
}

.diagram-dark :deep(.vue-flow__edge-path) {
  stroke: rgba(255, 255, 255, 0.28);
  stroke-width: 1.5;
  stroke-dasharray: 6 4;
  animation: diagram-edge-dash 0.8s linear infinite;
  filter: url(#diagram-deployment-edge-glow);
}

.diagram-dark :deep(.vue-flow__edge-text) {
  font-size: 9px;
  font-weight: 500;
  fill: #e2e8f0;
}

.diagram-dark :deep(.vue-flow__edge rect) {
  fill: rgba(30, 41, 59, 0.92);
}

.diagram-dark :deep(.vue-flow__edge text) {
  fill: #e2e8f0;
}

.diagram-dark :deep(.vue-flow__edge [class*="label"]) {
  background: rgba(30, 41, 59, 0.92) !important;
  color: #e2e8f0 !important;
}

@keyframes diagram-edge-dash {
  to {
    stroke-dashoffset: -10;
  }
}

.diagram-flow {
  width: 100%;
  height: 100%;
}

.diagram-frame-inner :deep(.vue-flow) {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

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
