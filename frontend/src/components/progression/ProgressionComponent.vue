<template>
    <div class="common-box">
        <div class="app-name">
            <app-name></app-name>
        </div>
        <hr />
        <div class="month-navigation">
            <v-btn icon class="no-border" @click="previousMonth">
                <svg-icon type="mdi" :path="pathToBack" color="gray"></svg-icon>
            </v-btn>
            <span :style="{ 'font-size': '20px' }">{{ currentMonthName }}</span>
            <v-btn icon class="no-border" @click="nextMonth">
                <svg-icon type="mdi" :path="pathToNext" color="gray"></svg-icon>
            </v-btn>
        </div>
        <Bar id="my-chart-id" :data="chartData" :options="chartOptions" />
    </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiChevronRight, mdiChevronLeft } from "@mdi/js";
import AppNameText from "../textComponents/AppNameText.vue";

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
);

export default {
    name: "BarChart",
    components: {
        Bar,
        SvgIcon,
        "app-name": AppNameText,
    },
    data() {
        return {
            activities: [],
            currentMonth: new Date().getMonth(), // starting from the current month
            currentYear: new Date().getFullYear(), // current year
            pathToNext: mdiChevronRight,
            pathToBack: mdiChevronLeft,
        };
    },
    computed: {
        chartData() {
            const daysInMonth = new Date(
                this.currentYear,
                this.currentMonth + 1,
                0
            ).getDate();
            const dailyCalories = Array(daysInMonth).fill(0);

            this.activities.forEach((activity) => {
                const activityDate = new Date(activity.date);
                const year = activityDate.getFullYear();
                const month = activityDate.getMonth();
                const day = activityDate.getDate();

                if (year === this.currentYear && month === this.currentMonth) {
                    dailyCalories[day - 1] += activity.calories;
                }
            });

            return {
                labels: Array.from({ length: daysInMonth }, (_, i) => i + 1),
                datasets: [
                    {
                        label: "Spalone kalorie w ciągu dnia",
                        data: dailyCalories,
                        backgroundColor: "#2f7d28",
                        borderColor: "#2f7d28",
                        borderWidth: 1,
                    },
                ],
            };
        },

        chartOptions() {
            return {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        min: 0,
                        max: 1000,
                        title: {
                            display: true,
                            text: "Liczba spalonych kalorii", // opis osi y
                            font: {
                                weight: "italic",
                                size: "15px",
                                color: "gray",
                            },
                        },
                    },
                    x: {
                        title: {
                            display: true,
                            text: "Dzień", // opis osi x
                            font: {
                                weight: "italic",
                                size: "15px",
                                color: "gray",
                            },
                        },
                    },
                },
            };
        },
        currentMonthName() {
            const monthNames = [
                "Styczeń",
                "Luty",
                "Marzec",
                "Kwiecień",
                "Maj",
                "Czerwiec",
                "Lipiec",
                "Sierpień",
                "Wrzesień",
                "Październik",
                "Listopad",
                "Grudzień",
            ];
            return monthNames[this.currentMonth];
        },
    },
    methods: {
        async fetchActivities() {
            const user = localStorage.getItem("login");
            try {
                const response = await fetch(
                    `http://localhost:3010/api/user-activities?userName=${user}`
                );
                const data = await response.json();

                if (!data.activities || !Array.isArray(data.activities)) {
                    console.error("Invalid activities data:", data.activities);
                    return;
                }

                this.activities = data.activities;
            } catch (error) {
                console.error("Error fetching activities:", error);
            }
        },
        previousMonth() {
            if (this.currentMonth === 0) {
                this.currentMonth = 11;
                this.currentYear -= 1;
            } else {
                this.currentMonth -= 1;
            }
            this.fetchActivities();
        },
        nextMonth() {
            if (this.currentMonth === 11) {
                this.currentMonth = 0;
                this.currentYear += 1;
            } else {
                this.currentMonth += 1;
            }
            this.fetchActivities();
        },
    },
    mounted() {
        this.fetchActivities();
    },
};
</script>

<style scoped>
.common-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    min-width: 370px; /* Minimalna szerokość */
    min-height: 400px; /* Minimalna wysokość */
    width: 70%; /* Szerokość jako procent okna przeglądarki */
    max-width: 800px; /* Maksymalna szerokość */
    display: flex;
    flex-direction: column; /* Ustawienie kierunku flexbox na kolumnę */
    align-items: center; /* Wyśrodkowanie elementów w pionie */
    justify-content: center; /* Wyśrodkowanie elementów w poziomie */
    opacity: 0.85;
}
.app-name {
    align-self: flex-start; /* Align the app-name to the start (left) of the flex container */
    margin-bottom: 20px; /* Add some bottom margin for spacing */
}
.month-navigation {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    font-size: 18px;
    font-family: "Jost";
    margin-bottom: 5px;
    color: gray;
    font-style: italic;
}

.no-border {
    border: none !important;
    box-shadow: none !important;
}

.v-btn {
    padding: 0;
}
</style>
