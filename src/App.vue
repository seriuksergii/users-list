<template>
  <div class="app-container">
    <h1>Users list</h1>
    <CookieSelect />
    <UserList />
    <ClientList />
  </div>
</template>

<script setup lang="ts">
import CookieSelect from './components/CookieSelect.vue';
import UserList from './components/UserList.vue';
import ClientList from './components/ClientList.vue';
</script>

<style scoped>
.app-container {
  max-width: 768px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  font-family: 'Arial', sans-serif;
  text-align: center;
  color: #45a047;
  text-transform: uppercase;
}
</style>
