<template>
    <div class="common-box">
        <div class="app-name-menu">
            <app-name></app-name>
        </div>
        <div class="btn-box">
            <menu-btn name="Dziennik posiłków i aktywności"></menu-btn>
            <router-link to="/zapotrzebowanie_kaloryczne">
                <menu-btn name="Zapotrzebowanie kaloryczne"></menu-btn>
            </router-link>

            <menu-btn name="Postępy"></menu-btn>

            <router-link to="/">
                <menu-btn
                    name="Wyloguj"
                    @click="localStorage.clear()"
                ></menu-btn>
            </router-link>
        </div>
    </div>
</template>

<script>
import AppNameText from "../textComponents/AppNameText.vue";
import MenuButton from "../buttons/MenuButton.vue";
export default {
    components: {
        "app-name": AppNameText,
        "menu-btn": MenuButton,
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
