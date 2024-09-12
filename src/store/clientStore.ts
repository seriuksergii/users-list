import { defineStore } from 'pinia';

interface ClientContact {
  id: number;
  name: string;
  email: string;
}

interface Client {
  id: number;
  title: string;
  description: string;
  assignedUser: ClientContact;
}

export const useClientsStore = defineStore('clientsStore', {
  state: (): { clients: Client[] } => ({
    clients: [
      {
        id: 1,
        title: 'sample text',
        description: 'sample',
        assignedUser: {
          id: 1,
          name: 'sample',
          email: 'sample@sample.com',
        },
      },
      {
        id: 2,
        title: 'sample text2',
        description: 'sample2',
        assignedUser: {
          id: 2,
          name: 'sample2',
          email: 'sampl2e@samp2le.com',
        },
      },
    ],
  }),
  actions: {
    addClient(newClient: Client) {
      this.clients.push(newClient);
    },

    deleteClient(clientId: number) {
      this.clients = this.clients.filter((client) => client.id !== clientId);
    },

    updateClient(clientId: number, updatedClient: Partial<Client>) {
      const clientIndex = this.clients.findIndex(
        (client) => client.id === clientId
      );
      if (clientIndex !== -1) {
        this.clients[clientIndex] = {
          ...this.clients[clientIndex],
          ...updatedClient,
        };
      }
    },
  },
});
