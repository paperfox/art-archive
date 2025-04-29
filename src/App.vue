<script setup>
import { ref, provide } from 'vue';
import DisplayArt from './components/DisplayArt.vue';
import LeftRail from './components/LeftRail.vue';
import Modal from './components/Modal.vue';
import Footer from './components/Footer.vue';

const isModalVisible = ref(false);
const modalImage = ref(null);

const openModal = (image) => {
  modalImage.value = image;
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

provide('openModal', openModal);
provide('closeModal', closeModal);
provide('modalImage', modalImage);
provide('isModalVisible', isModalVisible);
</script>

<template>
  <div class="container">
    <LeftRail />
    <DisplayArt />
    <Footer />
    <Modal />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500..700&display=swap');
</style>
