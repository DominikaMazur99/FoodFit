<template>
    <div :style="{ marginTop: '1rem' }">
        <date-navigation
            :currentWeekRange="currentWeekRange"
            :previousWeek="previousWeek"
            :nextWeek="nextWeek"
        ></date-navigation>
        <v-tooltip
            v-for="(day, index) in daysListToActivity"
            :key="index"
            :text="day.dateToDisplay"
            location="top"
            :styles="{ top: '5px' }"
        >
            <template v-slot:activator="{ props }">
                <v-tab
                    v-bind="props"
                    @click="setSelectedDate(day.date, index)"
                    :class="{ active: index === this.tab }"
                >
                    {{ day.day }}
                </v-tab>
            </template>
        </v-tooltip>

        <v-window v-model="tab">
            <v-window-item
                v-for="(day, index) in daysListToActivity"
                :key="index"
                :value="index"
            >
                <activity-journal-details
                    :selectedActivities="
                        this.useUserActivitiesStore.getActivities(
                            this.selectedDay
                        )
                    "
                    :addActivity="this.addActivity"
                    :removeActivity="this.removeActivity"
                ></activity-journal-details>
            </v-window-item>
        </v-window>
        <div class="burnedCalories">
            <div>Spalone kalorie</div>
            <div class="burnedCaloriesValue">
                {{
                    this.useUserActivitiesStore.caloriesBurned[
                        this?.selectedDay
                    ]
                }}
            </div>
        </div>
    </div>
</template>

<script>
import ActivityJournalDetails from "./details/ActivityJournalDetails.vue";
import SvgIcon from "@jamescoyle/vue-icon";
import DateNavigation from "./details/DateNavigation.vue";
import { startOfWeek, endOfWeek, format, addDays } from "date-fns";
import { inject } from "vue";

export default {
    setup() {
        const useUserActivitiesStore = inject("userActivitiesStore"); //pobranie kontekstu
        useUserActivitiesStore.fetchActivites(); // uycie funkcji z kontekstu
        return { useUserActivitiesStore };
    },
    components: {
        "activity-journal-details": ActivityJournalDetails,
        "date-navigation": DateNavigation,
        SvgIcon,
    },

    data() {
        return {
            daysListToActivity: ["Pon", "Wt", "Śr", "Cz", "Pt", "So", "Nd"],
            selectedDay: new Date(),
            tab: new Date().getDay() === 0 ? 6 : new Date().getDay() - 1,
            currentDate: new Date(),
            currentWeekRange: { weekStart: null, weekEnd: null },
            userName: localStorage.getItem("login"),
        };
    },
    watch: {
        async selectedDay(newValue) {
            this.useUserActivitiesStore.setCaloriesBurned(newValue);
            try {
                await this.useUserActivitiesStore.fetchActivites(
                    format(newValue, "yyyy-MM-dd")
                );
            } catch (error) {
                console.error("Error fetching activities:", error);
            }
            this.useUserActivitiesStore.calculateCaloriesBurned(
                format(newValue, "yyyy-MM-dd")
            );
        },
    },
    methods: {
        async addActivity(duration, calories_on_hour, name) {
            const calories = Math.round(
                (Number(duration) * Number(calories_on_hour)) / 60
            );
            const activity = {
                userName: this.userName,
                name,
                calories,
                duration,
                date: this.selectedDay,
            };

            await this.useUserActivitiesStore.addActivity(
                activity,
                this.selectedDay
            );
        },

        async removeActivity(activityId) {
            await this.useUserActivitiesStore.removeActivity(
                activityId,
                this.selectedDay
            );
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
            this.generateDaysList();
            this.generateWeekRange();
        },
        generateDaysList() {
            const days = ["Pon", "Wt", "Śr", "Cz", "Pt", "So", "Nd"];
            const startDate = new Date(this.selectedDay);
            const currentWeekStart = startOfWeek(startDate, {
                weekStartsOn: 1,
            });
            const currentWeekEnd = endOfWeek(startDate);

            this.daysListToActivity = [];
            for (let i = 0; i < 7; i++) {
                const day = addDays(currentWeekStart, i);
                const formattedDay = format(day, "yyyy-MM-dd");
                this.daysListToActivity.push({
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
                weekStart: format(currentWeekStart, "yyyy-dd-MM"),
                weekEnd: format(currentWeekEnd, "yyyy-dd-MM"),
            };
        },
        setSelectedDate(date, index) {
            this.tab = index;
            this.selectedDay = format(new Date(date), "yyyy-MM-dd");
        },
    },
    async mounted() {
        this.generateDaysList();
        this.generateWeekRange();
        this.selectedDay = format(this.currentDate, "yyyy-MM-dd");
        this.user = localStorage.getItem("");

        await this.useUserActivitiesStore.fetchActivites(this.selectedDay);
        this.useUserActivitiesStore.calculateCaloriesBurned(this.selectedDay);
    },
};
</script>

<style scoped>
@import "../styles/common-style.css";

/* klasy z komponentów z vuetify, dostosowanie je do naszego projektu */
.v-tab.v-tab.v-btn {
    min-width: 3em;
    width: 1.5em;
    height: 3em;
    border-radius: 3em;
    border: 1px solid #2f7d28;
    margin-right: 1px;
}
.btn {
    width: 1.5em;
    height: 3em;
    all: unset;
    font-weight: 600;
}

.v-tab.v-tab.v-btn.active {
    text-decoration: none !important;
    background-color: rgba(47, 125, 40, 0.5);
    color: white !important;
}
.burnedCalories {
    display: flex;
    justify-content: center;
    gap: 20px;
    color: #2f7d28;
    font-size: 20px;
    font-weight: 300;
}
.burnedCaloriesValue {
    font-weight: 350;
}
</style>
