<template>
    <div :style="{ marginTop: '1rem' }">
        <date-navigation
            :currentWeekRange="currentWeekRange"
            :previousWeek="previousWeek"
            :nextWeek="nextWeek"
        >
        </date-navigation>
        <v-tooltip
            v-for="(day, index) in daysListWithDate"
            :key="index"
            :text="day.dateToDisplay"
            location="top"
            :styles="{ top: '5px' }"
        >
            <template v-slot:activator="{ props }">
                <v-tab
                    v-bind="props"
                    @click="setSelectedDate(day.date, index)"
                    :class="{ active: index === tab }"
                >
                    {{ day.day }}
                </v-tab>
            </template>
        </v-tooltip>
        <v-window v-model="tab">
            <v-window-item
                v-for="(day, index) in daysListWithDate"
                :key="index"
                :value="index"
            >
                <!-- Przekazujemy dane zgodnie z aktywnym dniem -->
                <meals-journal-details
                    :data="data"
                    :selectedDate="selectedDate"
                    @ingredient-added="fetchData"
                ></meals-journal-details>
            </v-window-item>
        </v-window>
    </div>
</template>

<script>
import { startOfWeek, endOfWeek, format, addDays } from "date-fns";
import { fetchData } from "../../../helpers/api.js";
import MealsJournalDetails from "./details/MealsJournalDetails.vue";
import DateNavigation from "./details/DateNavigation.vue";

export default {
    components: {
        "meals-journal-details": MealsJournalDetails,
        "date-navigation": DateNavigation,
    },
    data() {
        return {
            daysListWithDate: [],
            currentDay: new Date().getDay() === 0 ? 6 : new Date().getDay() - 1,
            selectedDay: new Date(),
            selectedDate: null,
            currentDate: new Date(),
            currentWeekRange: { weekStart: null, weekEnd: null },
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
        previousWeek() {
            const date = new Date(this.selectedDay);

            date.setDate(date.getDate() - 7);
            this.selectedDay = format(new Date(date), "yyyy-MM-dd");
            this.generateDaysList();
            this.generateWeekRange();
        },
        nextWeek() {
            const date = new Date(this.selectedDay);

            date.setDate(date.getDate() + 7);
            this.selectedDay = format(new Date(date), "yyyy-MM-dd");
            console.log(this.selectedDay);
            this.generateDaysList();
            this.generateWeekRange();
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
        generateDaysList() {
            const days = ["Pon", "Wt", "Śr", "Cz", "Pt", "So", "Nd"];
            const startDate = new Date(this.selectedDay);
            const currentWeekStart = startOfWeek(startDate, {
                weekStartsOn: 1,
            });
            const currentWeekEnd = endOfWeek(startDate);

            this.daysListWithDate = [];
            for (let i = 0; i < 7; i++) {
                const day = addDays(currentWeekStart, i);
                const formattedDay = format(day, "yyyy-MM-dd");
                this.daysListWithDate.push({
                    day: days[i],
                    date: formattedDay,
                    dateToDisplay: format(day, "dd-MM"),
                });
            }
        },
        generateWeekRange() {
            const startDate = new Date(this.selectedDay);
            const currentWeekStart = startOfWeek(startDate, {
                weekStartsOn: 1,
            });
            const currentWeekEnd = endOfWeek(startDate, { weekStartsOn: 1 });
            this.currentWeekRange = {
                weekStart: format(currentWeekStart, "yyyy-MM-dd"),
                weekEnd: format(currentWeekEnd, "yyyy-MM-dd"),
            };
        },
        setSelectedDate(date, index) {
            this.tab = index;
            this.selectedDay = format(new Date(date), "yyyy-MM-dd");
            this.selectedDate = this.selectedDay;
            this.fetchData();
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
        this.generateDaysList();
        this.generateWeekRange();
        this.selectedDay = format(this.currentDate, "yyyy-MM-dd");
        this.selectedDate = this.selectedDay;
        this.fetchData();
    },
    watch: {
        tab(newTab) {
            this.selectedDay;
        },
        selectedDay(newSelectedDay) {
            this.selectedDate = format(new Date(newSelectedDay), "yyyy-MM-dd");
            this.fetchData();
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
