<template>
    <div class="overlay" v-if="errorMessageVisible"></div>
    <div class="error-message-container" v-if="errorMessageVisible">
        <button
            @click="hideErrorMessage"
            class="icon-button error-close-button"
        >
            <svg-icon
                type="mdi"
                :path="path"
                class="icon"
                color="grey"
            ></svg-icon>
        </button>
        <div class="err-message">
            <p
                v-if="Object.values(errors).some((err) => err !== '')"
                class="error-message-heading"
            >
                {{ message }}
            </p>
            <p class="error-message" v-for="error in errors" :key="error">
                {{ error }}
            </p>
        </div>
    </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiClose } from "@mdi/js";

export default {
    data() {
        return {
            path: mdiClose,
        };
    },
    props: {
        errorMessageVisible: Boolean,
        hideErrorMessage: Function,
        errors: Object,
        message: String,
    },
    components: {
        SvgIcon,
    },
};
</script>

<style scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    backdrop-filter: blur(8px);
    border-radius: 10px;
}
.error-message-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #f4bbbb;
    padding: 10px;
    border-radius: 10px;
    z-index: 1000;
    min-width: 300px;
    border: 3px solid #e29696;
}
.error-close-button {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    font-size: 1.2rem;
}
.error-message-heading {
    font-weight: 500;
    margin-left: 20px;
}
.error-close-button {
    position: absolute;
    top: 5px;
    right: 5px; /* Zmiana right na 5px */
    cursor: pointer;
    font-size: 1.2rem;
}
.err-message {
    margin-top: 30px;
}

.error-message {
    margin-left: 30px;
    font-weight: 300;
}
.icon-button:hover {
    scale: 1.1;
    cursor: pointer;
}
</style>
