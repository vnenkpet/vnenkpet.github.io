<script setup lang="ts">
</script>

<template>
  <div class="slidev-layout content-stagger w-full h-full p-8 flex flex-col justify-center">
    <div class="content-stagger-inner">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.content-stagger-inner {
  max-width: 88%;
  margin: 0 auto;
}

/* Title entrance: same feel as project detail pages */
.content-stagger-inner :deep(h1) {
  margin-bottom: 0.5em;
  font-size: clamp(1.5rem, 3.5vw, 2.25rem);
  opacity: 0;
  transform: translateY(20px) scale(0.98);
  animation: content-title-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards;
}

@keyframes content-title-in {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Staggered list items: same as ProjectShowcase accomplishStagger */
.content-stagger-inner :deep(ul) {
  list-style: disc;
  padding-left: 1.5em;
  margin: 0.5em 0;
}

.content-stagger-inner :deep(li) {
  opacity: 0;
  transform: translateX(20px);
  animation: accomplishStagger 0.5s ease-out forwards;
  margin-bottom: 0.6em;
}

.content-stagger-inner :deep(li:last-child) {
  margin-bottom: 0;
}

.content-stagger-inner :deep(li:nth-child(1)) { animation-delay: 0.2s; }
.content-stagger-inner :deep(li:nth-child(2)) { animation-delay: 0.33s; }
.content-stagger-inner :deep(li:nth-child(3)) { animation-delay: 0.46s; }
.content-stagger-inner :deep(li:nth-child(4)) { animation-delay: 0.59s; }
.content-stagger-inner :deep(li:nth-child(5)) { animation-delay: 0.72s; }
.content-stagger-inner :deep(li:nth-child(6)) { animation-delay: 0.85s; }
.content-stagger-inner :deep(li:nth-child(7)) { animation-delay: 0.98s; }
.content-stagger-inner :deep(li:nth-child(8)) { animation-delay: 1.11s; }
.content-stagger-inner :deep(li:nth-child(9)) { animation-delay: 1.24s; }
.content-stagger-inner :deep(li:nth-child(10)) { animation-delay: 1.37s; }

@keyframes accomplishStagger {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
