<script setup lang="ts">
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

const ROWS = 48
const COLS = 24

/** Different permutations of asset indices (0–7) so each row has a different order */
const ROW_ORDERS: number[][] = [
  [0, 1, 2, 3, 4, 5, 6, 7],
  [1, 3, 0, 5, 7, 2, 4, 6],
  [2, 5, 7, 0, 3, 6, 1, 4],
  [3, 0, 6, 1, 4, 7, 2, 5],
  [4, 2, 1, 7, 0, 5, 6, 3],
  [5, 7, 4, 2, 6, 1, 3, 0],
  [6, 4, 3, 5, 1, 0, 7, 2],
  [7, 6, 5, 4, 2, 3, 0, 1],
]

const gridImages = ((): string[] => {
  const out: string[] = []
  for (let r = 0; r < ROWS; r++) {
    const order = ROW_ORDERS[r % ROW_ORDERS.length]
    for (let c = 0; c < COLS; c++) {
      out.push(ASSETS[order[c % order.length]])
    }
  }
  return out
})()
</script>

<template>
  <div class="highlights-bg-track">
    <img
      v-for="(src, i) in gridImages"
      :key="i"
      :src="src"
      alt=""
    >
  </div>
</template>
