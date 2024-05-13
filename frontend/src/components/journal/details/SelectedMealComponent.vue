<template>
    <v-list-item>
        <div class="item-wrapper">
            <div class="text">
                <span>{{ selectedMeal.name }}</span>
                <p>{{ selectedMeal.calories }}kcl</p>
            </div>
            <button
                class="remove-button"
                @click="removeActivity(selectedMeal._id)"
            >
                X
            </button>
        </div>
    </v-list-item>
</template>

<script>
export default {
    props: {
        selectedMeal: {
            type: Object,
            required: true,
        },
        removeActivity: {
            type: Function,
        },
    },
};
</script>

<style scoped>
.text {
    display: flex;
    flex-direction: column;
}

.text p {
    margin-left: 8px;
    justify-self: flex-end;
    color: grey;
    font-style: italic;
}

.v-list-item {
    color: #2f7d28;
}
.item-wrapper {
    display: flex;
    justify-content: space-between;
}
.remove-button {
    color: red;
}
</style>
