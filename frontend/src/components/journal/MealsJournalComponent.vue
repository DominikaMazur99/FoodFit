<template>
  <div :style="{ marginTop: '1rem' }">
    <v-tabs v-model="tab" hide-slider>
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
        <meals-journal-details :data="data"></meals-journal-details>
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
import MealsJournalDetails from './details/MealsJournalDetails.vue';

export default {
  components: {
    'meals-journal-details': MealsJournalDetails,
  },
  data() {
    return {
      days: ['Pon', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'],
      currentDay: new Date().getDay() === 0 ? 6 : new Date().getDay() - 1,
      selectedDay: null,
      tab: new Date().getDay() === 0 ? 6 : new Date().getDay() - 1,
      data: {
        breakfast: {name: "sniad", calories: 120},
        second_breakfast: {name: "sec", calories: 240},
        dinner: {name: "obiad", calories: 350},
        dessert: {name: "deser", calories: 110},
        supper: {name: "kolacja", calories: 200}
      },
    };
  },
  methods: {
    changeDay(index) {
      this.tab = index;
      this.selectedDay = index;
    },
  
  },
  mounted() {
    this.selectedDay = this.currentDay;
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
</style>
