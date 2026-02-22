<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
})

// Match Slidev's resolveAssetUrl: base + path so images work from any slide route
const imageSrc = computed(() => {
  const base = (import.meta.env?.BASE_URL ?? '').replace(/\/+$/, '')
  const path = props.image.startsWith('/') ? props.image.slice(1) : props.image
  const joined = path ? `${base}/${path}`.replace(/\/+/g, '/') : base || '/'
  return joined.startsWith('http') ? joined : (joined.startsWith('/') ? joined : `/${joined}`)
})
</script>

<template>
  <div class="slidev-layout project-showcase grid grid-cols-2 gap-8 w-full h-full p-8">
    <!-- Left: 3D floating screenshot – pure CSS transform so it always applies -->
    <div class="screenshot-3d-scene">
      <div class="screenshot-frame">
        <div class="screenshot-card">
          <div class="screenshot-frame-inner">
            <img
              :src="imageSrc"
              alt="Project screenshot"
              class="screenshot-image"
            >
          </div>
          <div class="screenshot-reflection" aria-hidden="true">
            <img :src="imageSrc" alt="" class="screenshot-reflection-img">
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
/* 3D context: perspective on parent so child rotateY has depth */
.screenshot-3d-scene {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
  perspective: 1100px;
  transform-style: preserve-3d;
}

/* Outer: 3D transform only (no box-shadow here – shadow only on top image) */
.screenshot-frame {
  position: relative;
  width: 88%;
  max-width: 88%;
  max-height: 85%;
  border-radius: 12px;
  background: transparent;
  transform: perspective(1100px) rotateY(22deg);
  transform-style: preserve-3d;
  animation: screenshot-3d-in 0.7s ease-out forwards;
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
  /* Box shadow only on the top image (card), not on the reflection */
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.4),
    0 12px 24px -8px rgba(0, 0, 0, 0.25),
    0 0 60px rgba(99, 102, 241, 0.2),
    0 0 120px rgba(59, 130, 246, 0.1);
}

/* Glossy floor reflection: flipped image, gradient to transparent (no blur) */
.screenshot-reflection {
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 38%;
  max-height: 140px;
  overflow: hidden;
  border-radius: 0 0 12px 12px;
  /* Fade to transparent at bottom (top = near card, bottom = floor). Mask alpha: 1 = show, 0 = hide. */
  -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0) 60%);
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0) 60%);
}

.screenshot-reflection-img {
  display: block;
  width: 100%;
  height: auto;
  transform: scaleY(-1);
  filter: blur(3px);
  opacity: 0.5;
}

@keyframes screenshot-3d-in {
  from {
    opacity: 0;
    transform: perspective(1100px) rotateY(38deg) scale(0.92);
  }
  to {
    opacity: 1;
    transform: perspective(1100px) rotateY(22deg) scale(1);
  }
}

.screenshot-image {
  display: block;
  width: 100%;
  height: auto;
  vertical-align: middle;
}

/* Staggered list animation - triggers when slide becomes visible */
.accomplishments :deep(ul) {
  list-style: none;
  padding-left: 0;
  margin: 0.5em 0;
}

.accomplishments :deep(li) {
  opacity: 0;
  transform: translateX(20px);
  animation: accomplishStagger 0.5s ease-out forwards;
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

/* Style headings in accomplishments */
.accomplishments :deep(h2) {
  margin-bottom: 0.75em;
  font-size: 1.5em;
}
</style>
