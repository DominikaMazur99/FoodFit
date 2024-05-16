<template>
    <div class="training-box">
        <button @click="addTraining" class="add-btn">Dodaj trening</button>
    </div>

    <v-list v-for="(activity, index) in selectedActivities">
        <selected-activity
            :selectedActivity="activity"
            :removeActivity="removeActivity"
        />
    </v-list>

    <reusable-modal :dialog="dialog" :closeModal="closeModal">
        <reusable-select
            name="activities"
            label="aktywności"
            minWidth="180px"
            :options="this.activitiesOptions || []"
            v-model="activitiesSelected"
            @change="updateActivitiesOptions"
        ></reusable-select>
        <input-field
            name="duration"
            label="czas trwania (min)"
            type="number"
            v-model="duration"
            @change="updateDuration"
        ></input-field>
        <submit-button
            name="Dodaj"
            @click="
                addActivity(
                    this.duration,
                    this.activitySelected.calories_on_hour,
                    this.activitySelected.name
                )
            "
        ></submit-button>
        <!-- <v-list lines="one">
            <p>Dodane aktywności:</p>
            <v-list-item
                v-for="activity in activityList"
                :key="`${activity.name}/${activity.calories}`"
                :title="activity.name"
                :subtitle="`${activity.calories}kcal, ${activity.duration}min`"
            ></v-list-item>
        </v-list> -->
    </reusable-modal>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPlus } from "@mdi/js";
import ReusableModal from "../../modals/ReusableModal.vue";
import ReusableSelect from "../../inputComponents/ReusableSelect.vue";
import InputField from "../../inputComponents/InputField.vue";
import SubmitButton from "../../buttons/SubmitButton.vue";
import SelectedActivity from "./SelectedActivityComponent.vue";
import { ref } from "vue";
import { fetchData } from "../../../../helpers/api";

export default {
    props: {
        selectedActivities: {
            type: Array,
            required: true,
        },
        addActivity: {
            type: Function,
            required: true,
        },
        removeActivity: {
            type: Function,
            required: true,
        },
    },
    components: {
        SvgIcon,
        "reusable-modal": ReusableModal,
        "reusable-select": ReusableSelect,
        "input-field": InputField,
        "submit-button": SubmitButton,
        "selected-activity": SelectedActivity,
    },
    data() {
        return {
            path: mdiPlus,
            dialog: false,
            activitiesOptions: [],
            activitySelected: ref(""),
            duration: ref(""),
        };
    },
    methods: {
        addTraining() {
            this.dialog = true;
        },
        updateActivitiesOptions(event) {
            const selectedValue = JSON.parse(event.target.value);
            this.activitySelected = selectedValue;
        },
        closeModal() {
            this.dialog = false;
        },
        updateDuration(event) {
            const inputValue = event.target.value;
            this.duration = inputValue;
        },
    },
    async mounted() {
        try {
            const response = await fetchData(
                "http://localhost:3010/api/activities",
                "GET",
                {}
            );
            //mapujemy dane z bazy aby pasowaly do reużywalnego select boxa (dodanie label)
            this.activitiesOptions = response.map((activity) => ({
                label: activity.name,
                ...activity,
            }));
        } catch (error) {
            console.error("Error fetching activities:", error);
            // Handle error if needed
        }
    },
};
</script>

<style scoped>
.list-item {
    padding: 0;
}

.text {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
.v-list-item--variant-text .v-list-item__overlay {
    color: grey;
}

.icon-button:hover {
    scale: 1.1;
    cursor: pointer;
}
.add-btn {
    border: 1px solid #2f7d28;
    padding: 0.5rem;
    border-radius: 30px;
    background-color: transparent;
    cursor: pointer;
}
.add-btn:hover {
    text-decoration: none !important;
    background-color: rgba(47, 125, 40, 0.5);
    color: white !important;
}
.training-box {
    margin-top: 1rem;
    display: flex;
    align-items: left;
    justify-content: space-around;
}
</style>
