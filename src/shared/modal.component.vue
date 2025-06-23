<script>
export default {
  name: 'Modal',
  props: {
    visible: Boolean,
    header: String,
    closable: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:visible', 'hide'],
  setup(props, { emit }) {
    const closeDialog = () => {
      emit('update:visible', false);
      emit('hide');
    };

    return {
      closeDialog
    };
  }
};
</script>

<template>
  <PvDialog
      :visible="visible"
      @update:visible="value => emit('update:visible', value)"
      :header="header"
      modal
      class="modal"
      :closable="closable"
      @hide="closeDialog"
  >
    <slot></slot>
  </PvDialog>
</template>

<style>
.modal {
  width: 30%;
}

@media (max-width: 768px) {
  .modal {
    width: 70%;
  }
}
</style>