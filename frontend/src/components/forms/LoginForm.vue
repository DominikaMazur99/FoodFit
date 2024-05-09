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
            @change="updatePassword"
        ></input-field>
        <button-login name="Zaloguj" @click="login"></button-login>

        <p class="message-text">
            <router-link to="/rejestracja"
                >Nie posiadasz jeszcze konta? Zarejestruj się!</router-link
            >
        </p>
        <p>Wartość pola nazwa użytkownika: {{ username }}</p>
        <p>Wartość pola haslo: {{ password }}</p>
        <error-modal
            :errorMessageVisible="errorMessageVisible"
            :hideErrorMessage="hideErrorMessage"
            :errors="errors"
        ></error-modal>
    </div>
</template>

<script>
import InputField from "../inputComponents/InputField.vue";
import SubmitButton from "../buttons/SubmitButton.vue";
import AppNameText from "../textComponents/AppNameText.vue";
import ErrorModal from "../modals/ErrorModal.vue";
import { fetchData } from "../../../helpers/api";
import { ref } from "vue";
export default {
    components: {
        "input-field": InputField,
        "button-login": SubmitButton,
        "app-name": AppNameText,
        "error-modal": ErrorModal,
    },
    data() {
        return {
            username: ref(""),
            password: ref(""),
            errorMessageVisible: false,
            errors: {
                login: "",
                password: "",
            },
        };
    },
    methods: {
        //tu musi być update tego pola, które definiuje w komponencie
        // to pole jest tutaj bo tu chcemy miec dane ktore wyslemy do zapisu
        updateUsername(event) {
            this.username = event.target.value;
        },
        updatePassword(event) {
            this.password = event.target.value;
        },
        validate() {
            let correct = true;
            if (this.username == "") {
                this.errors.username = "login";
                correct = false;
            } else {
                this.errors.username = "";
            }
            if (this.password == "") {
                this.errors.password = "hasło";
                correct = false;
            } else {
                this.errors.password = "";
            }
            if (Object.values(this.errors).some((err) => err !== "")) {
                this.showErrorMessage();
            }
            //pobrac z bazdy uzytkownika o podanym loginie this.username:

            return correct;
        },
        showErrorMessage() {
            this.errorMessageVisible = true;
        },
        hideErrorMessage() {
            this.errorMessageVisible = false;
        },
        login() {
            if (this.validate()) {
                this.getUser();
                this.$router.push("/menu");
            } else {
                console.log("Walidacja nie powiodła się.");
            }
        },
        async getUser() {
            console.log("hej");
            const response = await fetchData(
                `http://localhost:3010/api/users?userName=${this.username}`
            );
            const user = response;
            console.log("Zalogowany użytkownik:", user);
        },
    },
};
</script>

<style>
@import "../styles/common-style.css";
</style>
