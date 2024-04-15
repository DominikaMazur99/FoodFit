<template>
    <div class="login-form-box">
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
.login-form-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    min-width: 370px; /* Minimalna szerokość */
    min-height: 400px; /* Minimalna wysokość */
    width: 70%; /* Szerokość jako procent okna przeglądarki */
    max-width: 400px; /* Maksymalna szerokość */
    display: flex;
    flex-direction: column; /* Ustawienie kierunku flexbox na kolumnę */
    align-items: center; /* Wyśrodkowanie elementów w pionie */
    justify-content: center; /* Wyśrodkowanie elementów w poziomie */
}
.app-name {
    align-self: flex-start; /* Align the app-name to the start (left) of the flex container */
    margin-bottom: 20px; /* Add some bottom margin for spacing */
}
.login-text {
    font-size: 24px;
    color: #2f7d28;
}
.spacer {
    height: 20px; /* Wysokość przerwy między app-name a zaloguj */
}
.message-text {
    font-weight: lighter;
    color: black;
    font-size: small;
}

.message-text:hover {
    scale: 1.1; /*Po najechaniu tekst się powiększa */
    cursor: pointer; /*Po najechaniu pojawia się łapka zamiast klasycznego cursora */
}
</style>
