<template>
    <div :style="{ marginTop: '1rem' }">
        <v-tabs
            v-model="tab"
            hide-slider
        >
            <v-tab
                v-for="(day, index) in daysListToActivity"
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
                v-for="(day, index) in daysListToActivity"
                :key="index"
                :value="index"
            >
                <div class="training-box">
                    <button
                        @click="addTraining"
                        class="add-btn"
                    >
                        Dodaj trening
                     
                    </button>
                </div>
                <activity-journal-details
                    :data="data"
                ></activity-journal-details>
            </v-window-item>
        </v-window>
    </div>
</template>

<script>
import ActivityJournalDetails from './details/ActivityJournalDetails.vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiPlus } from '@mdi/js';
export default {
    components: {
        'activity-journal-details': ActivityJournalDetails,
        SvgIcon,
    },

    data() {
        return {
            daysListToActivity: ['Pon', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'],
            currentDay: new Date().getDay() === 0 ? 6 : new Date().getDay() - 1,
            selectedDay: null,
            tab: new Date().getDay() === 0 ? 6 : new Date().getDay() - 1,
            data: {
                running: { name: 'bieganie', calories: 120 },
                swimming: { name: 'pływanie', calories: 240 },
            },
            path: mdiPlus,
        };
    },
    methods: {
        changeDay(index) {
            this.tab = index;
            this.selectedDay = index;
        },
        addTraining(){
            console.log('add training')
        }
    },
    mounted() {
        this.selectedDay = this.currentDay; // Przy kadym ładowaniu komponentu selectedDay z automatu jest dniem biezacym
    },
};
</script>

<style scoped>
@import '../styles/common-style.css';

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

.training-box {
    margin-top: 2rem;
    display: flex;
    align-items: left;
    justify-content: space-around;
}
.add-btn{
    border: 1px solid #2f7d28;;
    padding: 0.5rem;
    border-radius: 30px;
    background-color: transparent;
    cursor: pointer;
}
.add-btn:hover{
    text-decoration: none !important;
    background-color: rgba(47, 125, 40, 0.5);
    color: white !important;
}
</style>