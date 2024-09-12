import { defineStore } from 'pinia';

interface Company {
  name: string;
}

interface User {
  id: string;
  name: string;
  company: Company;
}

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [] as User[],
  }),

  actions: {
    addUser(newUser: User) {
      this.users.push(newUser);
    },
    deleteUser(id: string) {
      this.users = this.users.filter((user) => user.id !== id);
    },
    updateUser(updatedUser: User) {
      const index = this.users.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        this.users[index] = updatedUser;
      }
    },
    async fetchUsers() {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      const data = await response.json();
      this.users = data.map((user: any) => ({
        id: user.id,
        name: user.name,
        company: { name: user.company.name },
      }));
    },
  },
});
