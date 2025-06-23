<script>
import UserTable from '../components/user-table.component.vue';
import UserForm from '../components/user-form.component.vue';
import { ref } from 'vue';
import { useUserStore } from '../stores/user.store.js';

export default {
  name: 'UserManagementPage',
  components: {
    UserTable,
    UserForm
  },
  setup() {
    const formVisible = ref(false);
    const userStore = useUserStore();

    const openCreateForm = () => {
      userStore.setCurrentUser(null);
      formVisible.value = true;
    };

    const handleEdit = (user) => {
      userStore.setCurrentUser(user);
      formVisible.value = true;
    };

    return {
      formVisible,
      openCreateForm,
      handleEdit
    };
  }
};
</script>

<template>
  <div class="user-management-page">
    <header class="page-header">
      <div class="header-content">
        <div class="title">
          <p>User Management</p>
          <i class="pi pi-users" style="color: #708090; font-size: 2.5rem"></i>
        </div>
        <PvButton label="New user" icon="pi pi-plus" class="add-button" @click="openCreateForm" />
      </div>
    </header>

    <main>
      <UserTable @edit="handleEdit" />
      <UserForm :visible="formVisible" @update:visible="formVisible = $event" />
    </main>
  </div>
</template>

<style scoped>
.user-management-page {
  padding: 2rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 0 2rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.page-header p {
  font-size: 2rem;
  font-weight: bold;
  color: #232d3a;
}

.title {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.add-button {
  font-size: 1rem;
  padding: 0.5rem 1rem;
}
</style>
