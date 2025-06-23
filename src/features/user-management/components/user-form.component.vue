<script>
import { ref, watch, computed } from 'vue';
import { useUserStore } from '../stores/user.store.js';
import { useToast } from 'primevue/usetoast';
import Modal from '../../../shared/modal.component.vue';

export default {
  name: 'UserForm',
  components: { Modal },
  props: {
    visible: Boolean
  },
  emits: ['update:visible'],
  setup(props, { emit }) {
    const userStore = useUserStore();
    const toast = useToast();

    // form data
    const form = ref({
      id: null,
      name: '',
      username: '',
      email: '',
      phone: ''
    });

    // email validation state
    const emailError = ref(false);

    // determine if we are editing an existing user
    const isEditMode = computed(() => !!userStore.currentUser);

    // fill the form if there's a user for editing, if not, reset the form and create
    watch(() => userStore.currentUser, (user) => {
      if (user) {
        form.value = { ...user };
      } else {
        resetForm();
      }
    }, { immediate: true });

    // Validate simple email format
    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

    // Reset form to initial state
    const resetForm = () => {
      form.value = {
        id: null,
        name: '',
        username: '',
        email: '',
        phone: ''
      };
      emailError.value = false;
    };

    // submit form data
    const handleSubmit = () => {
      if (!isValidEmail(form.value.email)) {
        emailError.value = true;
        return;
      }

      emailError.value = false;

      if (isEditMode.value) {
        userStore.updateUser({...form.value});
        toast.add({severity: 'success', summary: 'User updated', life: 2000});
      } else {
        userStore.addUser({...form.value});
        toast.add({severity: 'success', summary: 'User created', life: 2000});
      }

      closeDialog();
    };

    // close the modal and reset form
    const closeDialog = () => {
      emit('update:visible', false);
      userStore.setCurrentUser(null);
      resetForm();
    };

    return {
      form,
      emailError,
      isEditMode,
      handleSubmit,
      closeDialog
    };
  }
};
</script>

<template>
  <Modal
      :visible="visible"
      @update:visible="value => emit('update:visible', value)"
      :header="isEditMode ? 'Edit User' : 'New User'"
      @hide="closeDialog"
  >
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">

      <div class="input-group">
        <label for="name">Name</label>
        <PvInputText v-model="form.name" id="name" required/>
      </div>

      <div class="input-group">
        <label for="username">Username</label>
        <PvInputText v-model="form.username" id="username" required/>
      </div>

      <div class="input-group">
        <label for="email">Email</label>
        <PvInputText v-model="form.email" id="email" required type="email"/>
        <small v-if="emailError" class="text-red-500">Invalid Email</small>
      </div>

      <div class="input-group">
        <label for="phone">Phone</label>
        <PvInputText v-model="form.phone" id="phone" required/>
      </div>

      <div class="buttons">
        <PvButton label="Cancel" severity="secondary" @click="closeDialog"/>
        <PvButton label="Save" type="submit"/>
      </div>
    </form>
  </Modal>
</template>

<style scoped>
label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.input-group {
  margin-bottom: 1rem;
}

.input-group input {
  width: 100%;
  box-sizing: border-box;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
</style>
