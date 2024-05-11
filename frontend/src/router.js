import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
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
            meta: { requiresAuth: true }, // Oznacz trasę, która wymaga autoryzacji
        },
        {
            path: "/zapotrzebowanie_kaloryczne",
            name: "CaloricDemandView",
            component: () => import("./views/CaloricDemandView.vue"),
            meta: { requiresAuth: true }, // Oznacz trasę, która wymaga autoryzacji
        },
        {
            path: "/dziennik",
            name: "JournalView",
            component: () => import("./views/JournalView.vue"),
            meta: { requiresAuth: true }, // Oznacz trasę, która wymaga autoryzacji
        },
    ],
});

router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem("login");
    if (to.matched.some((record) => record.meta.requiresAuth) && !isLoggedIn) {
        next({ name: "Login" }); // przekierowanie do strony logowania jeśli użytkownik nie jest zalogowany
    } else {
        next();
    }
});

export default router;
