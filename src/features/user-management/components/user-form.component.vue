<script>
import { ref, watch, computed } from 'vue';
import { useUserStore } from '../stores/user.store.js';
import { useToast } from 'primevue/usetoast';

export default {
  name: 'UserForm',
  props: {
    visible: Boolean
  },
  emits: ['update:visible'],
  setup(props, { emit }) {
    const userStore = useUserStore();
    const toast = useToast();

    const form = ref({
      id: null,
      name: '',
      username: '',
      email: '',
      phone: ''
    });

    const emailError = ref(false);

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

    const isEditMode = computed(() => !!userStore.currentUser);

    watch(
        () => userStore.currentUser,
        (user) => {
          if (user) {
            form.value = { ...user };
          } else {
            resetForm();
          }
        },
        { immediate: true }
    );

    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const handleSubmit = () => {
      console.log('Saving user:', form.value);

      if (!validateEmail(form.value.email)) {
        emailError.value = true;
        return;
      }
      emailError.value = false;

      if (isEditMode.value) {
        userStore.updateUser({ ...form.value });
        toast.add({
          severity: 'success',
          summary: 'User updated',
          life: 2000
        });
      } else {
        userStore.addUser({ ...form.value });
        toast.add({
          severity: 'success',
          summary: 'User created',
          life: 2000
        });
      }

      closeDialog();
    };

    const closeDialog = () => {
      userStore.setCurrentUser(null);
      emit('update:visible', false);
      resetForm();
    };

    return {
      form,
      handleSubmit,
      closeDialog,
      emailError,
      isEditMode
    };
  }
};
</script>

<template>
  <PvDialog
      :visible="visible"
      @update:visible="value => emit('update:visible', value)"
      :header="isEditMode ? 'Edit User' : 'New User'"
      modal
      class="w-11/12 md:w-6/12"
      :closable="true"
      @hide="closeDialog"
      >
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <div>
        <label for="name">Name</label>
        <PvInputText v-model="form.name" id="name" required />
      </div>

      <div>
        <label for="username">Username</label>
        <PvInputText v-model="form.username" id="username" required />
      </div>

      <div>
        <label for="email">Email</label>
        <PvInputText v-model="form.email" id="email" required type="email" />
        <small v-if="emailError" class="text-red-500">Invalid Email</small>
      </div>

      <div>
        <label for="phone">Phone</label>
        <PvInputText v-model="form.phone" id="phone" required />
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <PvButton label="Cancel" severity="secondary" @click="closeDialog" />
        <PvButton label="Save" type="submit" />
      </div>
    </form>
  </PvDialog>
</template>

<style scoped>
label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: bold;
}
</style>
