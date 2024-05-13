<template>
    <div :style="{ marginTop: '1rem' }">
        <v-tabs v-model="tab" hide-slider @click="updateSelectedDate">
            <v-tab
                v-for="(day, index) in days"
                :key="index"
                :value="index"
                :class="{ active: index === selectedDay }"
                @click="changeDay(index)"
            >
                {{ day }}
            </v-tab>
        </v-tabs>
        <v-window v-model="tab">
            <v-window-item
                v-for="(day, index) in days"
                :key="index"
                :value="index"
            >
                <!-- Przekazujemy dane zgodnie z aktywnym dniem -->
                <meals-journal-details
                    :data="data"
                    :selectedDate="this.selectedDate"
                    @ingredient-added="fetchData"
                ></meals-journal-details>
            </v-window-item>
        </v-window>
    </div>
</template>

<script>
import { fetchData } from "../../../helpers/api.js";
import MealsJournalDetails from "./details/MealsJournalDetails.vue";

export default {
    components: {
        "meals-journal-details": MealsJournalDetails,
    },
    data() {
        return {
            days: ["Pon", "Wt", "Śr", "Cz", "Pt", "So", "Nd"],
            currentDay: new Date().getDay() === 0 ? 6 : new Date().getDay() - 1,
            selectedDay: null,
            selectedDate: null,
            tab: new Date().getDay() === 0 ? 6 : new Date().getDay() - 1,
            data: {
                breakfast: { name: "sniad", calories: null, data: [] },
                second_breakfast: { name: "sec", calories: null, data: [] },
                dinner: { name: "obiad", calories: null, data: [] },
                dessert: { name: "deser", calories: null, data: [] },
                supper: { name: "kolacja", calories: null, data: [] },
            },
        };
    },
    methods: {
        changeDay(index) {
            try {
                this.tab = index;
                this.selectedDay = index;
                this.updateSelectedDate();
                this.fetchData();
            } catch (err) {
                console.log(err);
            }
        },
        updateSelectedDate() {
            const today = new Date();
            const currentDay = today.getDay() === 0 ? 6 : today.getDay() - 1;
            const diff = this.selectedDay - currentDay;
            const newDate = new Date(today);
            newDate.setDate(today.getDate() + diff);
            this.selectedDate = newDate.toISOString().split("T")[0]; // Ustawienie selectedDate
            this.fetchData(); // Fetch danych przy każdej zmianie daty
        },
        async fetchData() {
            try {
                const username = localStorage.getItem("login");
                const formattedDate = this.selectedDate;
                const response = await fetchData(
                    `http://localhost:3010/api/user-meals?userName=${username}&date=${formattedDate}`
                );

                const filterData = response.meals;
                if (filterData) {
                    const mealTypes = [
                        "breakfast",
                        "second_breakfast",
                        "dinner",
                        "dessert",
                        "supper",
                    ];

                    mealTypes.forEach((type) => {
                        const mealsOfType = filterData.filter(
                            (item) => item.type === type
                        );
                        const totalCalories = mealsOfType.reduce(
                            (total, item) => total + item.calories,
                            0
                        );

                        this.data[type].data = mealsOfType;
                        this.data[type].calories = totalCalories;
                    });
                }
            } catch (err) {
                console.log(err);
            }
        },
    },
    mounted() {
        this.selectedDay = this.currentDay;
        this.updateSelectedDate(); // Aktualizujemy selectedDate przy ładowaniu komponentu
    },
    watch: {
        tab(newTab) {
            this.updateSelectedDate(); // Aktualizujemy selectedDate przy zmianie zakładki
        },
    },
};
</script>

<style scoped>
@import "../styles/common-style.css";

/* te klasy to są klasy z komponentów z vuetify, potrzebowalam dostosowac je do naszego projektu */
.v-tab.v-tab.v-btn {
    min-width: 3em;
    width: 1.5em;
    height: 3em;
    border-radius: 3em;
    border: 1px solid #2f7d28;
    margin-right: 1px;
}

.v-tab.v-tab.v-btn.active {
    text-decoration: none !important;
    background-color: rgba(47, 125, 40, 0.5);
    color: white !important;
}
</style>
