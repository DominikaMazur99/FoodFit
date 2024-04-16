<template>
    <button
        class="submit-btn"
        @click="handleClick"
        :style="{
            width: minWidthBtn, // Użyj propa minWidthBtn
            height: minHeightBtn, // Użyj propa minHeightBtn
        }"
    >
        {{ name }}
    </button>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true,
        },
        onClick: {
            type: Function,
            default: () => {}, // domyślna pusta funkcja
        },
        minWidthBtn: {
            type: String,
            default: "150px",
        },
        minHeightBtn: {
            type: String,
            default: "31px",
        },
    },
    methods: {
        handleClick() {
            this.onClick(); // wywołanie funkcji przekazanej jako prop onClick
        },
    },
};
</script>

<style scoped>
.submit-btn {
    height: auto;
    width: auto;
    border-radius: 30px;
    border: none;
    background-color: #baccac;
    color: #2f7d28;
    font-weight: bold;
    padding: 10px 20px;
    transition: transform 0.3s;
}

.submit-btn:hover {
    transform: scale(1.1);
    cursor: pointer;
}
</style>
