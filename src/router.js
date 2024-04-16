import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Login",
            component: () => import("./views/LoginView.vue"),
        },
        {
            path: "/rejestracja",
            name: "Register",
            component: () => import("./views/RegisterView.vue"),
        },
        {
            path: "/menu",
            name: "MenuView",
            component: () => import("./views/MenuView.vue"),
        },
        {
            path: "/dziennik_posilkow",
            name: "MealsJournalView",
            component: () => import("./views/MealsJournalView.vue"),
        },
    ],
});
