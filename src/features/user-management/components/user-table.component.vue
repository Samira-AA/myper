<script>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/user.store.js';
import { useToast } from 'primevue/usetoast';
import Modal from '../../../shared/modal.component.vue';
import AppLoader from '../../../shared/app-loader.component.vue';

export default {
  name: 'UserTable',
  components: {
    Modal,
    AppLoader
  },
  emits: ['edit'],
  setup(props, { emit }) {
    const userStore = useUserStore();
    const toast = useToast();

    // for controlling delete confirmation modal
    const deleteConfirmVisible = ref(false);

    // to store the ID of the user to be deleted
    const userIdToDelete = ref(null);

    // load users on component mount
    onMounted(() => {
      userStore.getUsers();
    });

    // emit edit event with user data for the parent component (user-form)
    const handleEdit = (user) => {
      emit('edit', user);
    };

    // open delete confirmation modal
    const handleDelete = (id) => {
      userIdToDelete.value = id;
      deleteConfirmVisible.value = true;
    };

    // confirm deletion
    const confirmDelete = () => {
      userStore.deleteUser(userIdToDelete.value);
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'User deleted',
        life: 3000
      });
      deleteConfirmVisible.value = false;
    };

    return {
      userStore,
      handleEdit,
      handleDelete,
      confirmDelete,
      deleteConfirmVisible
    };
  }
};
</script>

<template>
  <PvCard class="user-table-card">
    <template #title>List of Users</template>
    <template #content>

      <!-- Show loader while fetching users -->
      <div v-if="userStore.loading" class="loading-state">
        <AppLoader />
      </div>

      <!-- Show error if loading fails -->
      <PvMessage v-else-if="userStore.error" severity="error" :closable="false">
        Error loading users: {{ userStore.error }}
      </PvMessage>

      <PvDataTable
          v-else
          :value="userStore.users"
          :paginator="true"
          :rows="10"
          :rowsPerPageOptions="[5, 10, 20]"
          stripedRows
      >
        <PvColumn field="name" header="NAME" sortable></PvColumn>
        <PvColumn field="username" header="USERNAME" sortable></PvColumn>
        <PvColumn field="email" header="EMAIL" sortable>
          <template #body="{ data }">
            <a :href="`mailto:${data.email}`">{{ data.email }}</a>
          </template>
        </PvColumn>
        <PvColumn field="phone" header="PHONE"></PvColumn>

        <PvColumn header="ACTIONS" :style="{ width: '150px' }">
          <template #body="{ data }">
            <div class="action-buttons">
              <PvButton
                  icon="pi pi-pencil"
                  severity="info"
                  text
                  rounded
                  @click="handleEdit(data)"
              />
              <PvButton
                  icon="pi pi-trash"
                  severity="danger"
                  text
                  rounded
                  @click="handleDelete(data.id)"
              />
            </div>
          </template>
        </PvColumn>

        <template #empty>
          <div class="empty-table">
            <PvMessage severity="info" :closable="false">
              No users found
            </PvMessage>
          </div>
        </template>
      </PvDataTable>
    </template>
  </PvCard>

  <!-- Delete confirmation modal -->
  <Modal
      :visible="deleteConfirmVisible"
      header="Confirm Deletion"
      @update:visible="deleteConfirmVisible = $event"
  >
    <div class="p-4">
      <p>Are you sure you want to delete this user?</p>
      <div class="buttons">
        <PvButton label="Cancel" severity="secondary" @click="deleteConfirmVisible = false" />
        <PvButton label="Yes, Delete" severity="danger" @click="confirmDelete" />
      </div>
    </div>
  </Modal>

  <PvToast />
</template>

<style scoped>
.user-table-card {
  margin: 1rem;
  background-color: white;
}

.p-card-title {
  display: flex;
  text-align: start;
  font-weight: bolder;
  font-size: 1.2rem;
  padding: 0.5rem;
  color: #232d3a;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.empty-table {
  padding: 1rem;
  text-align: center;
}

.p-message {
  margin: 1rem 0;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
</style>
