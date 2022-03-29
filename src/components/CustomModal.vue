<template>
  <vue-final-modal
    v-slot="{ params, close }"
    v-bind="$attrs"
    classes="modal-container"
    content-class="modal-content"
  >
    <span class="modal__title">
      <slot name="title"></slot>
    </span>
    <div class="modal__content">
      <slot v-bind:params="params"></slot>
    </div>
    <div class="modal__action">
      <v-button class="modal__clear" @click="$emit('clear', close)">clear</v-button>
      <v-button class="modal__cancel" @click="$emit('cancel', close)">cancel</v-button>
      <v-button class="modal__add" @click="$emit('add', close)">add</v-button>
    </div>
  </vue-final-modal>
</template>

<script>
import VButton from '@/components/app/v-button'

export default {
  name: 'CustomModal',
  inheritAttrs: false,
  components: {
    VButton
  }
}
</script>

<style scoped>
::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

::v-deep .modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  margin: 0 1rem;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
  width: 100%;
  max-width: 750px;
}

.modal__title {
  margin: 0 2rem 1rem 0;
  font-weight: 700;
  font-size: 32px;
  line-height: 38px;
  font-weight: 700;
}

.modal__content {
  flex-grow: 1;
  overflow-y: auto;
}

.modal__action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
}

.modal__cancel {
  margin-left: auto;
  margin-right: 15px;
}

.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>

<style scoped>
.dark-mode div::v-deep .modal-content {
  border-color: #2d3748;
  background-color: #1a202c;
}
</style>
