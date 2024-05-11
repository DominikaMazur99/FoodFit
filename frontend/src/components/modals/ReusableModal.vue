<template>
    <div class="modal-overlay" v-if="dialog" @click="closeModal"></div>
    <div class="modal-container" v-if="dialog">
        <button @click="closeModal" class="icon-button close-button">
            <svg-icon
                type="mdi"
                :path="path"
                class="icon"
                color="grey"
            ></svg-icon>
        </button>
        <div class="modal-content">
            <slot></slot>
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
        dialog: Boolean,
        closeModal: Function,
    },
    components: {
        SvgIcon,
    },
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
}
.modal-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
}
.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Add a subtle shadow */
}
.close-button {
    position: absolute;
    top: 5px;
    right: 5px; /* Zmiana right na 5px */
    cursor: pointer;
    font-size: 1.2rem;
}
.icon-button:hover {
    scale: 1.1;
    cursor: pointer;
}
</style>
