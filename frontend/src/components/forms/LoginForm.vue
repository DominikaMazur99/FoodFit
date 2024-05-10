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
        <error-modal
            :errorMessageVisible="errorMessageVisible"
            :hideErrorMessage="hideErrorMessage"
            :errors="errors"
        ></error-modal>
    </div>
    <div v-if="alertProps.show">
        <reusable-alert
            :color="alertProps.color"
            :icon="alertProps.icon"
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
            errorMessageVisible: false,
            errors: {
                login: "",
                password: "",
                loginOrPassword: "",
            },
            alertProps: {
                show: false,
                color: "",
                icon: "",
                text: "",
                title: "",
            },
        };
    },
    methods: {
        //tu musi być update tego pola, które definiuje w komponencie
        // to pole jest tutaj bo tu chcemy miec dane ktore wyslemy do zapisu
        updatePropsValue(value) {
            this.alertProps = value;
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
            return correct;
        },
        showErrorMessage() {
            this.errorMessageVisible = true;
        },
        hideErrorMessage() {
            this.errorMessageVisible = false;
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
                        this.updatePropsValue,
                        this.navigateToMenu
                    );
                }
            } catch (err) {
                console.log(err);
                this.errors.loginOrPassword = "login lub hasło";
                this.showErrorMessage();
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
    },
};
</script>

<style>
@import "../styles/common-style.css";
</style>
