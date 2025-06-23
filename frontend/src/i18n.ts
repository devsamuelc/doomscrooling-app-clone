import { createI18n } from "vue-i18n";

const messages = {
  pt: {
    loading: "Carregando",
    logout: "Logout",
    login: "Login",
    upload: "Subir Vídeo",
    loginModal: {
      title: "Login",
      emailLabel: "Email",
      passwordLabel: "Senha",
      submit: "Entrar",
    },
    uploadModal: {
      title: "Upload de Vídeo",
      step1: {
        label: "Selecione um vídeo (.mp4, máx. 10MB)",
        sending: "Enviando...",
        submit: "Enviar vídeo",
      },
      step2: {
        titleLabel: "Título",
        descriptionLabel: "Descrição",
        saving: "Salvando...",
        submit: "Salvar vídeo",
      },
    },
    videoCard: {
      by: "por",
      anonymous: "Anônimo",
      like: "❤️",
      comments: "Comentários",
      close: "Fechar",
    },
    commentsSidebar: {
      title: "Comentários",
      placeholder: "Escreva um comentário...",
      send: "Enviar",
      loginToComment: "Faça login para comentar.",
    },
  },
  en: {
    loading: "Loading",
    logout: "Log out",
    login: "Log in",
    upload: "Upload Video",
    loginModal: {
      title: "Login",
      emailLabel: "Email",
      passwordLabel: "Password",
      submit: "Sign in",
    },
    uploadModal: {
      title: "Upload Video",
      step1: {
        label: "Select a video (.mp4, max 10MB)",
        sending: "Sending...",
        submit: "Upload Video",
      },
      step2: {
        titleLabel: "Title",
        descriptionLabel: "Description",
        saving: "Saving...",
        submit: "Save Video",
      },
    },
    videoCard: {
      by: "by",
      anonymous: "Anonymous",
      like: "❤️",
      comments: "Comments",
      close: "Close",
    },
    commentsSidebar: {
      title: "Comments",
      placeholder: "Write a comment...",
      send: "Send",
      loginToComment: "Log in to comment.",
    },
  },
};

const i18n = createI18n({
  locale: "pt",
  fallbackLocale: "en",
  legacy: false,
  messages,
});

export default i18n;
