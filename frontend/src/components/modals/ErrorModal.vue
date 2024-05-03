<template>
    <div class="overlay" v-if="errorMessageVisible"></div>
    <div class="error-message-container" v-if="errorMessageVisible">
        <div>
            <p class="error-close-button" @click="hideErrorMessage">×</p>
            <p
                v-if="Object.values(errors).some((err) => err !== '')"
                class="error-message-heading"
            >
                Uzupełnij brakujące informacje:
            </p>
            <p class="error-message" v-for="error in errors" :key="error">
                {{ error }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        errorMessageVisible: Boolean,
        hideErrorMessage: Function,
        errors: Object,
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
    margin-right: 20px;
}
.error-message-heading {
    font-weight: 500;
    margin-left: 20px;
}
.error-message {
    margin-left: 30px;
    font-weight: 300;
}
</style>
