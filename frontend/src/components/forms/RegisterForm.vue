<template>
    <div class="common-box">
        <div class="app-name">
            <app-name></app-name>
        </div>
        <div class="login-text">Dołącz do nas!</div>
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
            v-model="password"
            @change="updatePassword"
        ></input-field>
        <input-field
            name="repeatPassword"
            label="Powtórz hasło"
            type="password"
            v-model="repeatPassword"
            @change="updateRepeatPassword"
        ></input-field>
        <input-field
            name="email"
            label="Email"
            v-model="email"
            @change="updateEmail"
        ></input-field>

        <router-link to="/">
            <button-login name="Zarejestruj" :onClick="register"></button-login>
        </router-link>
        <p class="message-text">
            <router-link to="/">Posiadasz już konto? Zaloguj się!</router-link>
        </p>
    </div>
</template>

<script>
import InputField from "../inputComponents/InputField.vue";
import SubmitButton from "../buttons/SubmitButton.vue";
import AppNameText from "../textComponents/AppNameText.vue";
import { checkAndUpdate } from "../../../helpers/api";
import { fetchData } from "../../../helpers/api";
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
            password: ref(""),
            repeatPassword: ref(""),
            email: ref(""),
        };
    },
    methods: {
        register() {
            console.log("Registering...");
            console.log(this.username);
            console.log(this.password);
            console.log(this.repeatPassword);
            console.log(this.email);

            // checkAndUpdate(
            //     "http://localhost:3010/api/users",
            //     {
            //         userName: this.username,
            //         password: this.password
            //     },
            //
            // );

            // const response = fetchData(`http://localhost:3010/api/users?userName=${this.username}`);
            // const user = response;
            // if(response.ok) {
            //     console.log('użytkownik istnieje w bazie:', user);
            // } else {
            //     console.log("hej z catcha") //TODO: obsłużyć error w api.js
            // console.log('Użytkownik o podanej nazwie nie został znaleziony.');
            //                 //tu dodać do bazy użytkownika (ednpoint post)

            // }
        },
        updateUsername(event) {
            const selectedValue = event?.target?.value || "";
            this.username = selectedValue;
        },
        updatePassword(event) {
            const selectedValue = event?.target?.value || "";
            this.password = selectedValue;
        },
        updateRepeatPassword(event) {
            const selectedValue = event?.target?.value || "";
            this.repeatPassword = selectedValue;
        },
        updateEmail(event) {
            const selectedValue = event?.target?.value || "";
            this.email = selectedValue;
        },
    },
};
</script>

<style>
@import "../styles/common-style.css";
</style>
