<template>
  <div class="user-list">
    <div class="add-user-form">
      <h2>Add new user</h2>
      <input v-model="newUserName" placeholder="Username" />
      <span v-if="nameError" class="error-message">{{ nameError }}</span>
      <input v-model="newUserCompany" placeholder="Company Name" />
      <span v-if="companyError" class="error-message">{{ companyError }}</span>
      <button @click="addUser" class="btn add">Add</button>
    </div>

    <ul>
      <li v-for="user in userStore.users" :key="user.id" class="user-item">
        <div class="user-info">
          <strong>{{ user.name }}</strong> -
          <span>{{ user.company.name }}</span>
        </div>
        <div class="user-actions">
          <button @click="deleteUser(user.id)" class="btn delete">
            Delete
          </button>
          <button @click="openEditModal(user)" class="btn edit">Edit</button>
        </div>
      </li>
    </ul>

    <div v-if="isEditModalOpen" class="modal-overlay" @click="closeEditModal">
      <div class="modal-content" @click.stop>
        <h2>Edit information about user</h2>
        <input v-model="editUserName" placeholder="Edit Name" />
        <input v-model="editUserCompany" placeholder="Edit Company" />
        <div class="modal-actions">
          <button @click="saveEdit" class="btn save">Save</button>
          <button @click="closeEditModal" class="btn cancel">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Company {
  name: string;
}

interface User {
  id: string;
  name: string;
  company: Company;
}

import { ref, onMounted } from 'vue';
import { useUserStore } from '../store/userStore';
import { v4 as uuidv4 } from 'uuid';

const userStore = useUserStore();
const newUserName = ref('');
const newUserCompany = ref('');
const editUserName = ref('');
const editUserCompany = ref('');
let userToEdit = ref<User | null>(null);
const isEditModalOpen = ref(false);
const nameError = ref<string | null>(null);
const companyError = ref<string | null>(null);

const addUser = () => {
  nameError.value = null;
  companyError.value = null;

  if (!newUserName.value) {
    nameError.value = 'Username is required';
  }

  if (!newUserCompany.value) {
    companyError.value = 'Company name is required';
  }

  if (!nameError.value && !companyError.value) {
    const newUser = {
      id: uuidv4(),
      name: newUserName.value,
      company: { name: newUserCompany.value },
    };
    userStore.addUser(newUser);
    newUserName.value = '';
    newUserCompany.value = '';
  }
};

const deleteUser = (id: string) => {
  userStore.deleteUser(id);
};

const openEditModal = (user: User) => {
  userToEdit.value = user;
  editUserName.value = user.name;
  editUserCompany.value = user.company.name;
  isEditModalOpen.value = true;
};

const saveEdit = () => {
  if (!editUserName.value || !editUserCompany.value) {
    alert('Both fields must be filled');
    return;
  }

  if (userToEdit.value) {
    const updatedUser = {
      ...userToEdit.value,
      name: editUserName.value,
      company: { name: editUserCompany.value },
    };
    userStore.updateUser(updatedUser);
    closeEditModal();
  }
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
};

onMounted(async () => {
  await userStore.fetchUsers();
});
</script>

<style scoped>
.user-list {
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

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #e2e2e2;
  border-radius: 6px;
  background-color: #f9f9f9;
}

.user-info {
  font-size: 1.1rem;
}

.user-actions {
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
  max-width: 300px;
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn.add:hover {
  background-color: #367a39;
  transform: translateY(-2px);
}

.btn.delete {
  background-color: #ff6b6b;
  color: #fff;
}

.btn.delete:hover {
  background-color: #ff4c4c;
}

.btn.edit {
  background-color: #4caf50;
  color: #fff;
}

.btn.edit:hover {
  background-color: #45a047;
}

.add-user-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.add-user-form input {
  padding: 8px;
  border: 2px solid #e2e2e2;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  max-width: 300;
}

.add-user-form input:focus {
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
