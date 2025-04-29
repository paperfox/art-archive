<script setup>
import { inject } from 'vue';

defineProps(['images']);

const condense = (img) => {
  return img.split(' ').join('').replace(',', '').replace('’', '');
};

const openModal = inject('openModal');

const modal = (imgData) => {
  openModal(imgData);
};
</script>

<template>
  <ul class="art-list" aria-live="polite">
    <li v-for="(image, index) of images" :key="condense(image.title)">
      <div :class="`artpiece--${index}`">
        <button type="button" class="btn-modal" :data-open="`modal${condense(image.title)}`" @click="modal(image)">
          <figure>
            <img :src="`./art/preview/${image.link}`" :alt="image.desc" />
            <figcaption>{{ image.title }}</figcaption>
          </figure>
        </button>
      </div>
    </li>
  </ul>
</template>
