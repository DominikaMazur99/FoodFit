<template>
    <div class="modal-overlay" v-if="dialog" @click="closeModal"></div>
    <div class="modal-container" v-if="dialog">
        <div class="modal-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        dialog: Boolean,
    },
    methods: {
        closeModal() {
            this.$emit("update:dialog", false);
        },
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
</style>
