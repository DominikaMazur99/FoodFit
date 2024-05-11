<template>
    <button class="menu-btn" @click="handleClick">{{ name }}</button>
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
.menu-btn {
    height: 70px;
    width: 300px;
    border-radius: 30px;
    border: none;
    background-color: #baccac;
    color: #2f7d28;
    font-size: 20px;
    font-weight: 350;
}

.menu-btn:hover {
    scale: 1.1;
    cursor: pointer;
}
</style>
