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
            @input="clearError('username')"
            @change="updateUsername"
            :error="errorsMessages.username"
        ></input-field>
        <input-field
            name="password"
            label="Hasło"
            type="password"
            @input="clearError('password')"
            @change="updatePassword"
            :error="errorsMessages.password"
        ></input-field>
        <button-login name="Zaloguj" @click="login"></button-login>

        <p class="message-text">
            <router-link to="/rejestracja"
                >Nie posiadasz jeszcze konta? Zarejestruj się!</router-link
            >
        </p>
    </div>
    <div v-if="alertProps.show">
        <reusable-alert
            :color="alertProps.color"
            :text="alertProps.text"
            :title="alertProps.title"
        ></reusable-alert>
    </div>
</template>

<script>
import InputField from "../inputComponents/InputField.vue";
import SubmitButton from "../buttons/SubmitButton.vue";
import AppNameText from "../textComponents/AppNameText.vue";
import ErrorModal from "../modals/ErrorModal.vue";
import ReusableAlert from "../modals/ReusableAlert.vue";
import { checkAndLogin } from "../../../helpers/api";
import { ref } from "vue";

export default {
    components: {
        "input-field": InputField,
        "button-login": SubmitButton,
        "app-name": AppNameText,
        "error-modal": ErrorModal,
        "reusable-alert": ReusableAlert,
    },
    data() {
        return {
            username: ref(""),
            password: ref(""),
            errorsMessages: {
                username: "",
                password: "",
            },
            alertProps: {
                show: false,
                color: "",
                text: "",
                title: "",
            },
        };
    },
    methods: {
        updatePropsValue(value) {
            this.alertProps = value;
        },
        updateErrorMessage(message) {
            this.errorMessage = message;
        },
        updateUsername(event) {
            this.username = event.target.value;
        },
        updatePassword(event) {
            this.password = event.target.value;
        },
        validate() {
            let correct = true;
            if (this.username == "") {
                this.errorsMessages.username =
                    "Pole nie może być puste. Uzupełnij je.";
                correct = false;
            }
            if (this.password == "") {
                this.errorsMessages.password =
                    "Pole nie może być puste. Uzupełnij je.";
                correct = false;
            }

            return correct;
        },
        navigateToMenu() {
            this.$router.push("/menu"); // Nawigacja do menu
        },
        async login() {
            try {
                if (this.validate()) {
                    await checkAndLogin(
                        `http://localhost:3010/api/users?userName=${this.username}`,
                        {},
                        this.username,
                        this.password,
                        this.updatePropsValue,
                        this.navigateToMenu
                    );
                }
            } catch (err) {
                console.log(err);
            } finally {
                setTimeout(() => {
                    this.alertProps = {
                        show: false,
                        color: "",
                        icon: "",
                        text: "",
                        title: "",
                    };
                }, 3000);
            }
        },
        clearError(fieldName) {
            // Zerowanie komunikatu błędu dla danego pola po wpisaniu wartości
            this.errorsMessages[fieldName] = "";
        },
    },
};
</script>

<style>
@import "../styles/common-style.css";
</style>
