<template>
    <button class="submit-btn" @click="handleClick">{{ name }}</button>
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
    height: 31px;
    width: 122px;
    border-radius: 30px;
    border: none;
    background-color: #baccac;
    color: #2f7d28;
    font-weight: bold;
}

.submit-btn:hover {
    scale: 1.1;
    cursor: pointer;
}
</style>
