<template>
    <div class="common-box">
        <div class="app-name">
            <app-name></app-name>
        </div>
        <div class="login-text">Dołącz do nas!</div>
        <div class="spacer"></div>
        <input-field name="username" label="Nazwa użytkownika"></input-field>
        <input-field
            name="password"
            label="Hasło"
            type="password"
        ></input-field>
        <input-field
            name="repeatPassword"
            label="Powtórz hasło"
            type="password"
        ></input-field>
        <input-field name="email" label="Email"></input-field>

        <button-login name="Zarejestruj"></button-login>
        <p class="message-text">Posiadasz już konto? Zaloguj się!</p>
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
