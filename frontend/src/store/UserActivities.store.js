import { reactive, readonly, ref } from "vue";
import { fetchData } from "../../helpers/api";
import { format } from "date-fns";

export const store = reactive({
    activities: {},
    caloriesBurned: ref({}),

    getUserName() {
        return localStorage.getItem("login");
    },
    calculateCaloriesBurned(date) {
        if (!this.caloriesBurned[date]) {
            this.caloriesBurned[date] = 0;
        }

        if (!this.caloriesBurned[date] && this.activities[date]?.length > 0) {
            for (let i = 0; i < this.activities[date].length; i++) {
                this.caloriesBurned[date] += this.activities[date][i].calories;
            }
        }
    },
    async fetchActivites(date = format(new Date(), "yyyy-MM-dd")) {
        if (!this.activities[date]?.length) {
            try {
                const response = await fetchData(
                    `http://localhost:3010/api/user-activities?userName=${this.getUserName()}&date=${date}`
                );
                this.activities[date] = response.activities;
            } catch (error) {
                console.log("Error during fetch activities");
            }
            this.calculateCaloriesBurned(date);
        }
    },
    getActivities(date = format(new Date(), "yyyy-MM-dd")) {
        return this.activities[date];
    },

    async addActivity(activity, date) {
        const { activity: createdActivity } = await fetchData(
            "http://localhost:3010/api/user-activities",
            "POST",
            { ...activity }
        );
        this.activities[date].push(createdActivity);
        this.caloriesBurned[date] += activity.calories;
    },
    async removeActivity(activityId, date) {
        const response = await fetchData(
            "http://localhost:3010/api/user-activities",
            "DELETE",
            { userName: this.getUserName(), activityId }
        );

        if ((response.status = "204")) {
            this.caloriesBurned[date] -= this.activities[date].filter(
                ({ _id }) => _id === activityId
            )[0].calories;
            this.activities[date] = this.activities[date].filter(
                ({ _id }) => _id !== activityId
            );
        }
    },

    setCaloriesBurned(date) {
        if (!this.caloriesBurned[date]) {
            this.caloriesBurned[date] = 0;
        }
    },
    addCaloriesBurned(caloryBurned, date) {
        this.caloriesBurned[date] += caloryBurned;
    },
    subtrackCaloriesBurned(calory, date) {
        this.caloriesBurned[date] -= calory;
    },
    clearStore() {
        this.activities = {};
        this.caloriesBurned = {};
    },
    async getCaloriesBurned(date) {
        if (!this.caloriesBurned[date]) {
            await this.fetchActivites(date);
        }

        return this.caloriesBurned[date];
    },
});
