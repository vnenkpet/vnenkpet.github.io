<script setup lang="ts">
</script>

<template>
  <div class="section-title-slide">
    <div class="section-title-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.section-title-slide {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 2rem;
  overflow: hidden;
}

.section-title-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.section-title-content :deep(h1) {
  font-size: clamp(2rem, 5vw, 3rem);
  margin: 0;
  opacity: 0;
  transform: translateY(24px) scale(0.96);
  animation: section-title-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
}

@keyframes section-title-in {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
