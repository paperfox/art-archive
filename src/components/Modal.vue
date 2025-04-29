<script setup>
import { inject, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

const isModalVisible = inject('isModalVisible');
const modalImage = inject('modalImage');
const closeModal = inject('closeModal');

const modal = ref(null);

onClickOutside(modal, () => {
  closeModal();
});
</script>

<template>
  <div :class="`${isModalVisible ? 'modal is-visible' : 'modal'}`" id="art-modal" v-show="isModalVisible">
    <div class="modal-dialog" ref="modal">
      <header class="modal-header">
        <h2 class="modal-title">{{ modalImage?.title }}</h2>
        <button class="close-modal" aria-label="close modal" @click="closeModal">×</button>
      </header>
      <section class="modal-content">
        <img :src="`./art/${modalImage?.link}`" :alt="modalImage?.desc" />
        <div>
          <p>
            {{ modalImage?.date }} &nbsp; | &nbsp;
            {{ modalImage?.media.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(', ') }}
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  background: rgba(var(--black), 0.8);
  cursor: pointer;
  display: none;
  backdrop-filter: blur(3px);
  width: 100%;
  height: 100%;
}

.modal-content {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: var(--xs-spacing) 2.4rem var(--base-spacing);

  * {
    margin: var(--base-spacing) auto;
  }

  div:has(img) {
    max-width: 70rem;
  }

  img {
    max-width: 100%;
    max-height: 65vh;
  }
}

.modal.is-visible {
  display: flex;
}

.modal-dialog {
  border-radius: 0.4rem;
  background: var(--main-bg);
  overflow: auto;
  cursor: default;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--xs-spacing);

  .modal-title {
    margin-inline: auto;
    padding-left: 5.6rem; /* accomodates the close button */
  }

  .close-modal {
    color: var(--link);
    float: right;
    font-size: 4.2rem;
    background: none;
    border: 0.1rem solid transparent;
    cursor: pointer;
    padding: 0 var(--base-spacing);

    &:hover,
    &:focus-visible {
      color: var(--text-body);
    }
  }
}
</style>
