import { defineStore } from "pinia";
import { cookie } from "../utils/cookie";
import backendApi from "../services/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as null | { name: string; email: string },
    showLoginModal: false,
    showUploadModal: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    async loadUser() {
      const token = cookie.get("token");

      if (!token) return;

      const userId = cookie.get('userId');

      if(!userId) return;

      try {
        const { data } = await backendApi.get(`/users/${userId}`);

        this.user = data;
      } catch (err) {
        console.error("Erro ao carregar usuário:", err);

        this.logout();
      }
    },

    async login(email: string, password: string) {
      try {
        const { data } = await backendApi.post("/auth/login", {
          email,
          password,
        });

        cookie.set("token", data.access_token);
        cookie.set("userId", data.id)

        await this.loadUser();

        this.showLoginModal = false;
      } catch (err) {
        console.error("Erro ao fazer login:", err);
        throw err;
      }
    },

    logout() {
      cookie.destroy("token");

      this.user = null;
    },
  },
});
