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
            @input="clearError('username')"
            @change="updateUsername"
            :error="errorsMessages.username"
        ></input-field>
        <input-field
            name="password"
            label="Hasło"
            type="password"
            v-model="password"
            @input="clearError('password')"
            @change="updatePassword"
            :error="errorsMessages.password"
        ></input-field>
        <input-field
            name="repeatPassword"
            label="Powtórz hasło"
            type="password"
            v-model="repeatPassword"
            @input="clearError('repeatPassword')"
            @change="updateRepeatPassword"
            :error="errorsMessages.repeatPassword"
        ></input-field>
        <input-field
            name="email"
            label="Email"
            v-model="email"
            @input="clearError('email')"
            @change="updateEmail"
            :error="errorsMessages.email"
        ></input-field>

        <button-login name="Zarejestruj" @click="register"></button-login>
        <p class="message-text">
            <router-link to="/">Posiadasz już konto? Zaloguj się!</router-link>
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
import ReusableAlert from "../modals/ReusableAlert.vue";
import { checkAndRegister } from "../../../helpers/api";
import { ref } from "vue";

export default {
    components: {
        "input-field": InputField,
        "button-login": SubmitButton,
        "app-name": AppNameText,
        "reusable-alert": ReusableAlert,
    },
    data() {
        return {
            username: ref(""),
            password: ref(""),
            repeatPassword: ref(""),
            email: ref(""),
            alertProps: {
                show: false,
                color: "",
                text: "",
                title: "",
            },
            errorsMessages: {
                username: "",
                password: "",
                repeatPassword: "",
                email: "",
            },
        };
    },
    methods: {
        updatePropsValue(value) {
            this.alertProps = value;
        },
        async register() {
            try {
                if (this.validate()) {
                    await checkAndRegister(
                        "http://localhost:3010/api/users",
                        {
                            userName: this.username,
                            password: this.password,
                        },
                        this.username,
                        this.updatePropsValue,
                        this.navigateToLogin
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
        validate() {
            let correct = true;
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
            if (this.repeatPassword == "") {
                this.errorsMessages.repeatPassword =
                    "Pole nie może być puste. Uzupełnij je.";
                correct = false;
            }
            if (this.repeatPassword !== this.password) {
                this.errorsMessages.repeatPassword = "Hasła nie są zgodne.";
                correct = false;
            }
            if (this.email == "") {
                this.errorsMessages.email =
                    "Pole nie może być puste. Uzupełnij je.";
                correct = false;
            }
            if (!emailPattern.test(this.email)) {
                this.errorsMessages.email =
                    "Email musi posiadać formę 'test@test.pl'";
                correct = false;
            }

            return correct;
        },

        showErrorMessage() {
            this.errorMessageVisible = true;
        },
        hideErrorMessage() {
            this.errorMessageVisible = false;
        },
        clearError(fieldName) {
            // Zerowanie komunikatu błędu dla danego pola po wpisaniu wartości
            this.errorsMessages[fieldName] = "";
        },
        navigateToLogin() {
            this.$router.push("/"); // Nawigacja do menu
        },
    },
};
</script>

<style>
@import "../styles/common-style.css";
</style>
