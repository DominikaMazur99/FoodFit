<template>
    <div class="common-box">
        <div class="app-name-menu">
            <app-name></app-name>
        </div>
        <div class="btn-box">
            <router-link to="/dziennik">
                <menu-btn name="Dziennik posiłków i aktywności"></menu-btn
            ></router-link>
            <router-link to="/zapotrzebowanie_kaloryczne">
                <menu-btn name="Zapotrzebowanie kaloryczne"></menu-btn>
            </router-link>

            <router-link to="/postepy">
                <menu-btn name="Postępy"></menu-btn
            ></router-link>

            <menu-btn name="Wyloguj" @click="logout"></menu-btn>
        </div>
    </div>
</template>

<script>
import AppNameText from "../textComponents/AppNameText.vue";
import MenuButton from "../buttons/MenuButton.vue";
import { inject } from "vue";
export default {
    setup() {
        const useUserActivitiesStore = inject("userActivitiesStore");
        return { useUserActivitiesStore };
    },
    components: {
        "app-name": AppNameText,
        "menu-btn": MenuButton,
    },
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push("/");
            this.useUserActivitiesStore.clearStore();
        },
    },
};
</script>

<style>
@import "../styles/common-style.css";
.app-name-menu {
    align-self: center;
    margin-bottom: 10px;
}

.btn-box {
    margin-bottom: 1rem;
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: relative;
}

/* Apply margin-bottom to each button */
.menu-btn {
    margin-bottom: 1rem; /* Adjust as needed */
}
</style>
