<template>
    <select-component
        name="breakfast"
        label="Produkty"
        minWidth="180px"
        :options="this.indgredientsOptions || []"
        v-model="ingredientSelected"
        @change="updateIndgredientsOptions"
    ></select-component>
    <input-field
        name="weight"
        label="waga(g)"
        type="number"
        v-model="weight"
        @change="updateWeight"
    ></input-field>
    <submit-button name="Dodaj"></submit-button>
</template>
