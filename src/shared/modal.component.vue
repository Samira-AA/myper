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
    // emit update when dialog is manually closed or canceled
    const closeDialog = () => {
      emit('update:visible', false);
      emit('hide');
    };

    // handler for the update:visible event
    const handleUpdateVisible = (value) => {
      emit('update:visible', value);
    };

    return {
      closeDialog,
      handleUpdateVisible
    };
  }
};
</script>

<template>
  <PvDialog
      :visible="visible"
      @update:visible="handleUpdateVisible"
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
