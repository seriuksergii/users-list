<template>
  <div class="client-list">
    <div class="add-client-form">
      <h2>Add New Client</h2>
      <input v-model="newClient.title" placeholder="Company" />
      <input v-model="newClient.description" placeholder="Description" />
      <input v-model="newClient.assignedUser.name" placeholder="Full Name" />
      <span v-if="nameError" class="error-message">{{ nameError }}</span>
      <input v-model="newClient.assignedUser.email" placeholder="Email" />
      <span v-if="emailError" class="error-message">{{ emailError }}</span>
      <button @click="addClient" class="btn add">Add Client</button>
    </div>

    <h2>Client List</h2>
    <ul>
      <li v-for="client in clients" :key="client.id" class="client-item">
        <div class="client-info">
          <strong>{{ client.title }}</strong> - {{ client.description }}
          <br />
          {{ client.assignedUser.name }} E-mail: {{ client.assignedUser.email }}
        </div>
        <div class="client-actions">
          <button @click="removeClient(client.id)" class="btn delete">
            Delete
          </button>
          <button @click="openEditModal(client)" class="btn edit">Edit</button>
        </div>
      </li>
    </ul>

    <div v-if="isEditModalOpen" class="modal-overlay" @click="closeEditModal">
      <div class="modal-content" @click.stop>
        <h2>Edit information about client</h2>
        <input v-model="editClient.title" placeholder="Edit Company" />
        <input
          v-model="editClient.description"
          placeholder="Edit Description"
        />
        <input
          v-model="editClient.assignedUser.name"
          placeholder="Edit Full Name"
        />
        <input
          v-model="editClient.assignedUser.email"
          placeholder="Edit Email"
        />
        <span v-if="editEmailError" class="error-message">{{
          editEmailError
        }}</span>
        <div class="modal-actions">
          <button @click="saveEdit" class="btn save">Save</button>
          <button @click="closeEditModal" class="btn cancel">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from 'vue';
import { useClientsStore } from '../store/clientStore';

const clientsStore = useClientsStore();

const newClient = reactive({
  id: null,
  title: '',
  description: '',
  assignedUser: {
    id: null,
    name: '',
    email: '',
  },
});

const nameError = ref(null);
const emailError = ref(null);
const editEmailError = ref(null);

const clients = computed(() => clientsStore.clients);

const editClient = reactive({
  id: null,
  title: '',
  description: '',
  assignedUser: {
    id: null,
    name: '',
    email: '',
  },
});

let clientToEdit = ref(null);
const isEditModalOpen = ref(false);

const addClient = () => {
  nameError.value = null;
  emailError.value = null;

  if (!newClient.assignedUser.name) {
    nameError.value = 'Full Name is required';
  }

  if (!newClient.assignedUser.email.includes('@')) {
    emailError.value = 'Email must contain "@"';
  }

  if (!nameError.value && !emailError.value) {
    const newClientId = clientsStore.clients.length + 1;

    clientsStore.addClient({
      id: newClientId,
      title: newClient.title,
      description: newClient.description,
      assignedUser: {
        id: newClientId,
        name: newClient.assignedUser.name,
        email: newClient.assignedUser.email,
      },
    });

    newClient.title = '';
    newClient.description = '';
    newClient.assignedUser.name = '';
    newClient.assignedUser.email = '';
  }
};

const removeClient = (clientId) => {
  clientsStore.deleteClient(clientId);
};

const openEditModal = (client) => {
  clientToEdit.value = client;
  editClient.id = client.id;
  editClient.title = client.title;
  editClient.description = client.description;
  editClient.assignedUser.name = client.assignedUser.name;
  editClient.assignedUser.email = client.assignedUser.email;
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
};

const saveEdit = () => {
  editEmailError.value = null;

  if (!editClient.assignedUser.email.includes('@')) {
    editEmailError.value = 'Email must contain "@"';
    return;
  }

  clientsStore.updateClient(editClient.id, {
    title: editClient.title,
    description: editClient.description,
    assignedUser: {
      name: editClient.assignedUser.name,
      email: editClient.assignedUser.email,
    },
  });

  closeEditModal();
};
</script>

<style scoped>
.client-list {
  font-family: 'Arial', sans-serif;
  padding: 20px;
}

h2 {
  color: #333;
  text-transform: uppercase;
  color: #45a047;
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

.client-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #e2e2e2;
  border-radius: 6px;
  background-color: #f9f9f9;
}

.client-info {
  font-size: 1.1rem;
}

.client-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn.add {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn.add:hover {
  background-color: #367a39;
  transform: translateY(-2px);
}

.btn.delete {
  background-color: #ff6b6b;
  color: white;
}

.btn.delete:hover {
  background-color: #ff4c4c;
}

.btn.edit {
  background-color: #4caf50;
  color: white;
}

.btn.edit:hover {
  background-color: #45a047;
}

.add-client-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.add-client-form input {
  padding: 8px;
  border: 2px solid #e2e2e2;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.add-client-form input:focus {
  outline: none;
  border-color: #45a047;
}

.error-message {
  color: red;
  font-size: 0.875rem;
  margin-bottom: 5px;
}

.modal-content {
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  text-align: center;
  box-sizing: border-box;
}

.modal-content input {
  width: 100%;
  padding: 15px;
  margin: 15px 0;
  border: 2px solid #e2e2e2;
  border-radius: 6px;
  box-sizing: border-box;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.btn.save,
.btn.cancel {
  width: 48%;
  padding: 10px 20px;
  border-radius: 6px;
}

.btn.save {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
}

.btn.save:hover {
  background-color: #45a047;
}

.btn.cancel {
  background-color: #ff6b6b;
  color: white;
  padding: 10px 20px;
}

.btn.cancel:hover {
  background-color: #ff4c4c;
}
</style>
