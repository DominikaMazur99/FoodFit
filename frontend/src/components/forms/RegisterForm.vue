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

        <button-login name="Zarejestruj" @click="register"></button-login>
        <p class="message-text">
            <router-link to="/">Posiadasz już konto? Zaloguj się!</router-link>
        </p>
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
import ReusableAlert from "../modals/ReusableAlert.vue";
import { checkAndPost } from "../../../helpers/api";
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
                icon: "",
                text: "",
                title: "",
            },
        };
    },
    methods: {
        updatePropsValue(value) {
            this.alertProps = value;
        },
        async register() {
            try {
                await checkAndPost(
                    "http://localhost:3010/api/users",
                    {
                        userName: this.username,
                        password: this.password,
                    },
                    this.username,
                    this.updatePropsValue
                );
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
                    this.$router.push("/");
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
    },
};
</script>

<style>
@import "../styles/common-style.css";
</style>
