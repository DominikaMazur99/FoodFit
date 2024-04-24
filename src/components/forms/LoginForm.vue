<template>
    <div class="common-box">
        <div class="app-name">
            <app-name></app-name>
        </div>
        <div class="login-text">Zaloguj się!</div>
        <div class="spacer"></div>
        <input-field
            name="username"
            label="Nazwa użytkownika"
            v-model="username"
            @change="updateUsername"
        ></input-field>
        <input-field
            name="password"
            label="Hasło"
            type="password"
        ></input-field>
        <router-link to="/menu">
            <button-login name="Zaloguj"></button-login>
        </router-link>
        <p class="message-text">
            <router-link to="/rejestracja"
                >Nie posiadasz jeszcze konta? Zarejestruj się!</router-link
            >
        </p>
        <p>Wartość pola nazwa użytkownika: {{ username }}</p>
    </div>
</template>

<script>
import InputField from "../inputComponents/InputField.vue";
import SubmitButton from "../buttons/SubmitButton.vue";
import AppNameText from "../textComponents/AppNameText.vue";
import { ref } from "vue";
export default {
    components: {
        "input-field": InputField,
        "button-login": SubmitButton,
        "app-name": AppNameText,
    },
    data() {
        return {
            username: ref(""),
        };
    },
    methods: {
        //tu musi być update tego pola, które definiuje w komponencie
        // to pole jest tutaj bo tu chcemy miec dane ktore wyslemy do zapisu
        updateUsername(event) {
            this.username = event.target.value;
        },
    },
};
</script>

<style>
@import "../styles/common-style.css";
</style>
