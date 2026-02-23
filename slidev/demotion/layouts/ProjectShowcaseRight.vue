<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  image: {
    type: String,
    default: '',
  },
  video: {
    type: String,
    default: '',
  },
})

const resolveUrl = (raw: string) => {
  const base = (import.meta.env?.BASE_URL ?? '').replace(/\/+$/, '')
  const path = raw.startsWith('/') ? raw.slice(1) : raw
  const joined = path ? `${base}/${path}`.replace(/\/+/g, '/') : base || '/'
  return joined.startsWith('http') ? joined : (joined.startsWith('/') ? joined : `/${joined}`)
}

const imageSrc = computed(() => (props.image ? resolveUrl(props.image) : ''))
const videoSrc = computed(() => (props.video ? resolveUrl(props.video) : ''))
const isVideo = computed(() => Boolean(props.video))
</script>

<template>
  <div class="slidev-layout project-showcase-right grid grid-cols-2 gap-8 w-full h-full p-8">
    <!-- Left: Accomplishments with staggered animation -->
    <div class="accomplishments flex flex-col justify-center pr-4 order-1">
      <slot />
    </div>

    <!-- Right: 3D floating screenshot or video -->
    <div class="screenshot-3d-scene order-2">
      <div class="screenshot-frame">
        <div class="screenshot-card">
          <div class="screenshot-frame-inner">
            <video
              v-if="isVideo"
              :src="videoSrc"
              autoplay
              muted
              loop
              playsinline
              class="screenshot-media"
            />
            <img
              v-else
              :src="imageSrc"
              alt="Project screenshot"
              class="screenshot-media"
            >
          </div>
          <div class="screenshot-reflection" aria-hidden="true">
            <video
              v-if="isVideo"
              :src="videoSrc"
              autoplay
              muted
              loop
              playsinline
              class="screenshot-reflection-media"
            />
            <img
              v-else
              :src="imageSrc"
              alt=""
              class="screenshot-reflection-img"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.screenshot-3d-scene {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
  perspective: 1100px;
  transform-style: preserve-3d;
}

.screenshot-frame {
  position: relative;
  width: 88%;
  max-width: 88%;
  max-height: 85%;
  border-radius: 12px;
  background: transparent;
  transform: perspective(1100px) rotateY(-22deg);
  transform-style: preserve-3d;
  animation: screenshot-3d-in-right 0.7s ease-out forwards;
}

.screenshot-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 12px;
}

.screenshot-frame-inner {
  border-radius: 12px 12px 0 0;
  overflow: hidden;
  width: 100%;
  flex: 1;
  min-height: 0;
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.4),
    0 12px 24px -8px rgba(0, 0, 0, 0.25),
    0 0 60px rgba(99, 102, 241, 0.2),
    0 0 120px rgba(59, 130, 246, 0.1);
}

.screenshot-reflection {
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 38%;
  max-height: 140px;
  overflow: hidden;
  border-radius: 0 0 12px 12px;
  -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0) 60%);
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0) 60%);
}

.screenshot-reflection-img,
.screenshot-reflection-media {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scaleY(-1);
  filter: blur(3px);
  opacity: 0.5;
}

.screenshot-reflection-img {
  height: auto;
}

@keyframes screenshot-3d-in-right {
  from {
    opacity: 0;
    transform: perspective(1100px) rotateY(-38deg) scale(0.92);
  }
  to {
    opacity: 1;
    transform: perspective(1100px) rotateY(-22deg) scale(1);
  }
}

.screenshot-media,
.screenshot-image {
  display: block;
  width: 100%;
  height: auto;
  vertical-align: middle;
  object-fit: cover;
}

.accomplishments :deep(ul) {
  list-style: disc;
  padding-left: 1.5em;
  margin: 0.5em 0;
}

.accomplishments :deep(li) {
  opacity: 0;
  transform: translateX(-20px);
  animation: accomplishStaggerRight 0.5s ease-out forwards;
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
.accomplishments :deep(li:nth-child(11)) { animation-delay: 1.45s; }
.accomplishments :deep(li:nth-child(12)) { animation-delay: 1.58s; }

@keyframes accomplishStaggerRight {
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
