<template>
    <v-tabs v-model="tab" color="#2f7d28">
        <v-tab
            v-for="(day, index) in days"
            :key="index"
            :value="index"
            :class="{ active: index === currentDay }"
        >
            {{ day }}
        </v-tab>
    </v-tabs>
    <v-window v-model="tab">
        <v-window-item v-for="(day, index) in days" :key="index" :value="index">
        </v-window-item>
    </v-window>
</template>

<script>
export default {
    data() {
        return {
            days: ["Pon", "Wt", "Śr", "Cz", "Pt", "So", "Nd"], // Skróty dni tygodnia
            currentDay: new Date().getDay() === 0 ? 6 : new Date().getDay() - 1, // Indeks aktualnego dnia tygodnia
            tab: new Date().getDay() === 0 ? 6 : new Date().getDay() - 1, // Ustawienie aktywnego dnia jako dzisiaj
        };
    },
};
</script>

<style scoped>
@import "../styles/common-style.css";
</style>
