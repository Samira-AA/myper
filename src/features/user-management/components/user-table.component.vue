<script>
import { useUserStore } from '../stores/user.store.js';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import {onMounted, ref} from 'vue';
import UserForm from "./user-form.component.vue";

export default {
  name: 'UserTable',
  components: {UserForm},
  setup() {
    const userStore = useUserStore();
    const confirm = useConfirm();
    const toast = useToast();
    const formVisible = ref(false);

    onMounted(() => {
      userStore.getUsers();
      console.log('users after api call', userStore.users);
    });

    const handleEdit = (user) => {
      userStore.setCurrentUser(user);
      formVisible.value = true;
    };

    const openCreateForm = () => {
      userStore.setCurrentUser(null);
      formVisible.value = true;
    };


    const handleDelete = (userId) => {
      confirm.require({
        message: 'Are you sure you want to delete this user?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          userStore.deleteUser(userId);
          toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User deleted',
            life: 3000
          });
        }
      });
    };

    return {
      userStore,
      formVisible,
      handleEdit,
      openCreateForm,
      handleDelete
    };
  },
};
</script>

<template>

  <PvButton label="New user" icon="pi pi-plus" class="mb-3" @click="openCreateForm" />
  <UserForm v-model:visible="formVisible" />


  <PvCard class="user-table-card">
    <template #title>List of Users</template>
    <template #content>

      <div v-if="userStore.loading" class="loading-state">
        <PvProgressSpinner />
        <p>Loading users...</p>
      </div>


      <PvMessage v-else-if="userStore.error" severity="error" :closable="false">
        Error loading users: {{ error }}
      </PvMessage>

      <PvDataTable
          v-else
          :value="userStore.users"
          :paginator="true"
          :rows="10"
          :rowsPerPageOptions="[5,10,20]"
          stripedRows
      >
        <PvColumn field="name" header="Name" sortable></PvColumn>
        <PvColumn field="username" header="Username" sortable></PvColumn>
        <PvColumn field="email" header="Email" sortable>
          <template #body="{ data }">
            <a :href="`mailto:${data.email}`">{{ data.email }}</a>
          </template>
        </PvColumn>
        <PvColumn field="phone" header="Phone"></PvColumn>

        <PvColumn header="Actions" :style="{ width: '150px' }">
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

  <PvToast />
  <PvConfirmDialog />
</template>

<style scoped>
.user-table-card {
  margin: 1rem;
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
</style>