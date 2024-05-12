<template>
    <div :style="{ marginTop: '1rem' }">
        <div class="week-range">
            <v-btn icon @click="previousWeek" class="btn">
                <div>&lt;&lt;</div>
            </v-btn>

            <span
                >{{ currentWeekRange.weekStart }} -
                {{ currentWeekRange.weekEnd }}</span
            >
            <v-btn icon @click="nextWeek" class="btn">
                <div>>></div>
            </v-btn>
        </div>

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
                    :selectedActivities="this.selectedActivities"
                    :addActivity="this.addActivity"
                    :removeActivity="this.removeActivity"
                ></activity-journal-details>
            </v-window-item>
        </v-window>
    </div>
</template>

<script>
import ActivityJournalDetails from "./details/ActivityJournalDetails.vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPlus } from "@mdi/js";
import { fetchData } from "../../../helpers/api";
import { startOfWeek, endOfWeek, format, addDays } from "date-fns";

export default {
    components: {
        "activity-journal-details": ActivityJournalDetails,
        SvgIcon,
    },

    data() {
        return {
            daysListToActivity: ["Pon", "Wt", "Śr", "Cz", "Pt", "So", "Nd"],
            selectedDay: new Date(),
            tab: new Date().getDay() === 0 ? 6 : new Date().getDay() - 1,
            selectedActivities: [],
            daysListToActivity: [],
            currentDate: new Date(),
            currentWeekRange: { weekStart: null, weekEnd: null },
            userName: localStorage.getItem("login"),
            path: mdiPlus,
        };
    },
    watch: {
        async selectedDay(newValue, oldValue) {
            try {
                const response = await fetchData(
                    `http://localhost:3010/api/user-activities?userName=${
                        this.userName
                    }&date=${format(newValue, "yyyy-MM-dd")}`
                );

                this.selectedActivities = response.activities || [];
            } catch (error) {
                console.error("Error fetching activities:", error);
            }
        },
    },
    methods: {
        async addActivity(duration, calories_on_hour, name) {
            const calories = (Number(duration) * Number(calories_on_hour)) / 60;

            const activity = {
                userName: this.userName,
                name,
                calories,
                duration,
                date: this.selectedDay,
            };

            console.log("add activity data", this.selectedDay);

            const { activity: createdActivity } = await fetchData(
                "http://localhost:3010/api/user-activities",
                "POST",
                { ...activity }
            );

            this.selectedActivities.push(createdActivity);
        },
        async removeActivity(activityId) {
            this.selectedActivities = this.selectedActivities.filter(
                ({ _id }) => _id !== activityId
            );
            const response = await fetchData(
                "http://localhost:3010/api/user-activities",
                "DELETE",
                { userName: this.userName, activityId }
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
            console.log("DATE", date);
            this.tab = index;
            this.selectedDay = format(new Date(date), "yyyy-MM-dd");
        },
    },
    async mounted() {
        this.generateDaysList();
        this.generateWeekRange();
        this.selectedDay = format(this.currentDate, "yyyy-MM-dd");
        this.user = localStorage.getItem("");
        try {
            console.log("THIS SELECTED DAY MOUNTED", this.selectedDay);
            const response = await fetchData(
                `http://localhost:3010/api/user-activities?userName=${this.userName}&date=${this.selectedDay}`
            );
            console.log("aktywności yzytkownika ", response);
            this.selectedActivities = response.activities || [];
        } catch (error) {
            console.error("Error fetching activities:", error);
        }
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
.week-range {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    font-size: 18px;
    font-family: "Jost";
    margin-bottom: 5px;
}
</style>
