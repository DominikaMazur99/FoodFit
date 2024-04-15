<template>
    <div class="common-box">
        <div class="app-name">
            <app-name></app-name>
        </div>
        <div class="login-text">Zaloguj się!</div>
        <div class="spacer"></div>
        <input-field name="username" label="Nazwa użytkownika"></input-field>
        <input-field
            name="password"
            label="Hasło"
            type="password"
        ></input-field>
        <button-login name="Zaloguj"></button-login>
        <p class="message-text">
            Nie posiadasz jeszcze konta? Zarejestruj się!
        </p>
    </div>
</template>

<script>
import InputField from "../inputComponents/InputField.vue";
import SubmitButton from "../buttons/SubmitButton.vue";
import AppNameText from "../textComponents/AppNameText.vue";

export default {
    components: {
        "input-field": InputField,
        "button-login": SubmitButton,
        "app-name": AppNameText,
    },
};
</script>

<style>
@import "../styles/common-style.css";
</style>
