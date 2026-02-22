<script setup lang="ts">
import { ref, onMounted } from 'vue'

const ASSETS = [
  '/assets/digitoo.jpg',
  '/assets/refsite.png',
  '/assets/sakurabook.png',
  '/assets/investbay.png',
  '/assets/remangu.webp',
  '/assets/deliella.png',
  '/assets/lusk.png',
  '/assets/skoala.png',
] as const

const COLS = 24
const ROWS = 64
const CELL_H = 50

function shuffleArray<T>(arr: T[]): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

const displayList = ref<string[]>([])

onMounted(() => {
  const singleRepeat: string[] = []
  const pool = shuffleArray([...ASSETS])
  for (let i = 0; i < ROWS * COLS; i++) {
    singleRepeat.push(pool[i % pool.length])
  }
  const shuffled = shuffleArray(singleRepeat)
  displayList.value = [...shuffled, ...shuffled]
})
</script>

<template>
  <div class="highlights-grid">
    <div class="highlights-grid__track">
      <div
        v-for="(src, i) in displayList"
        :key="i"
        class="highlights-grid__cell"
      >
        <img :src="src" alt="" loading="lazy" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.highlights-grid {
  position: absolute;
  inset: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.highlights-grid__track {
  position: absolute;
  left: 50%;
  top: 0;
  margin-left: -840px;
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  width: 1680px;
  will-change: transform;
  animation: highlights-grid-scroll 200s linear infinite;
}

.highlights-grid__cell {
  width: 70px;
  height: 50px;
  flex-shrink: 0;
  overflow: hidden;
  display: block;
}

.highlights-grid__cell img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

@keyframes highlights-grid-scroll {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-3200px);
  }
}
</style>
