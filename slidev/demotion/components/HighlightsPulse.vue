<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

let pulseInterval: ReturnType<typeof setInterval> | null = null
let observer: IntersectionObserver | null = null
let staggerDone = false
const PULSE_DURATION_MS = 450
const PULSE_INTERVAL_MS = 32
const STAGGER_WINDOW_MS = 2200

function pulseRandomTile() {
  const slide = document.querySelector('.highlights-title-slide')
  if (!slide) return
  const track = slide.querySelector('.highlights-bg-track')
  if (!track) return
  const imgs = track.querySelectorAll('img')
  if (imgs.length === 0) return
  const el = imgs[Math.floor(Math.random() * imgs.length)] as HTMLElement
  el.classList.add('pulse-tile')
  setTimeout(() => el.classList.remove('pulse-tile'), PULSE_DURATION_MS)
}

function runStaggeredAppear(slide: Element) {
  if (staggerDone) return
  staggerDone = true
  const track = slide.querySelector('.highlights-bg-track')
  if (!track) return
  const imgs = track.querySelectorAll('img')
  const delayStyle = (): string => `${Math.random() * STAGGER_WINDOW_MS}ms`
  imgs.forEach((el) => {
    const htmlEl = el as HTMLElement
    htmlEl.style.animationDelay = delayStyle()
    htmlEl.classList.add('tile-appear')
  })
}

onMounted(() => {
  const slide = document.querySelector('.highlights-title-slide')
  if (!slide) return
  observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries
      if (entry?.isIntersecting) {
        slide.classList.add('slide-entered')
        runStaggeredAppear(slide)
      }
    },
    { threshold: 0.2, rootMargin: '0px' }
  )
  observer.observe(slide)
  pulseInterval = setInterval(pulseRandomTile, PULSE_INTERVAL_MS)
})

onUnmounted(() => {
  if (pulseInterval) clearInterval(pulseInterval)
  if (observer) {
    const slide = document.querySelector('.highlights-title-slide')
    if (slide) observer.unobserve(slide)
    observer.disconnect()
  }
  staggerDone = false
  const slide = document.querySelector('.highlights-title-slide')
  if (slide) {
    slide.classList.remove('slide-entered')
    const imgs = slide.querySelectorAll('.highlights-bg-track img')
    imgs.forEach((el) => {
      const htmlEl = el as HTMLElement
      htmlEl.style.animationDelay = ''
      htmlEl.classList.remove('tile-appear')
    })
  }
})
</script>

<template>
  <span />
</template>
