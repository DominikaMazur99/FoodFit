<template>
    <div class="overlay"></div>
    <div
        class="error-message-container"
        :style="{
            borderColor: color === 'red' ? '#f4bbbb' : '#baccac',
            backgroundColor: color === 'red' ? '#f4bbbb' : '#baccac',
        }"
    >
        <div class="err-message">
            <p class="error-message-heading">{{ title }}</p>
            <p class="error-message">{{ text }}</p>
        </div>
        <svg-icon
            :path="path"
            class="error-close-button"
            @click="$emit('close')"
        ></svg-icon>
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
        color: String,
        title: String,
        text: String,
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
    border-radius: 10px;
}
.error-message-container {
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff; /* domyślne tło */
    border: 3px solid; /* domyślne obramowanie */
    padding: 10px;
    border-radius: 10px;
    z-index: 1000;
    min-width: 300px;
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

.error-message-heading {
    font-weight: 500;
    margin-left: 20px;
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
