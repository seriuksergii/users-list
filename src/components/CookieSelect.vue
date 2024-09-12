<template>
  <div class="cookie-select">
    <label class="checkbox-label">
      <input type="checkbox" v-model="saveToCookies" />
      <span>Save to cookies</span>
    </label>
    <div class="select-wrapper">
      <select v-model="selectedValue">
        <option value="English">English</option>
        <option value="Ukrainian">Ukrainian</option>
        <option value="Poland">Poland</option>
      </select>
    </div>
    <p class="selected-text">Selected: {{ selectedValue }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const saveToCookies = ref(false);
const selectedValue = ref('English');

watch([saveToCookies, selectedValue], ([save, value]) => {
  if (save) {
    document.cookie = `selectedValue=${value}; max-age=${15 * 60}`;
  }
});

onMounted(() => {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith('selectedValue='))
    ?.split('=')[1];

  if (cookieValue) {
    selectedValue.value = cookieValue;
  }
});
</script>

<style scoped>
.cookie-select {
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: 'Arial', sans-serif;
  max-width: 400px;
  margin: 20px auto;
  padding: 25px;
  border: 1px solid #e2e2e2;
  border-radius: 12px;
  background-color: #f9fafb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 16px;
}

.select-wrapper {
  position: relative;
  width: 100%;
}

select {
  width: 100%;
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid #ced4da;
  background-color: #fff;
  font-size: 16px;
  color: #495057;
  appearance: none;
  cursor: pointer;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

select:hover {
  border-color: #45a047;
}

select:focus {
  outline: none;
  border-color: #45a047;
}

.select-wrapper::after {
  content: '▼';
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 16px;
  color: #495057;
}

.selected-text {
  font-size: 18px;
  color: #212529;
  text-align: center;
  font-weight: 500;
}
</style>
